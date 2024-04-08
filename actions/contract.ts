"use server"

import * as z from "zod";
import { stat, mkdir, writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid';
import { join } from "path";
import * as dateFn from "date-fns";
import mime from "mime";

import { db } from "@/lib/db";
import { getUserById, getUserByName } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { ContractSchema, SearchContractSchema } from "@/schemas/contract.schema";
import { getNewContracts } from "@/data/contract";
import { removeNull } from "@/helpers/remove-null";
import axios from "axios";

export const contractCreate = async (
    values: z.infer<typeof ContractSchema>,
    form: FormData
) => {
    values.pdfFile = form.get('pdfFile') as File;
    if (typeof values.pdfFile === 'string') values.pdfFile = null;

    const user = await currentUser();

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    const validateFields = ContractSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Недопустимые поля!" };
    }

    const data = validateFields.data;

    const file: File | null = data.pdfFile as unknown as File

    let filePath: string = "";

    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "d-MM-yy")}`;
        const uploadDir = join(process.cwd(), "public", relativeUploadDir);
        const uniqueSuffix = uuidv4();
        const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;

        filePath = `${relativeUploadDir}/${filename}`

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(
                    "Ошибка при попытке создать каталог при загрузке файла\n",
                    e
                );
                return { error: "Что-то пошло не так!" }
            }
        }

        try {
            await writeFile(`${uploadDir}/${filename}`, buffer);
        } catch (e) {
            console.error("Ошибка при попытке загрузить файл\n", e);
            return { error: "Что-то пошло не так!" }
        }
    }

    data.pdfFile = filePath ? filePath : null;

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contract`, {
        data,
        user
    });

    if (res?.statusText === 'OK') {
        return { success: res.data?.message }
    }

    return { error: res.data?.message };

}

export const contractDelete = async (id: string) => {
    const user = await currentUser();

    const res: any = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contract/${id}?id=${user?.id}`)

    if (res?.statusText === 'OK') {
        return { success: res.data?.message }
    }

    return { error: res.data?.message };
}

export const contractUpdate = async (
    values: z.infer<typeof ContractSchema>,
    id: string,
    form: FormData
) => {
    const user = await currentUser();
    if (form && form.get('pdfFile')) values.pdfFile = form.get('pdfFile') as File;
    const validateFields = ContractSchema.safeParse(values);

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    if (!validateFields.success) {
        return { error: "Недопустимое поле!" };
    }

    const data = validateFields.data;

    const file: File | null = data.pdfFile as unknown as File

    let filePath: string = "";

    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "d-MM-yy")}`;
        const uploadDir = join(process.cwd(), "public", relativeUploadDir);
        const uniqueSuffix = uuidv4();
        const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;

        filePath = `${relativeUploadDir}/${filename}`

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(
                    "Ошибка при попытке создать каталог при загрузке файла\n",
                    e
                );
                return { error: "Что-то пошло не так!" }
            }
        }

        try {
            await writeFile(`${uploadDir}/${filename}`, buffer);
        } catch (e) {
            console.error("Ошибка при попытке загрузить файл\n", e);
            return { error: "Что-то пошло не так!" }
        }
    }

    data.pdfFile = filePath ? filePath : null;

    const res: any = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contract/${id}`, {
        user,
        data
    })

    if (res?.statusText === 'OK') {
        return { success: res.data?.message }
    }

    return { error: res.data?.message };
}

interface searchValuesParams {
    placementId: string,
    typeId: string,
    federalId: string,
    contractNumber: string,
    startDateOfTheAgreement: string,
    endDateOfTheContract: string,
    provider: string,
    theSubjectOfTheAgreement: string,
    actuallyPaidFor: string,
    theAmountOfTheContract: string,
    returnDate: string,
    theAmountOfCollateral: string,
    viewId: string,
    articleId: string,
    divisionId: string,
    sourceOfFinancing: string,
    MP: boolean,
    subcontractorMP: boolean,
    transients: boolean,
    additionalInformation: string,
    contractColor: string;
    userId: string
}


export const contractSearch = async (
    values: z.infer<typeof SearchContractSchema>
) => {
    const user = await currentUser();
    const validateFields = SearchContractSchema.safeParse(values);

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    if (!validateFields.success) {
        return { error: "Недопустимое поле!" };
    }

    let searchValues = removeNull(validateFields.data) as searchValuesParams;

    if (searchValues.userId) {
        const findUser = await getUserByName(searchValues.userId as string);
        searchValues.userId = findUser?.id as string;
    }
    if (searchValues.placementId) {
        const placement = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/placement/guide/${searchValues.placementId}`);
        searchValues.placementId = placement?.data.id as string;
    }
    if (searchValues.typeId) {
        const dbType = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/type/guide/${searchValues.typeId}`);
        searchValues.typeId = dbType?.data.id as string;
    }
    if (searchValues.federalId) {
        const dbFederal = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/federal/guide/${searchValues.federalId}`);
        searchValues.federalId = dbFederal?.data.id as string;
    }
    if (searchValues.viewId) {
        const dbView = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/view/guide/${searchValues.viewId}`);
        searchValues.viewId = dbView?.data.id as string;
    }
    if (searchValues.articleId) {
        const dbArticle = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article/guide/${searchValues.articleId}`);
        searchValues.articleId = dbArticle?.data.id as string;
    }
    if (searchValues.divisionId) {
        const dbDivision = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/division/guide/${searchValues.divisionId}`);
        searchValues.divisionId = dbDivision?.data.id as string;
    }

    const dbContracts = await db.contract.findMany({
        where: {
            ...searchValues
        }
    })

    if (dbContracts === undefined || dbContracts.length == 0) {
        return { error: "Договор не найден!" };
    }


    const contracts = await getNewContracts(dbContracts as []);

    return {
        contracts,
        success: "Договор найден!"
    };
}

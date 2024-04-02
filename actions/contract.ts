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
import { getContractById, getNewContracts } from "@/data/contract";
import { removeNull } from "@/helpers/remove-null";
import axios from "axios";

export const contractCreate = async (
    values: z.infer<typeof ContractSchema>,
    form: FormData
) => {
    values.pdfFile = form.get('pdfFile') as File;
    if (typeof values.pdfFile === 'string') values.pdfFile = null;

    const user = await currentUser();
    const validateFields = ContractSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Недопустимые поля!" };
    }

    const data = validateFields.data;

    console.log(data);


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

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    const dbContract = await getContractById(id);

    if (!dbContract) {
        return { error: "Договор не существует!" }
    }

    await db.contract.delete({
        where: { id }
    });

    return { success: "Договор удален!" };
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

    const {
        placementId,
        typeId,
        federalId,
        contractNumber,
        startDateOfTheAgreement,
        endDateOfTheContract,
        provider,
        theSubjectOfTheAgreement,
        actuallyPaidFor,
        theAmountOfTheContract,
        returnDate,
        theAmountOfCollateral,
        viewId,
        articleId,
        divisionId,
        sourceOfFinancing,
        MP,
        subcontractorMP,
        transients,
        additionalInformation,
        contractColor,
        pdfFile
    } = validateFields.data;

    const dbPlacement = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/placement/${placementId}`);
    const dbType = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/type/${typeId}`);
    const dbFederal = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/federal/${federalId}`);
    const dbView = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/view/${viewId}`);
    const dbArticle = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article/${articleId}`);
    const dbDivision = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/division/${divisionId}`);
    const dbContractById = await getContractById(id);


    if (!dbContractById) {
        return { error: "Договор не найден!" }
    }

    let oldFile: string = dbContractById.pdfFile as string;

    const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "d-MM-yy")}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    const filename = `${uuidv4()}.pdf`;

    if (pdfFile !== undefined && typeof pdfFile !== 'string') {
        const file: File | null = pdfFile as unknown as File

        const buffer = Buffer.from(await file.arrayBuffer());


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
            oldFile = `${relativeUploadDir}/${filename}`;
        } catch (e) {
            console.error("Ошибка при попытке загрузить файл\n", e);
            return { error: "Что-то пошло не так!" }
        }
    }

    await db.contract.update({
        where: {
            id: dbContractById.id
        },
        data: {
            placementId: dbPlacement?.data.id,
            typeId: dbType?.data.id,
            federalId: dbFederal?.data.id,
            contractNumber,
            startDateOfTheAgreement,
            endDateOfTheContract,
            provider,
            contractColor,
            theSubjectOfTheAgreement,
            actuallyPaidFor,
            theAmountOfTheContract,
            returnDate,
            theAmountOfCollateral,
            viewId: dbView?.data.id,
            articleId: dbArticle?.data.id,
            divisionId: dbDivision?.data.id,
            sourceOfFinancing,
            additionalInformation,
            MP,
            subcontractorMP,
            transients,
            userId: user?.id as string,
            pdfFile: oldFile
        }
    })

    return { success: "Договор изменен!" };
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

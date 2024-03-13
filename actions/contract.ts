"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { ContractSchema, SearchContractSchema } from "@/schemas/contract.schema";
import { getPlacementByName } from "@/data/placement";
import { getTypeByName } from "@/data/type";
import { getFederalByName } from "@/data/federal";
import { getViewByName } from "@/data/view";
import { getArticleByName } from "@/data/article";
import { getDivisionByName } from "@/data/division";
import { getContractById, getContracts } from "@/data/contract";
import { removeNull } from "@/helpers/remove-null";

export const contractCreate = async (
    values: z.infer<typeof ContractSchema>
) => {
    const user = await currentUser();
    const validateFields = ContractSchema.safeParse(values);

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    if (!validateFields.success) {
        return { error: "Недопустимые поля!" };
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
        contractColor
    } = validateFields.data;

    const dbPlacement = await getPlacementByName(placementId as string);
    const dbType = await getTypeByName(typeId as string);
    const dbFederal = await getFederalByName(federalId as string);
    const dbView = await getViewByName(viewId as string);
    const dbArticle = await getArticleByName(articleId as string);
    const dbDivision = await getDivisionByName(divisionId as string);


    const dbContract = await db.contract.findFirst({
        where: {
            contractNumber,
            startDateOfTheAgreement,
            provider,
            divisionId: dbDivision?.id
        }
    })

    if (dbContract) {
        return { error: "Контракт уже существует!" }
    }


    if (MP !== undefined
        && subcontractorMP !== undefined
        && transients !== undefined
        && dbView?.id !== undefined
        && dbPlacement?.id !== undefined
        && dbType?.id !== undefined
        && dbFederal?.id !== undefined
        && dbArticle?.id !== undefined
        && dbDivision?.id !== undefined) {
        await db.contract.create({
            data: {
                placementId: dbPlacement?.id,
                typeId: dbType?.id,
                federalId: dbFederal?.id,
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
                viewId: dbView?.id,
                articleId: dbArticle?.id,
                divisionId: dbDivision?.id,
                sourceOfFinancing,
                additionalInformation,
                MP,
                subcontractorMP,
                transients,
                userId: user?.id as string
            }
        });
    }

    return { success: "Договор добавлен" };
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
    id: string
) => {
    const user = await currentUser();
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
    } = validateFields.data;

    const dbPlacement = await getPlacementByName(placementId as string);
    const dbDivision = await getDivisionByName(divisionId as string);
    const dbType = await getTypeByName(typeId as string);
    const dbFederal = await getFederalByName(federalId as string);
    const dbView = await getViewByName(viewId as string);
    const dbArticle = await getArticleByName(articleId as string);
    const dbContractById = await getContractById(id);


    if (!dbContractById) {
        return { error: "Договор не найден!" }
    }

    await db.contract.update({
        where: {
            id: dbContractById.id
        },
        data: {
            placementId: dbPlacement?.id,
            typeId: dbType?.id,
            federalId: dbFederal?.id,
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
            viewId: dbView?.id,
            articleId: dbArticle?.id,
            divisionId: dbDivision?.id,
            sourceOfFinancing,
            additionalInformation,
            MP,
            subcontractorMP,
            transients,
            userId: user?.id as string
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


    if (searchValues.placementId) {
        const placement = await getPlacementByName(searchValues.placementId as string);
        searchValues.placementId = placement?.id as string;
    }
    if (searchValues.typeId) {
        const dbType = await getTypeByName(searchValues.typeId as string);
        searchValues.typeId = dbType?.id as string;
    }
    if (searchValues.federalId) {
        const dbFederal = await getFederalByName(searchValues.federalId as string);
        searchValues.federalId = dbFederal?.id as string;
    }
    if (searchValues.viewId) {
        const dbView = await getViewByName(searchValues.viewId as string);
        searchValues.viewId = dbView?.id as string;
    }
    if (searchValues.articleId) {
        const dbArticle = await getArticleByName(searchValues.articleId as string);
        searchValues.articleId = dbArticle?.id as string;
    }
    if (searchValues.divisionId) {
        const dbDivision = await getDivisionByName(searchValues.divisionId as string);
        searchValues.divisionId = dbDivision?.id as string;
    }

    const contracts = await db.contract.findMany({
        where: {
            ...searchValues
        }
    })


    return {
        contracts,
        success: "Договор изменен!"
    };
}

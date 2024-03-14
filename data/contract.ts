import { db } from "@/lib/db";
import { getPlacementById } from "./placement";
import { getDivisionById } from "./division";
import { getUserById } from "./user";
import { getViewById } from "./view";
import { getArticleById } from "./article";
import { getFederalById } from "./federal";
import { getTypeById } from "./type";

export const getContractById = async (id: string) => {
    try {
        const contract = await db.contract.findUnique({
            where: { id }
        });

        return contract;
    } catch {
        return null;
    }
}

export const getContracts = async () => {
    try {
        const contract = await db.contract.findMany();

        return contract;
    } catch {
        return null;
    }
}

interface ContractParam {
    id: string,
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
    contractColor: string
    userId: string
}

export const getNewContracts = async (contracts: ContractParam[]) => {
    const newContrats = await Promise.all(contracts?.map(async (contract) => {
        const placement = await getPlacementById(contract.placementId as string);
        const division = await getDivisionById(contract.divisionId as string);
        const executor = await getUserById(contract.userId as string);
        const view = await getViewById(contract.viewId as string);
        const article = await getArticleById(contract.articleId as string);
        const federal = await getFederalById(contract.federalId as string);
        const type = await getTypeById(contract.typeId as string);

        return {
            ...contract,
            placementId: placement?.name as string,
            divisionId: division?.name as string,
            userId: executor?.name as string,
            viewId: view?.name as string,
            articleId: article?.name as string,
            federalId: federal?.name as string,
            typeId: type?.name as string
        }
    }))

    return newContrats;
}
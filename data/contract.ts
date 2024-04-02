import { db } from "@/lib/db";
import axios from "axios";
import { getUserById } from "./user";

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
        const placement = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/placement/${contract.placementId}`);
        const division = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/division/${contract.divisionId}`);
        const executor = await getUserById(contract.userId as string);
        const view = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/view/${contract.viewId}`);
        const article = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article/${contract.articleId}`);
        const federal = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/federal/${contract.federalId}`);
        const type = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/type/${contract.typeId}`);

        return {
            ...contract,
            placementId: placement?.data ? placement?.data.name : null,
            divisionId: division?.data.name as string,
            userId: executor?.name as string,
            viewId: view?.data.name as string,
            articleId: article?.data.name as string,
            federalId: federal?.data ? federal.data.name : null,
            typeId: type?.data ? type.data.name : null
        }
    }))

    return newContrats;
}
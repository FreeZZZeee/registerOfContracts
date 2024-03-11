import { db } from "@/lib/db";

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

import { db } from "@/lib/db";

export const getPayByContractId = async (contract: string) => {
    try {
        const payment = await db.paid.findMany({
            where: { contract }
        });

        return payment;
    } catch {
        return null;
    }
}
import { db } from "@/lib/db";

export const getProviderById = async (id: string) => {
    try {
        const provider = await db.provider.findUnique({
            where: { id }
        });

        return provider;
    } catch {
        return null;
    }
}

export const getProviderByName = async (name: string) => {
    try {
        const provider = await db.provider.findUnique({
            where: { name }
        });

        return provider;
    } catch {
        return null;
    }
}
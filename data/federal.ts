import { db } from "@/lib/db";

export const getFederalById = async (id: string) => {
    try {
        const federal = await db.federal.findUnique({
            where: { id }
        });

        return federal;
    } catch {
        return null;
    }
}

export const getFederalByName = async (name: string) => {
    try {
        const federal = await db.federal.findUnique({
            where: { name }
        });

        return federal;
    } catch {
        return null;
    }
}

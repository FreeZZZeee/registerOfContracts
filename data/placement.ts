import { db } from "@/lib/db";

export const getPlacementByName = async (name: string) => {
    try {
        const placement = await db.placement.findUnique({
            where: { name }
        });

        return placement;
    } catch {
        return null;
    }
}

export const getPlacementById = async (id: string) => {
    try {
        const placement = await db.placement.findUnique({
            where: { id }
        });

        return placement;
    } catch {
        return null;
    }
}

export const getPlacements = async () => {
    try {
        const placement = await db.placement.findMany();        

        return placement;
    } catch {
        return null;
    }
}

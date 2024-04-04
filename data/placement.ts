import { db } from "@/lib/db";

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
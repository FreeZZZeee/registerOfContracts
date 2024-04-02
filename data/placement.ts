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
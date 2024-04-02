import { db } from "@/lib/db";

export const getDivisionById = async (id: string) => {
    try {
        const division = await db.division.findUnique({
            where: { id }
        });

        return division;
    } catch {
        return null;
    }
}

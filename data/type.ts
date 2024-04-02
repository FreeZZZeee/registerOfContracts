import { db } from "@/lib/db";

export const getTypeById = async (id: string) => {
    try {
        const type = await db.type.findUnique({
            where: { id }
        });

        return type;
    } catch {
        return null;
    }
}

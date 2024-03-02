import { db } from "@/lib/db";

export const getTypeByName = async (name: string) => {
    try {
        const type = await db.type.findUnique({
            where: { name }
        });

        return type;
    } catch {
        return null;
    }
}

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

export const getTypes = async () => {
    try {
        const type = await db.type.findMany();        

        return type;
    } catch {
        return null;
    }
}

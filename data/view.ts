import { db } from "@/lib/db";

export const getViewById = async (id: string) => {
    try {
        const view = await db.view.findUnique({
            where: { id }
        });

        return view;
    } catch {
        return null;
    }
}

export const getViewByName = async (name: string) => {
    try {
        const view = await db.view.findUnique({
            where: { name }
        });

        return view;
    } catch {
        return null;
    }
}



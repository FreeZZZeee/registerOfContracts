import { db } from "@/lib/db";

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

export const getViews = async () => {
    try {
        const view = await db.view.findMany();        

        return view;
    } catch {
        return null;
    }
}

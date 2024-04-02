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

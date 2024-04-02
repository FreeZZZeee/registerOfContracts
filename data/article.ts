import { db } from "@/lib/db";

export const getArticleById = async (id: string) => {
    try {
        const article = await db.article.findUnique({
            where: { id }
        });

        return article;
    } catch {
        return null;
    }
}

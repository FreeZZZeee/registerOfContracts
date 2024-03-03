import { db } from "@/lib/db";

export const getArticleByName = async (name: string) => {
    try {
        const article = await db.article.findUnique({
            where: { name }
        });

        return article;
    } catch {
        return null;
    }
}

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

export const getArticles = async () => {
    try {
        const article = await db.article.findMany();        

        return article;
    } catch {
        return null;
    }
}

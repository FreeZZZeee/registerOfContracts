import { currentUser } from "@/lib/auth";
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clause`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        let result = await response.json();

        if (response?.ok) {
            return result
        }

    } catch {
        return null;
    }
}

import { Referece } from "@/interfaces/references.interface";
import { db } from "@/lib/db";
import axios from "axios";

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
        const { data: clause } = await axios.get<Referece[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clause`);

        return clause;
    } catch {
        return null;
    }
}

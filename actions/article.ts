"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { ArticleSchema } from "@/schemas/article.schema";
import { getArticleById, getArticleByName } from "@/data/article";

export const articleCreate = async (
    values: z.infer<typeof ArticleSchema>
) => {
    const user = await currentUser();
    const validateFields = ArticleSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Недопустимое поле!" };
    }

    const { name } = validateFields.data;

    const dbArticle = await getArticleByName(name)

    if (dbArticle) {
        return { error: "Статья расходов уже существует!" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clause`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            user
        }),
    });

    let result = await response.json();

    if (response?.ok) {
        return { success: result.message }
    }

    return { error: result.message };
}

export const artcleUpdate = async (
    values: z.infer<typeof ArticleSchema>,
    id: string
) => {
    const user = await currentUser();
    const validateFields = ArticleSchema.safeParse(values);

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    if (!validateFields.success) {
        return { error: "Недопустимое поле!" };
    }

    const { name } = validateFields.data;

    const dbArticle = await getArticleByName(name)
    const dbArticleById = await getArticleById(id);

    if (dbArticle) {
        return { error: "Статья расходов уже существует!" }
    }

    if (!dbArticleById) {
        return { error: "Статья расходов не найдена!" }
    }

    await db.article.update({
        where: {
            id: dbArticleById.id
        },
        data: { name }
    });


    return { success: "Статья расходов добавлена!" };
}

export const articleDelete = async (id: string) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    const dbArticle = await getArticleById(id);

    if (!dbArticle) {
        return { error: "Статья расходов не существует!" }
    }

    await db.article.delete({
        where: { id }
    });


    return { success: "Статья расходов удалена!" };
}
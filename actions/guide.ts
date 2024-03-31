"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getArticleById, getArticleByName } from "@/data/article";
import { User } from "@/interfaces/user";
import axios from "axios";
import { GuideSchema } from "@/schemas/guide.schema";

export const guideCreateAction = async (
    values: z.infer<typeof GuideSchema>,
    dbName: string,
) => {
    const user = await currentUser();
    const validateFields = GuideSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Недопустимое поле!" };
    }

    const data = validateFields.data;

    const dbArticle = await getArticleByName(data.name)

    if (dbArticle) {
        return { error: "Справочник уже существует!" };
    }

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}`, {
        name: data.name,
        user
    });

    if (res?.statusText === 'OK') {
        return { success: "Справочник создан!" }
    }

    return { error: res.data?.message };
}

export const artcleUpdate = async (
    values: z.infer<typeof GuideSchema>,
    id: string
) => {
    const user = await currentUser();
    const validateFields = GuideSchema.safeParse(values);

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

export const guideDeleteAction = async (dbName: string, id: string) => {
    const user: User = await currentUser() as User;

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    const dbArticle = await getArticleById(id);

    if (!dbArticle) {
        return { error: "Справочник не существует!" }
    }

    const res: any = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}/${id}`)

    if (res?.statusText === 'OK') {
        return { success: res.data?.message }
    }

    return { error: res.data?.message };
}
"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { ViewSchema } from "@/schemas/view.schema";
import { getViewById, getViewByName } from "@/data/view";

export const viewCreate = async (
    values: z.infer<typeof ViewSchema>
) => {
    const user = await currentUser();
    const validateFields = ViewSchema.safeParse(values);

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

    const dbType = await getViewByName(name)

    if (dbType) {
        return { error: "Вид закупки уже существует!" }
    }    

    await db.view.create({
        data: { 
            name
         }
    });

    return { success: "Вид закупки добавлен" };
}

export const viewUpdate = async (
    values: z.infer<typeof ViewSchema>,
    id: string
) => {
    const user = await currentUser();
    const validateFields = ViewSchema.safeParse(values);

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

    const dbType = await getViewByName(name)
    const dbTypeById = await getViewById(id);

    if (dbType) {
        return { error: "Вид закупки уже существует!" }
    }    

    if (!dbTypeById) {
        return { error: "Вид закупки не найден!" }
    }

    await db.view.update({
        where: {
            id: dbTypeById.id
        },
        data: { name }
    });


    return { success: "Вид закупки добавлен" };
}

export const viewDelete = async (id: string) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Неавторизованный" };
    }    

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    const dbType = await getViewById(id);

    if (!dbType) {
        return { error: "Вид закупки не существует!" }
    }    

    await db.view.delete({
        where: { id }
    });


    return { success: "Вид закупки удален!" };
}
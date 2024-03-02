"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { TypeSchema } from "@/schemas/type.schema";
import { getTypeById, getTypeByName } from "@/data/type";

export const typeCreate = async (
    values: z.infer<typeof TypeSchema>
) => {
    const user = await currentUser();
    const validateFields = TypeSchema.safeParse(values);

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

    const dbType = await getTypeByName(name)

    if (dbType) {
        return { error: "Тип ЕП уже существует!" }
    }    

    await db.type.create({
        data: { 
            name
         }
    });

    return { success: "Тип ЕП добавлен" };
}

export const typeUpdate = async (
    values: z.infer<typeof TypeSchema>,
    id: string
) => {
    const user = await currentUser();
    const validateFields = TypeSchema.safeParse(values);

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

    const dbType = await getTypeByName(name)
    const dbTypeById = await getTypeById(id);

    if (dbType) {
        return { error: "Тип ЕП уже существует!" }
    }    

    if (!dbTypeById) {
        return { error: "Тип ЕП не найден!" }
    }

    await db.type.update({
        where: {
            id: dbTypeById.id
        },
        data: { name }
    });


    return { success: "Тип ЕП добавлен" };
}

export const typeDelete = async (id: string) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Неавторизованный" };
    }    

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    const dbType = await getTypeById(id);

    if (!dbType) {
        return { error: "Тип ЕП не существует!" }
    }    

    await db.type.delete({
        where: { id }
    });


    return { success: "Тип ЕП удален!" };
}
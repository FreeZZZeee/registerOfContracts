"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { FederalSchema } from "@/schemas/federal.schema";
import { getFederalById, getFederalByName } from "@/data/federal";

export const federalCreate = async (
    values: z.infer<typeof FederalSchema>
) => {
    const user = await currentUser();
    const validateFields = FederalSchema.safeParse(values);

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

    const dbFederal = await getFederalByName(name)

    if (dbFederal) {
        return { error: "Федеральный закон уже существует!" }
    }    

    await db.federal.create({
        data: { 
            name
         }
    });

    return { success: "Федеральный закон добавлен" };
}

export const federalUpdate = async (
    values: z.infer<typeof FederalSchema>,
    id: string
) => {
    const user = await currentUser();
    const validateFields = FederalSchema.safeParse(values);

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

    const dbFederal = await getFederalByName(name)
    const dbFederalById = await getFederalById(id);

    if (dbFederal) {
        return { error: "Федеральный закон уже существует!" }
    }    

    if (!dbFederalById) {
        return { error: "Федеральный закон не найден!" }
    }

    await db.federal.update({
        where: {
            id: dbFederalById.id
        },
        data: { name }
    });


    return { success: "Федеральный закон добавлен" };
}

export const federalDelete = async (id: string) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Неавторизованный" };
    }    

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    const dbFederal = await getFederalById(id);

    if (!dbFederal) {
        return { error: "Федеральный закон не существует!" }
    }    

    await db.federal.delete({
        where: { id }
    });


    return { success: "Федеральный закон удален!" };
}
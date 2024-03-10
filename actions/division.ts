"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { DivisionSchema } from "@/schemas/division.schema";
import { getDivisionById, getDivisionByName } from "@/data/division";

export const divisionCreate = async (
    values: z.infer<typeof DivisionSchema>
) => {
    const user = await currentUser();
    const validateFields = DivisionSchema.safeParse(values);

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

    const dbDivision = await getDivisionByName(name)

    if (dbDivision) {
        return { error: "Подразделение уже существует!" }
    }

    await db.division.create({
        data: {
            name
        }
    });

    return { success: "Подразделение добавлено" };
}

export const divisionUpdate = async (
    values: z.infer<typeof DivisionSchema>,
    id: string
) => {
    const user = await currentUser();
    const validateFields = DivisionSchema.safeParse(values);

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

    const dbDivision = await getDivisionByName(name)
    const dbDivisionById = await getDivisionById(id);

    if (dbDivision) {
        return { error: "Подразделение уже существует!" }
    }

    if (!dbDivisionById) {
        return { error: "Подразделение не найдено!" }
    }

    await db.division.update({
        where: {
            id: dbDivisionById.id
        },
        data: { name }
    });


    return { success: "Подразделение добавлено!" };
}

export const divisionDelete = async (id: string) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    const dbDivision = await getDivisionById(id);

    if (!dbDivision) {
        return { error: "Подразделение не существует!" }
    }

    await db.division.delete({
        where: { id }
    });


    return { success: "Подразделение удалено!" };
}
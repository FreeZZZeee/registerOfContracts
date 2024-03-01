"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { PlacementSchema } from "@/schemas/placement.schema";
import { getPlacementByName } from "@/data/placement";

export const placementCreate = async (
    values: z.infer<typeof PlacementSchema>
) => {
    const user = await currentUser();
    const validateFields = PlacementSchema.safeParse(values);

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

    const dbPlacement = await getPlacementByName(name)

    if (dbPlacement) {
        return { error: "Способ размещения уже существует!" }
    }    

    await db.placement.create({
        data: { 
            name
         }
    });

    return { success: "Способ размещения добавлен" };
}

export const placementUpdate = async (
    values: z.infer<typeof PlacementSchema>
) => {
    const user = await currentUser();
    const validateFields = PlacementSchema.safeParse(values);

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

    const dbPlacement = await getPlacementByName(name)

    if (dbPlacement) {
        return { error: "Способ размещения уже существует!" }
    }    

    await db.placement.create({
        data: { name }
    });


    return { success: "Способ размещения добавлен" };
}
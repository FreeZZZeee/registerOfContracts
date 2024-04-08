"use server"

import * as z from "zod";
import axios from "axios";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { User } from "@/interfaces/user";
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

    const guideFromDB = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}/guide/${data.name}`);

    if (guideFromDB?.data) {
        return { error: "Справочник уже существует!" }
    }

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}`, {
        name: data.name,
        user
    });

    if (res?.statusText === 'OK') {
        return { success: res.data?.message }
    }

    return { error: res.data?.message };
}

export const guideUpdateAction = async (
    values: z.infer<typeof GuideSchema>,
    id: string,
    dbName: string,
) => {
    const user = await currentUser();
    const validateFields = GuideSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Недопустимое поле!" };
    }

    const { name } = validateFields.data;

    const guideFromDB = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}/guide/${name}`);
    const guideIDFromDB = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}/${id}`)


    if (guideFromDB?.data) {
        return { error: "Справочник уже существует!" }
    }

    if (!guideIDFromDB?.data) {
        return { error: "Справочник не существует!" }
    }

    const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}/${guideIDFromDB.data.id}`, {
        name,
        user
    })

    if (res?.statusText === 'OK') {
        return { success: res.data?.message }
    }

    return { error: res.data?.message };
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

    const guideFromDB = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}/${id}`)

    if (!guideFromDB?.data) {
        return { error: "Справочник не существует!" }
    }

    const res: any = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}/${id}`)

    if (res?.statusText === 'OK') {
        return { success: res.data?.message }
    }

    return { error: res.data?.message };
}
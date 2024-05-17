"use server"

import * as z from "zod";
import axios from "axios";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { User } from "@/interfaces/user";
import { GuideSchema } from "@/schemas/guide.schema";
import { PaymentSchema } from "@/schemas/payment.schema";

export const payCreateAction = async (
    values: z.infer<typeof PaymentSchema>,
) => {
    const user = await currentUser();
    values.paymentRegistrationDate = new Date(values.paymentRegistrationDate as Date)
    const validateFields = PaymentSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Недопустимое поле!" };
    }

    const data = validateFields.data;

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
        data,
        user
    });

    if (res?.statusText === 'OK') {
        return { success: res?.data?.message }
    }

    return { error: res?.data?.message };
}

export const payUpdateAction = async (
    values: z.infer<typeof PaymentSchema>,
    id: string,
) => {
    const user = await currentUser();
    values.paymentRegistrationDate = new Date(values.paymentRegistrationDate as Date)
    const validateFields = PaymentSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Недопустимое поле!" };
    }

    const data = validateFields.data;

    const paidIDFromDB = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/${id}`)


    if (!paidIDFromDB?.data) {
        return { error: "Сумма платежа не существует!" }
    }

    const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/${paidIDFromDB.data.id}`, {
        data,
        user
    })

    if (res?.statusText === 'OK') {
        return { success: res?.data?.message }
    }

    return { error: res?.data?.message };
}

export const payDeleteAction = async (id: string) => {
    const user: User = await currentUser() as User;

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    const paidIDFromDB = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/${id}`)


    if (!paidIDFromDB?.data) {
        return { error: "Сумма платежа не существует!" }
    }

    const res: any = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/${id}`)

    if (res?.statusText === 'OK') {
        return { success: res?.data?.message }
    }

    return { error: res?.data?.message };
}
"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token: string | null
) => {
    if (!token) {
        return { error: "Токен не найден!" };
    }

    const validateFields = NewPasswordSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Недопустимые поля!" };
    }

    const { password } = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Не правильный токен!" }
    }
    
    const hasExpired = new Date(existingToken.expires) < new Date;

    if (hasExpired) {
        return { error: "Срок действия токена истек!" }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Данная электронная почта не существует!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    });

    return { success: "Пароль обновлен!" }
}
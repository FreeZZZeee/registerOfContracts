"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { unstable_update } from "@/auth";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { ContractSchema } from "@/schemas/contract.schema";

export const contract = async (
    values: z.infer<typeof ContractSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }
 
    return { success: "Настройки обновлены" };
}
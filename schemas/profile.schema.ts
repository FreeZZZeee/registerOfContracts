import { UserRole } from "@prisma/client";
import * as z from "zod";

export const ProfileSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6, {
        message: "Минимальная длинна пароля 6 символов"
    })),
    newPassword: z.optional(z.string().min(6, {
        message: "Минимальная длинна пароля 6 символов"
    }))
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    }, {
        message: "Требуется новый пароль!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    }, {
        message: "Требуется пароль!",
        path: ["password"]
    })

import * as z from "zod";

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Требуется email" }),
    password: z.string().min(6, {
        message: "Минимальная длинна пароля 6 символов"
    }),
    login: z.string().min(1, {
        message: "Требуется логин"
    })
});
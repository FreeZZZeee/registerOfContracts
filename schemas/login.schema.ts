import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string().email({ message: "Требуется email" }),
    password: z.string().min(1, {
        message: "Требуется пароль"
    }),
    code: z.optional(z.string())
});
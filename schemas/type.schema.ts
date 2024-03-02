import * as z from "zod";

export const TypeSchema = z.object({
    name: z.string().min(1, { message: "Обязательно к заполнению!" }),
});
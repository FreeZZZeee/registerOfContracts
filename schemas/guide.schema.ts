import * as z from "zod";

export const GuideSchema = z.object({
    name: z.string().min(1, { message: "Обязательно к заполнению!" }),
});
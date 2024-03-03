import * as z from "zod";

export const DivisionSchema = z.object({
    name: z.string().min(1, { message: "Обязательно к заполнению!" }),
});
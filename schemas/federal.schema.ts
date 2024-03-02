import * as z from "zod";

export const FederalSchema = z.object({
    name: z.string().min(1, { message: "Обязательно к заполнению!" }),
});
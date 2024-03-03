import * as z from "zod";

export const ViewSchema = z.object({
    name: z.string().min(1, { message: "Обязательно к заполнению!" }),
});
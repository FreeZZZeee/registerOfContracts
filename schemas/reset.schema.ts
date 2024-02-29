import * as z from "zod";

export const ResetSchema = z.object({
    email: z.string().email({ message: "Требуется email" }),
});
import * as z from "zod";

export const PaymentSchema = z.object({
    amount: z.string().min(1, { message: "Обязательно к заполнению!" }),
    contract: z.optional(z.string()),
    division: z.optional(z.string()),
    paymentOrderNumber: z.optional(z.string()),
    paymentRegistrationDate: z.optional(z.date().or(z.string())),
});
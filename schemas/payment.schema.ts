import * as z from "zod";

export const PaymentSchema = z.object({
    amount: z.string().min(1, { message: "Обязательно к заполнению!" }),
    contractId: z.optional(z.string()),
    divisionId: z.optional(z.string()),
    paymentOrderNumber: z.optional(z.string()),
    paymentRegistrationDate: z.optional(z.date()),
});
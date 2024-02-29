import * as z from "zod";

export const ContractSchema = z.object({
    name: z.string()
});
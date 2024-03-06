import * as z from "zod";

export const ContractSchema = z.object({
    placement: z.optional(z.string()),
    type: z.optional(z.string()),
    federal: z.optional(z.string()),
    contractNumber: z.optional(z.string()),
    startDateOfTheAgreement: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    endDateOfTheContract: z.optional(z.string()),
    provider: z.optional(z.string()),
    contractColor: z.optional(z.string()),
    theSubjectOfTheAgreement: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    actuallyPaidFor: z.optional(z.string()),
    theAmountOfTheContract: z.optional(z.string()),
    returnDate: z.optional(z.string()),
    theAmountOfCollateral: z.optional(z.string()),
    classifierSection: z.optional(z.string()),
    classifierSection2014: z.optional(z.string()),
    view: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    article: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    division: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    sourceOfFinancing: z.optional(z.string()),
    additionalInformation: z.optional(z.string()),
    MP: z.optional(z.boolean()),
    subcontractorMP: z.optional(z.boolean()),
    transients: z.optional(z.boolean()),
});
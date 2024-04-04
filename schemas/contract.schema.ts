import * as z from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10; // 10MB
const ACCEPTED_FILE_TYPES = [
    'application/pdf',
    'application/x-pdf',
    'application/x-bzpdf',
    'application/x-gzpdf',
    'applications/vnd.pdf',
    'application/acrobat',
    'application/x-google-chrome-pdf',
    'text/pdf',
    'text/x-pdf',
];

export const ContractSchema = z.object({
    placementId: z.optional(z.string()),
    typeId: z.optional(z.string()),
    federalId: z.optional(z.string()),
    contractNumber: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    startDateOfTheAgreement: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    endDateOfTheContract: z.optional(z.string()),
    provider: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    contractColor: z.optional(z.string()),
    pdfFile: z.optional(z
        .instanceof(File)
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'Размер файла должен быть меньше 10 МБ')
        .refine((file) => {
            return ACCEPTED_FILE_TYPES.includes(file?.type as string);
        }, 'Файл должен быть в формате PDF')).nullable().or(z.string()),
    theSubjectOfTheAgreement: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    actuallyPaidFor: z.optional(z.string()),
    theAmountOfTheContract: z.optional(z.string()),
    returnDate: z.optional(z.string()),
    theAmountOfCollateral: z.optional(z.string()),
    viewId: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    articleId: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    divisionId: z.string().min(1, {
        message: "Обязательно к заполнению"
    }),
    sourceOfFinancing: z.optional(z.string()),
    additionalInformation: z.optional(z.string()),
    MP: z.optional(z.boolean()),
    subcontractorMP: z.optional(z.boolean()),
    transients: z.optional(z.boolean()),
    userId: z.optional(z.string())
});

export const SearchContractSchema = z.object({
    placementId: z.string(),
    typeId: z.optional(z.string()),
    federalId: z.optional(z.string()),
    contractNumber: z.optional(z.string()),
    startDateOfTheAgreement: z.optional(z.string()),
    endDateOfTheContract: z.optional(z.string()),
    provider: z.optional(z.string()),
    contractColor: z.optional(z.string()),
    theSubjectOfTheAgreement: z.optional(z.string()),
    actuallyPaidFor: z.optional(z.string()),
    theAmountOfTheContract: z.optional(z.string()),
    returnDate: z.optional(z.string()),
    theAmountOfCollateral: z.optional(z.string()),
    viewId: z.optional(z.string()),
    articleId: z.optional(z.string()),
    divisionId: z.optional(z.string()),
    sourceOfFinancing: z.optional(z.string()),
    additionalInformation: z.optional(z.string()),
    MP: z.optional(z.boolean()),
    subcontractorMP: z.optional(z.boolean()),
    transients: z.optional(z.boolean()),
    userId: z.optional(z.string())
});
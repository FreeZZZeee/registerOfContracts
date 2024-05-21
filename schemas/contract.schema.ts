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
    placement: z.optional(z.string()),
    type: z.optional(z.string()),
    federal: z.optional(z.string()),
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
    thePostagePeriod: z.optional(z.string()),
    contractColor: z.optional(z.string()),
    point: z.optional(z.string()),
    subItem: z.optional(z.string()),
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
    theAmountOfTheContract: z.optional(z.string()),
    returnDate: z.optional(z.string()),
    theAmountOfCollateral: z.optional(z.string()),
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
    subcontractorMP: z.optional(z.boolean()),
    transients: z.optional(z.boolean()),
    micro: z.optional(z.boolean()),
    small: z.optional(z.boolean()),
    average: z.optional(z.boolean()),
    userId: z.optional(z.string())
});

export const SearchContractSchema = z.object({
    placement: z.string(),
    type: z.optional(z.string()),
    federal: z.optional(z.string()),
    contractNumber: z.optional(z.string()),
    startDateOfTheAgreement: z.optional(z.string()),
    endDateOfTheContract: z.optional(z.string()),
    provider: z.optional(z.string()),
    contractColor: z.optional(z.string()),
    theSubjectOfTheAgreement: z.optional(z.string()),
    thePostagePeriod: z.optional(z.string()),
    point: z.optional(z.string()),
    subItem: z.optional(z.string()),
    actuallyPaidFor: z.optional(z.string()),
    theAmountOfTheContract: z.optional(z.string()),
    returnDate: z.optional(z.string()),
    theAmountOfCollateral: z.optional(z.string()),
    view: z.optional(z.string()),
    article: z.optional(z.string()),
    division: z.optional(z.string()),
    sourceOfFinancing: z.optional(z.string()),
    additionalInformation: z.optional(z.string()),
    subcontractorMP: z.optional(z.boolean()),
    transients: z.optional(z.boolean()),
    micro: z.optional(z.boolean()),
    small: z.optional(z.boolean()),
    average: z.optional(z.boolean()),
    userId: z.optional(z.string())
});
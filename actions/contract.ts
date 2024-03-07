"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { ContractSchema } from "@/schemas/contract.schema";
import { getPlacementByName } from "@/data/placement";
import { getTypeByName } from "@/data/type";
import { getFederalByName } from "@/data/federal";
import { getViewByName } from "@/data/view";
import { getArticleByName } from "@/data/article";
import { getDivisionByName } from "@/data/division";

export const contractCreate = async (
    values: z.infer<typeof ContractSchema>
) => {
    const user = await currentUser();
    const validateFields = ContractSchema.safeParse(values);

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    if (!validateFields.success) {
        return { error: "Недопустимые поля!" };
    }

    const { 
        placement,
        type,
        federal,
        contractNumber,
        startDateOfTheAgreement,
        endDateOfTheContract,
        provider,
        theSubjectOfTheAgreement,
        actuallyPaidFor,
        theAmountOfTheContract,
        returnDate,
        theAmountOfCollateral,
        classifierSection,
        classifierSection2014,
        view,
        article,
        division,
        sourceOfFinancing,
        MP,
        subcontractorMP,
        transients,
        additionalInformation,
        contractColor
     } = validateFields.data;

     const dbPlacement = await getPlacementByName(placement as string);
     const dbType = await getTypeByName(type as string);
     const dbFederal = await getFederalByName(federal as string);
     const dbView = await getViewByName(view as string); 
     const dbArticle = await getArticleByName(article as string);
     const dbDivision = await getDivisionByName(division as string);

     if (MP !== undefined 
        && subcontractorMP !== undefined 
        && transients !== undefined 
        && dbView?.id !== undefined
        && dbPlacement?.id !== undefined
        && dbType?.id !== undefined
        && dbFederal?.id !== undefined
        && dbArticle?.id !== undefined
        && dbDivision?.id !== undefined) {
        const obj = await db.contract.create({
            data: {
                placementId: dbPlacement?.id,
                typeId: dbType?.id,
                federalId: dbFederal?.id,
                contractNumber,
                startDateOfTheAgreement,
                endDateOfTheContract,
                provider,
                contractColor,
                theSubjectOfTheAgreement,
                actuallyPaidFor,
                theAmountOfTheContract,
                returnDate,
                theAmountOfCollateral,
                classifierSection,
                classifierSection2014,
                viewId: dbView?.id,
                articleId: dbArticle?.id,
                divisionId: dbDivision?.id,
                sourceOfFinancing,
                additionalInformation,
                MP,
                subcontractorMP,
                transients,                
            }
        });
    }
    
    
 
    return { success: "Договор добавлен" };
}

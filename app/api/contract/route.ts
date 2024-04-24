import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getPlacementById, getPlacementByName } from "@/data/placement";
import { getDivisionById, getDivisionByName } from "@/data/division";
import { getViewById, getViewByName } from "@/data/view";
import { getArticleById, getArticleByName } from "@/data/article";
import { getFederalById, getFederalByName } from "@/data/federal";
import { getTypeById, getTypeByName } from "@/data/type";
import { getProviderByName } from "@/data/provider";

export async function POST(req: Request) {
    const {
        data,
        user
    } = await req.json();

    if (!user) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    const {
        placementId,
        typeId,
        federalId,
        contractNumber,
        startDateOfTheAgreement,
        endDateOfTheContract,
        provider,
        theSubjectOfTheAgreement,
        theAmountOfTheContract,
        thePostagePeriod,
        point,
        subItem,
        returnDate,
        theAmountOfCollateral,
        viewId,
        articleId,
        divisionId,
        sourceOfFinancing,
        MP,
        subcontractorMP,
        transients,
        micro,
        small,
        average,
        additionalInformation,
        contractColor,
        pdfFile
    } = data;

    const dbPlacement = await getPlacementByName(placementId);
    const dbType = await getTypeByName(typeId);
    const dbFederal = await getFederalByName(federalId);
    const dbView = await getViewByName(viewId);
    const dbArticle = await getArticleByName(articleId);
    const dbDivision = await getDivisionByName(divisionId);
    let dbProvider = await getProviderByName(provider);

    if (!dbProvider) {
        await db.provider.create({
            data: {
                name: provider
            }
        })
        dbProvider = await getProviderByName(provider);
    }

    const dbContract = await db.contract.findFirst({
        where: {
            contractNumber,
            startDateOfTheAgreement,
            providerId: dbProvider?.id,
            divisionId: dbDivision?.id as string
        }
    })

    if (dbContract) {
        return NextResponse.json({ message: "Договор уже существует!" }, { status: 409 });
    }

    if (MP !== undefined
        && subcontractorMP !== undefined
        && transients !== undefined) {
        await db.contract.create({
            data: {
                placementId: dbPlacement?.id as string,
                typeId: dbType?.id as string,
                federalId: dbFederal?.id as string,
                contractNumber,
                startDateOfTheAgreement,
                endDateOfTheContract,
                contractColor,
                theSubjectOfTheAgreement,
                theAmountOfTheContract,
                thePostagePeriod,
                point,
                subItem,
                returnDate,
                theAmountOfCollateral,
                viewId: dbView?.id as string,
                articleId: dbArticle?.id as string,
                divisionId: dbDivision?.id as string,
                providerId: dbProvider?.id as string,
                sourceOfFinancing,
                additionalInformation,
                MP,
                micro,
                small,
                average,
                subcontractorMP,
                transients,
                userId: user?.id as string,
                pdfFile: pdfFile
            }
        });

    }

    return NextResponse.json({ message: "Договор добавлен!" }, { status: 200 });
}

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)
    const user = searchParams.get('user')

    if (!user) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    const dbUser = await getUserById(user as string);

    if (!dbUser) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    const placements = await db.placement.findMany();
    const types = await db.type.findMany();
    const federals = await db.federal.findMany();
    const views = await db.view.findMany();
    const articles = await db.article.findMany();
    const divisions = await db.division.findMany();
    const providers = await db.provider.findMany();
    let contracts = await db.contract.findMany();

    contracts = await Promise.all(contracts?.map(async (contract) => {
        const placement = await getPlacementById(contract.placementId as string);
        const division = await getDivisionById(contract.divisionId as string)
        const executor = await getUserById(contract.userId as string);
        const view = await getViewById(contract.viewId as string);
        const article = await getArticleById(contract.articleId as string);
        const federal = await getFederalById(contract.federalId as string);
        const type = await getTypeById(contract.typeId as string);

        return {
            ...contract,
            placementId: placement?.name as string,
            divisionId: division?.name as string,
            userId: executor?.name as string,
            viewId: view?.name as string,
            articleId: article?.name as string,
            federalId: federal?.name as string,
            typeId: type?.name as string
        }
    }))

    return NextResponse.json({
        contracts,
        placements,
        types,
        federals,
        views,
        articles,
        divisions,
        providers
    });
}
import { NextResponse } from "next/server";
import { stat, mkdir, writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid';
import { join } from "path";
import * as dateFn from "date-fns";
import mime from "mime";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getPlacementById } from "@/data/placement";
import { getDivisionById } from "@/data/division";
import { getViewById } from "@/data/view";
import { getArticleById } from "@/data/article";
import { getFederalById } from "@/data/federal";
import { getTypeById } from "@/data/type";

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
        actuallyPaidFor,
        theAmountOfTheContract,
        returnDate,
        theAmountOfCollateral,
        viewId,
        articleId,
        divisionId,
        sourceOfFinancing,
        MP,
        subcontractorMP,
        transients,
        additionalInformation,
        contractColor,
        pdfFile
    } = data;

    const file: File | null = pdfFile as unknown as File

    let filePath: string = "";

    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "d-MM-yy")}`;
        const uploadDir = join(process.cwd(), "public", relativeUploadDir);
        const uniqueSuffix = uuidv4();
        const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;

        filePath = `${relativeUploadDir}/${filename}`

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(
                    "Ошибка при попытке создать каталог при загрузке файла\n",
                    e
                );
                return { error: "Что-то пошло не так!" }
            }
        }

        try {
            await writeFile(`${uploadDir}/${filename}`, buffer);
        } catch (e) {
            console.error("Ошибка при попытке загрузить файл\n", e);
            return { error: "Что-то пошло не так!" }
        }
    }

    const dbPlacement = await getPlacementById(placementId);
    const dbType = await getTypeById(typeId);
    const dbFederal = await getFederalById(federalId);
    const dbView = await getViewById(viewId);
    const dbArticle = await getArticleById(articleId);
    const dbDivision = await getDivisionById(divisionId);

    const dbContract = await db.contract.findFirst({
        where: {
            contractNumber,
            startDateOfTheAgreement,
            provider,
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
                provider,
                contractColor,
                theSubjectOfTheAgreement,
                actuallyPaidFor,
                theAmountOfTheContract,
                returnDate,
                theAmountOfCollateral,
                viewId: dbView?.id as string,
                articleId: dbArticle?.id as string,
                divisionId: dbDivision?.id as string,
                sourceOfFinancing,
                additionalInformation,
                MP,
                subcontractorMP,
                transients,
                userId: user?.id as string,
                pdfFile: filePath
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
        divisions
    });
}
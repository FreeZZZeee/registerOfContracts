import { NextResponse } from "next/server";
import { stat, unlink } from 'fs/promises'
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getContractById } from "@/data/contract";
import { getPlacementByName } from "@/data/placement";
import { getTypeByName } from "@/data/type";
import { getFederalByName } from "@/data/federal";
import { getViewByName } from "@/data/view";
import { getArticleByName } from "@/data/article";
import { getDivisionByName } from "@/data/division";

export async function DELETE(req: NextResponse, { params }: { params: { id: string } }) {

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    const dbUser = await getUserById(id as string);

    if (!dbUser) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    const dbContract = await getContractById(params.id);

    if (!dbContract) {
        return NextResponse.json({ message: "Договор уже существует!" }, { status: 409 });
    }
    if (dbContract?.pdfFile !== null) {
        try {
            const stats = await stat(`./public${dbContract?.pdfFile as string}`)


            if (stats.isFile()) {
                unlink(`./public${dbContract?.pdfFile as string}`);
            }
        } catch (e: any) {
            if (e.code === "ENOENT") {
                return NextResponse.json({ message: "Что-то пошло не так!" }, { status: 400 });
            } else {
                console.error(
                    "Ошибка при попытке создать каталог при загрузке файла\n",
                    e
                );
                return NextResponse.json({ message: "Что-то пошло не так!" }, { status: 400 });
            }
        }
    }

    await db.contract.delete({
        where: { id: params.id }
    });

    return NextResponse.json({ message: "Договор удален!" }, { status: 200 });
}

export async function GET({ params }: { params: { id: string } }) {
    try {
        const contract = await db.contract.findUnique({
            where: { id: params.id }
        });

        return NextResponse.json(contract, { status: 200 });
    } catch {
        return NextResponse.json({ status: 400 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const {
        data,
        user,
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
        point,
        subItem,
        federalId,
        contractNumber,
        startDateOfTheAgreement,
        thePostagePeriod,
        endDateOfTheContract,
        provider,
        theSubjectOfTheAgreement,
        theAmountOfTheContract,
        returnDate,
        theAmountOfCollateral,
        viewId,
        articleId,
        divisionId,
        sourceOfFinancing,
        MP,
        micro,
        small,
        average,
        subcontractorMP,
        transients,
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
    const dbContractById = await getContractById(params.id);


    if (!dbContractById) {
        return NextResponse.json({ message: "Договор уже существует!" }, { status: 409 });
    }

    if (dbContractById?.pdfFile !== null) {
        try {
            const stats = await stat(`./public${dbContractById?.pdfFile as string}`)
            if (stats.isFile()) {
                unlink(`./public${dbContractById?.pdfFile as string}`);
            }
        } catch (e: any) {
            if (e.code === "ENOENT") {
                return NextResponse.json({ message: "Что-то пошло не так!" }, { status: 400 });
            } else {
                console.error(
                    "Ошибка при попытке создать каталог при загрузке файла\n",
                    e
                );
                return NextResponse.json({ message: "Что-то пошло не так!" }, { status: 400 });
            }
        }
    }

    await db.contract.update({
        where: {
            id: dbContractById.id
        },
        data: {
            placementId: dbPlacement?.id,
            typeId: dbType?.id,
            federalId: dbFederal?.id,
            point,
            subItem,
            contractNumber,
            startDateOfTheAgreement,
            thePostagePeriod,
            endDateOfTheContract,
            provider,
            contractColor,
            theSubjectOfTheAgreement,
            theAmountOfTheContract,
            returnDate,
            theAmountOfCollateral,
            viewId: dbView?.id,
            articleId: dbArticle?.id,
            divisionId: dbDivision?.id,
            sourceOfFinancing,
            additionalInformation,
            MP,
            micro,
            small,
            average,
            subcontractorMP,
            transients,
            userId: dbContractById?.userId as string,
            pdfFile: pdfFile
        }
    })

    return NextResponse.json({ message: "Договор изменен!" }, { status: 200 });
}
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
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

    let dbProvider = await getProviderByName(data.provider);

    if (!dbProvider) {
        await db.provider.create({
            data: {
                name: data.provider
            }
        })
        dbProvider = await getProviderByName(data.provider);
    }

    const dbContract = await db.contract.findFirst({
        where: {
            contractNumber: data.contractNumber,
            startDateOfTheAgreement: data.startDateOfTheAgreement,
            provider: data.provider,
            division: data.division
        }
    })

    if (dbContract) {
        return NextResponse.json({ message: "Договор уже существует!" }, { status: 409 });
    }

    await db.contract.create({
        data: {
            ...data,
            pdfFile: data.pdfFile,
            user: user.name ? user.name : user.email
        }
    });

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
    const contracts = await db.contract.findMany();

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
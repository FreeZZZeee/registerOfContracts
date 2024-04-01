import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export async function DELETE(req: NextResponse, { params }: { params: { id: string } }) {

    await db.division.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Справочник удалён!" }, { status: 200 });
}

export async function GET(req: NextResponse, { params }: { params: { id: string } }) {
    try {
        const article = await db.division.findUnique({
            where: { id: params.id }
        });

        return NextResponse.json(article, { status: 200 });
    } catch {
        return NextResponse.json({ status: 400 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const {
        name,
        user,
    } = await req.json();

    if (!user) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    await db.division.update({
        where: {
            id: params.id
        },
        data: { name: name }
    });

    return NextResponse.json({ message: "Справочник обновлён!" }, { status: 200 });
}
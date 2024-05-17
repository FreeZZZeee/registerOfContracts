import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export async function DELETE(req: NextResponse, { params }: { params: { id: string } }) {

    await db.paid.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Сумма платежа удалёна!" }, { status: 200 });
}

export async function GET(req: NextResponse, { params }: { params: { id: string } }) {
    try {
        const payment = await db.paid.findUnique({
            where: { id: params.id }
        });

        return NextResponse.json(payment, { status: 200 });
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

    await db.paid.update({
        where: {
            id: params.id
        },
        data: {
            ...data
        }
    });

    return NextResponse.json({ message: "Сумма платежа обновлёна!" }, { status: 200 });
}
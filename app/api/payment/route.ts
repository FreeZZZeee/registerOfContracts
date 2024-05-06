import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

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

    await db.paid.create({
        data: {
            amount: data.amount,
            contractId: data.contractId
        }
    });

    return NextResponse.json({ message: "Справочник создан!" }, { status: 200 });
}

export async function GET() {

    const placement = await db.paid.findMany();

    return NextResponse.json(placement);
}
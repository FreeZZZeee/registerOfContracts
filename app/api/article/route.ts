import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export async function POST(req: Request) {
    const {
        name,
        user
    } = await req.json();

    if (!user) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    await db.article.create({
        data: {
            name
        }
    });

    return NextResponse.json({ status: 200 });
}

export async function GET() {

    const clause = await db.article.findMany();

    return NextResponse.json(clause);
}
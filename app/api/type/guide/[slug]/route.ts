import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse, { params }: { params: { slug: string } }) {
    try {
        const type = await db.type.findUnique({
            where: { name: params.slug }
        });

        return NextResponse.json(type, { status: 200 });
    } catch {
        return NextResponse.json({ status: 400 });
    }
}
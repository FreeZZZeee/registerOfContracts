import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse, { params }: { params: { slug: string } }) {
    try {
        const article = await db.placement.findUnique({
            where: { name: params.slug }
        });

        return NextResponse.json(article, { status: 200 });
    } catch {
        return NextResponse.json({ status: 400 });
    }
}
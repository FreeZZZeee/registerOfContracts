import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse, { params }: { params: { slug: string } }) {
    try {
        const view = await db.view.findUnique({
            where: { name: params.slug }
        });

        return NextResponse.json(view, { status: 200 });
    } catch {
        return NextResponse.json({ status: 400 });
    }
}
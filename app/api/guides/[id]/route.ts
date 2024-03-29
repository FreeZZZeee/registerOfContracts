import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req: NextResponse, { params }: { params: { id: string } }) {

    await db.article.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Справочник удалён!" }, { status: 200 });
}
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse, { params }: { params: { slug: string } }) {
    try {
        // const contract = await db.contract.findUnique({
        //     where: { name: params.slug }
        // });

        // return NextResponse.json(contract, { status: 200 });
    } catch {
        return NextResponse.json({ status: 400 });
    }
}
import { getArticleByName } from "@/data/article";
import { getDivisionByName } from "@/data/division";
import { getFederalByName } from "@/data/federal";
import { getTypeByName } from "@/data/type";
import { getUserById, getUserByName } from "@/data/user";
import { removeNull } from "@/helpers/remove-null";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {
        data,
        user
    } = await req.json();

    if (!user.id) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return NextResponse.json({ message: "Неавторизованный!" }, { status: 401 });
    }

    let searchValues = removeNull(data);

    if (searchValues.user) {
        const findUser = await getUserByName(searchValues.user as string);
        searchValues.user = findUser?.id as string;
    }
    if (searchValues.type) {
        const dbType = await getTypeByName(searchValues.type);
        searchValues.type = dbType?.id as string;
    }
    if (searchValues.federal) {
        const dbFederal = await getFederalByName(searchValues.federal);
        searchValues.federal = dbFederal?.id as string;
    }
    if (searchValues.article) {
        const dbArticle = await getArticleByName(searchValues.article);
        searchValues.article = dbArticle?.id as string;
    }
    if (searchValues.division) {
        const dbDivision = await getDivisionByName(searchValues.division);
        searchValues.division = dbDivision?.id as string;
    }

    const dbContracts = await db.contract.findMany({
        where: {
            ...searchValues
        }
    })

    if (dbContracts === undefined || dbContracts.length == 0) {
        return NextResponse.json({ message: "Договор не найден!" }, { status: 404 });
    }

    return NextResponse.json({
        dbContracts,
        message: "Договор Найден!"
    }, { status: 200 });
}
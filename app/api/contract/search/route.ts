import { getArticleByName } from "@/data/article";
import { getNewContracts } from "@/data/contract";
import { getDivisionByName } from "@/data/division";
import { getFederalByName } from "@/data/federal";
import { getPlacementByName } from "@/data/placement";
import { getTypeByName } from "@/data/type";
import { getUserById, getUserByName } from "@/data/user";
import { getViewByName } from "@/data/view";
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

    if (searchValues.userId) {
        const findUser = await getUserByName(searchValues.userId as string);
        searchValues.userId = findUser?.id as string;
    }
    if (searchValues.placementId) {
        const placement = await getPlacementByName(searchValues.placementId);
        searchValues.placementId = placement?.id as string;
    }
    if (searchValues.typeId) {
        const dbType = await getTypeByName(searchValues.typeId);
        searchValues.typeId = dbType?.id as string;
    }
    if (searchValues.federalId) {
        const dbFederal = await getFederalByName(searchValues.federalId);
        searchValues.federalId = dbFederal?.id as string;
    }
    if (searchValues.viewId) {
        const dbView = await getViewByName(searchValues.viewId);
        searchValues.viewId = dbView?.id as string;
    }
    if (searchValues.articleId) {
        const dbArticle = await getArticleByName(searchValues.articleId);
        searchValues.articleId = dbArticle?.id as string;
    }
    if (searchValues.divisionId) {
        const dbDivision = await getDivisionByName(searchValues.divisionId);
        searchValues.divisionId = dbDivision?.id as string;
    }

    const dbContracts = await db.contract.findMany({
        where: {
            ...searchValues
        }
    })

    if (dbContracts === undefined || dbContracts.length == 0) {
        return NextResponse.json({ message: "Договор не найден!" }, { status: 404 });
    }

    const contracts = await getNewContracts(dbContracts as []);

    return NextResponse.json({
        contracts,
        message: "Договор изменен!"
    }, { status: 200 });
}
import { getUserById } from "@/data/user";
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

    let {
        thePostagePeriodFrom,
        thePostagePeriodIsUpTo,
        theAmountOfTheContractFrom,
        theAmountOfTheContractIsUpTo
    } = searchValues;

    delete searchValues?.thePostagePeriodFrom
    delete searchValues?.thePostagePeriodIsUpTo
    delete searchValues?.theAmountOfTheContractFrom
    delete searchValues?.theAmountOfTheContractIsUpTo

    let dbContracts

    if (thePostagePeriodFrom && !thePostagePeriodIsUpTo) {
        dbContracts = await db.contract.findMany({
            where: {
                ...searchValues,
                thePostagePeriod: {
                    gte: thePostagePeriodFrom
                }
            }
        })
    } else if (thePostagePeriodIsUpTo && !thePostagePeriodFrom) {
        dbContracts = await db.contract.findMany({
            where: {
                ...searchValues,
                thePostagePeriod: {
                    lte: thePostagePeriodIsUpTo
                }
            }
        })
    } else if (thePostagePeriodFrom && thePostagePeriodIsUpTo) {
        console.log(thePostagePeriodFrom);
        console.log(thePostagePeriodIsUpTo);


        dbContracts = await db.contract.findMany({
            where: {
                ...searchValues,
                thePostagePeriod: {
                    gte: thePostagePeriodFrom,
                    lte: thePostagePeriodIsUpTo
                }
            }
        })
    } else if (theAmountOfTheContractFrom && !theAmountOfTheContractIsUpTo) {
        dbContracts = await db.contract.findMany({
            where: {
                ...searchValues,
                theAmountOfTheContract: {
                    gte: theAmountOfTheContractFrom
                }
            }
        })
    } else if (theAmountOfTheContractIsUpTo && !theAmountOfTheContractFrom) {
        dbContracts = await db.contract.findMany({
            where: {
                ...searchValues,
                theAmountOfTheContract: {
                    lte: theAmountOfTheContractIsUpTo
                }
            }
        })
    } else if (theAmountOfTheContractFrom && theAmountOfTheContractIsUpTo) {
        dbContracts = await db.contract.findMany({
            where: {
                ...searchValues,
                thePostagePeriod: {
                    gte: theAmountOfTheContractFrom,
                    lte: theAmountOfTheContractIsUpTo,
                }
            }
        })
    } else if (thePostagePeriodFrom && thePostagePeriodIsUpTo && theAmountOfTheContractFrom && theAmountOfTheContractIsUpTo) {
        dbContracts = await db.contract.findMany({
            where: {
                ...searchValues,
                thePostagePeriod: {
                    gte: thePostagePeriodFrom,
                    lte: thePostagePeriodIsUpTo,
                },
                theAmountOfTheContract: {
                    gte: theAmountOfTheContractFrom,
                    lte: theAmountOfTheContractIsUpTo,
                }
            }
        })
    } else {
        dbContracts = await db.contract.findMany({
            where: {
                ...searchValues,
            }
        })
    }

    if (dbContracts === undefined || dbContracts.length == 0) {
        return NextResponse.json({
            contracts: {},
            message: "Договор не найден!"
        }, { status: 200 });
    }

    return NextResponse.json({
        contracts: dbContracts,
        message: "Договор Найден!"
    }, { status: 200 });
}
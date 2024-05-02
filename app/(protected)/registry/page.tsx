"use server"

import { User } from "@/interfaces/user";
import { AddAContract } from "../_components/addAContract";
import { SheetSearch } from "../_components/sheetSearch";
import { TableOfContracts } from "../_components/tableOfContract";
import { getUsers } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getContractsFromAxios } from "@/data/contract";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const RegestryPage = async () => {
    const user = await currentUser();

    const users = await getUsers() as User[];
    const data = await getContractsFromAxios(user?.id as string);

    return (
        <div className="bg-secondary rounded-xl w-full flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <SheetSearch
                placements={data?.placements as []}
                types={data?.types as []}
                federals={data?.federals as []}
                views={data?.views as []}
                articles={data?.articles as []}
                divisions={data?.divisions as []}
                users={users as []}
            />
            <Button variant="outline" asChild>
                <Link href="/add-contract">Добавить договор</Link>
            </Button>
            {data && (
                <TableOfContracts
                    data={data?.contracts as []}
                    placements={data?.placements as []}
                    types={data?.types as []}
                    federals={data?.federals as []}
                    views={data?.views as []}
                    articles={data?.articles as []}
                    divisions={data?.divisions as []}
                />
            )}
        </div>
    );
}

export default RegestryPage;
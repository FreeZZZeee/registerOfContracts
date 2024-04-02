"use server"

import { User } from "@/interfaces/user";
import { AddAContract } from "../_components/addAContract";
import { SheetSearch } from "../_components/sheetSearch";
import { TableOfContracts } from "../_components/tableOfContract";
import { getUsers } from "@/data/user";
import { currentUser } from "@/lib/auth";
import axios from "axios";



const RegestryPage = async () => {
    const user = await currentUser();

    const users = await getUsers() as User[];
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contract?user=${user?.id}`);
    const {
        contracts,
        placements,
        types,
        federals,
        views,
        articles,
        divisions
    } = res.data;

    return (
        <div className="bg-secondary rounded-xl w-full flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <SheetSearch
                placements={placements as []}
                types={types as []}
                federals={federals as []}
                views={views as []}
                articles={articles as []}
                divisions={divisions as []}
                users={users as []}
            />
            <AddAContract
                placements={placements as []}
                types={types as []}
                federals={federals as []}
                views={views as []}
                articles={articles as []}
                divisions={divisions as []}
            />
            <TableOfContracts
                contracts={contracts as []}
                placements={placements as []}
                types={types as []}
                federals={federals as []}
                views={views as []}
                articles={articles as []}
                divisions={divisions as []}
            />
        </div>
    );
}

export default RegestryPage;
"use client"

import { TiDelete } from "react-icons/ti"
import { EditArticle } from "@/components/article/edit-article"
import { Button } from "@/components//ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { tableRows } from "@/data/tableRows"
import { GeneralTableInterface } from "@/interfaces/generalTable.interface"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { guideDeleteAction } from "@/actions/guide"
import { toast } from "sonner"

export const GeneralTable = ({
    caprion,
    dataDB
}: GeneralTableInterface): JSX.Element => {
    let count = 1;

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onDelete = (id: string) => {
        startTransition(() => {
            guideDeleteAction("article", id)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }

                    if (data.success) {
                        toast.success(data.success);
                        router.refresh()
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    }

    return (
        <Table>
            <TableCaption>${caprion}</TableCaption>
            <TableHeader className="h-[80px]">
                <TableRow>
                    {tableRows.map(tableRow => (
                        <TableHead key={tableRow.name} className={tableRow.className}>
                            {tableRow.name}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {dataDB?.map(data => (
                    <TableRow key={data.id}>
                        <TableCell className="font-medium">{count}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell className="flex flex-row gap-x-1">
                            <EditArticle
                                id={data.id}
                                name={data.name}
                            />
                            <Button
                                onClick={() => onDelete(data.id)}
                                variant="destructive"
                                className="w-[50px]"
                                disabled={isPending}
                            >
                                <TiDelete />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
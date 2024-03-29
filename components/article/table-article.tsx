"use client"

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { TiDelete } from "react-icons/ti";
import { useTransition } from "react";
import { toast } from "sonner";
import { articleDelete } from "@/actions/article";
import { EditArticle } from "./edit-article";
import { useRouter } from "next/navigation";

interface TableOfArticleProps {
    id: string;
    name: string;
    count: number;
}

export const TableArticle = ({
    id,
    name,
    count
}: TableOfArticleProps): JSX.Element => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onDelete = (id: string) => {
        startTransition(() => {
            articleDelete(id)
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
        <TableRow key={id}>
            <TableCell className="font-medium">{count}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell className="flex flex-row gap-x-1">
                <EditArticle
                    id={id}
                    name={name}
                />
                <Button
                    onClick={() => onDelete(id)}
                    variant="destructive"
                    className="w-[50px]"
                    disabled={isPending}
                >
                    <TiDelete />
                </Button>
            </TableCell>
        </TableRow>
    );
}
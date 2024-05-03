"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EditContract } from "./editContracts";
import { Button } from "@/components/ui/button";
import { TiDelete } from "react-icons/ti";
import { contractDelete } from "@/actions/contract";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { InfoContract } from "./infoContract";
import { colors } from "@/data/colors";
import {
    ChevronDownIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { selectParam } from "@/interfaces/guide.interface";
import { contractParam } from "@/interfaces/contract.intarface";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";


interface contractParamArr {
    data: contractParam[]
    placements: selectParam[]
    types: selectParam[]
    federals: selectParam[]
    views: selectParam[]
    articles: selectParam[]
    divisions: selectParam[]
}

export const columns: ColumnDef<contractParam>[] = [
    {
        header: "№",
        cell: ({ row }) => (
            <div className="capitalize">{row.index + 1}</div>
        ),
    },
    {
        accessorKey: "contractNumber",
        header: "Номер договора",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("contractNumber")}</div>
        ),
    },
    {
        accessorKey: "placementId",
        header: "Способ размещения",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("placementId")}</div>
        ),
    },
    {
        accessorKey: "startDateOfTheAgreement",
        header: "Дата договора",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("startDateOfTheAgreement")}</div>
        ),
    },
    {
        accessorKey: "endDateOfTheContract",
        header: "Срок окончания",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("endDateOfTheContract")}</div>
        ),
    },
    {
        accessorKey: "actuallyPaidFor",
        header: "Предмет договора",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("actuallyPaidFor")}</div>
        ),
    },
    {
        accessorKey: "divisionId",
        header: "Подразделение",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("divisionId")}</div>
        ),
    },
    {
        accessorKey: "provider",
        header: "Поставщик",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("provider")}</div>
        ),
    },
    {
        accessorKey: "theAmountOfTheContract",
        header: "Сумма договора",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("theAmountOfTheContract")}</div>
        ),
    },
    {
        accessorKey: "theSubjectOfTheAgreement",
        header: "Фактически оплачено",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("theSubjectOfTheAgreement")}</div>
        ),
    },
    {
        accessorKey: "contractColor",
        header: "Цвет",
        cell: ({ row }) => (
            <div className={`${row.getValue("contractColor")} w-20 h-5`}></div>
        ),
    },
    {
        accessorKey: "userId",
        header: "Исполнитель",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("userId")}</div>
        ),
    },
]


export function TableOfContracts({
    data,
    placements,
    types,
    federals,
    views,
    articles,
    divisions,
}: contractParamArr
) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [searchContract, setSearchContract] = useState<[]>([]);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const onDelete = (id: string) => {
        startTransition(() => {
            contractDelete(id)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }

                    if (data.success) {
                        toast.success(data.success);
                        router.refresh();
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    }

    useEffect(() => {
        setInterval(() => {
            if (typeof window !== 'undefined') {
                let searchContract = JSON.parse(localStorage.getItem('searchContracts') as any);
                if (searchContract) {
                    setSearchContract(searchContract);
                }
            }
        }, 100);
    }, [])

    if (searchContract && searchContract?.length > 0) {
        data = searchContract;
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Номер договора..."
                    value={(table.getColumn("contractNumber")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("contractNumber")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Столбцы <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {JSON.stringify(column.columnDef.header)}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table?.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell className="flex flex-row gap-x-1 !text-black">
                                        <InfoContract
                                            placementId={row.original.placementId}
                                            contractNumber={row.original.contractNumber}
                                            point={row.original.point}
                                            subItem={row.original.subItem}
                                            startDateOfTheAgreement={row.original.startDateOfTheAgreement}
                                            thePostagePeriod={row.original.thePostagePeriod}
                                            endDateOfTheContract={row.original.endDateOfTheContract}
                                            provider={row.original.provider}
                                            federalId={row.original.federalId}
                                            typeId={row.original.typeId}
                                            theSubjectOfTheAgreement={row.original.theSubjectOfTheAgreement}
                                            actuallyPaidFor={row.original.actuallyPaidFor}
                                            theAmountOfTheContract={row.original.theAmountOfCollateral}
                                            divisionId={row.original.divisionId}
                                            returnDate={row.original.returnDate}
                                            theAmountOfCollateral={row.original.theAmountOfCollateral}
                                            viewId={row.original.viewId}
                                            articleId={row.original.articleId}
                                            sourceOfFinancing={row.original.sourceOfFinancing}
                                            MP={row.original.MP}
                                            micro={row.original.micro}
                                            small={row.original.small}
                                            average={row.original.average}
                                            subcontractorMP={row.original.subcontractorMP}
                                            transients={row.original.transients}
                                            additionalInformation={row.original.additionalInformation}
                                            pdfFile={row.original.pdfFile} />
                                        <Button variant="outline" className="w-[50px] p-2" asChild>
                                            <Link href={`/edit-contract?id=${row.original.id}`}>
                                                <FaRegEdit className="!w-full !h-full" />
                                            </Link>
                                        </Button>
                                        {/* <EditContract
                                            id={row.original.id}
                                            placementId={row.original.placementId}
                                            contractNumber={row.original.contractNumber}
                                            point={row.original.point}
                                            subItem={row.original.subItem}
                                            startDateOfTheAgreement={row.original.startDateOfTheAgreement}
                                            thePostagePeriod={row.original.thePostagePeriod}
                                            endDateOfTheContract={row.original.endDateOfTheContract}
                                            provider={row.original.provider}
                                            federalId={row.original.federalId}
                                            typeId={row.original.typeId}
                                            theSubjectOfTheAgreement={row.original.theSubjectOfTheAgreement}
                                            theAmountOfTheContract={row.original.theAmountOfCollateral}
                                            divisionId={row.original.divisionId}
                                            contractColor={row.original.contractColor}
                                            returnDate={row.original.returnDate}
                                            theAmountOfCollateral={row.original.theAmountOfCollateral}
                                            viewId={row.original.viewId}
                                            articleId={row.original.articleId}
                                            sourceOfFinancing={row.original.sourceOfFinancing}
                                            MP={row.original.MP}
                                            micro={row.original.micro}
                                            small={row.original.small}
                                            average={row.original.average}
                                            subcontractorMP={row.original.subcontractorMP}
                                            transients={row.original.transients}
                                            additionalInformation={row.original.additionalInformation}
                                            pdfFile={row.original.pdfFile}
                                            placements={placements as []}
                                            types={types as []}
                                            federals={federals as []}
                                            views={views as []}
                                            articles={articles as []}
                                            divisions={divisions as []}
                                            colors={colors as []}
                                        /> */}
                                        <Button
                                            onClick={() => onDelete(row.original.id)}
                                            variant="destructive"
                                            className="w-[50px] p-2"
                                            disabled={isPending}
                                        >
                                            <TiDelete className="!w-full !h-full" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Никаких результатов.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Назад
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Вперёд
                    </Button>
                </div>
            </div>
        </div>
    )
}

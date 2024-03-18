import { AddAType } from "@/components/type/add-a-type";
import { TableType } from "@/components/type/table-type";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTypes } from "@/data/type";

const tableRows = [
    { name: "№", className: "w-[50px]" },
    { name: "Наименование", className: "" },
    { name: "", className: "w-[100px]" },
]

const TypePage = async () => {
    const types = await getTypes();
    let count = 1;

    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <AddAType />
            <Table>
                <TableCaption>Тип ЕП</TableCaption>
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
                    {types?.map(type => (
                        <TableType
                            key={type.id}
                            id={type.id}
                            name={type.name}
                            count={count++}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TypePage;
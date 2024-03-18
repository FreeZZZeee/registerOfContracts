import { AddAFederal } from "@/components/federal/add-a-federal";
import { TableFederal } from "@/components/federal/table-federal";
import { AddAType } from "@/components/type/add-a-type";
import { TableType } from "@/components/type/table-type";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getFederals } from "@/data/federal";

const tableRows = [
    { name: "№", className: "w-[50px]" },
    { name: "Наименование", className: "" },
    { name: "", className: "w-[100px]" },
]

const FederalPage = async () => {
    const federals = await getFederals();
    let count = 1;

    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <AddAFederal />
            <Table>
                <TableCaption>Федеральный закон</TableCaption>
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
                    {federals?.map(federal => (
                        <TableFederal
                            key={federal.id}
                            id={federal.id}
                            name={federal.name}
                            count={count++}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default FederalPage;
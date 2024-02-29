import { AddAContract } from "@/components/add-a-contract";
import { SheetSearch } from "@/components/sheet-search";
import { TableOfContracts } from "@/components/table-of-contracts"
import { Table, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tableRows = [
    { name: "№" },
    { name: "Номер договора" },
    { name: "Способ размещения" },
    { name: "Дата договора" },
    { name: "Срок окончания" },
    { name: "Предмет договора" },
    { name: "Подразделение" },
    { name: "Поставщик, подрядчик, исполнитель" },
    { name: "Сумма договора" },
    { name: "Фактически оплачено" },
    { name: "Исполнитель" },
    { name: "Цвет" },
    { name: "" },
]

const RegestryPage = () => {    
    return (
        <div className="bg-secondary rounded-xl w-full flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">            
            <SheetSearch />
            <AddAContract />  
            <Table>
                <TableCaption>Реестр договоров</TableCaption>
                <TableHeader className="h-[80px]">
                    <TableRow>
                        {tableRows.map(tableRow => (
                            <TableHead className="w-[80px]">
                                {tableRow.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableOfContracts />
            </Table>
        </div>
    );
}

export default RegestryPage;
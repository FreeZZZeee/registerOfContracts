import { AddAContract } from "@/components/contract/add-a-contract";
import { SheetSearch } from "@/components/sheet-search";
import { TableOfContracts } from "@/components/contract/table-of-contracts"
import { Table, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPlacements } from "@/data/placement";

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


const valuesParam = [
    {name: "placement", label: "Способ размещения", type: "text"},
    {name: "type", label: "Тип ЕП", type: "select"},
    {name: "federal", label: "Федеральный закон", type: "select"},
    {name: "contractNumber", label: "Номер контракта", type: "text"},
    {name: "startDateOfTheAgreement", label: "Дата начала действия договора", type: "date"},
    {name: "endDateOfTheContract", label: "Дата окончания договора", type: "date"},
    {name: "provider", label: "Дата окончания договора", type: "text"},
    {name: "color", label: "Цвет", type: "select"},
    {name: "theSubjectOfTheAgreement", label: "Передмет договора", type: "text"},
    {name: "actuallyPaidFor", label: "Фактически оплачено", type: "text"},
    {name: "theAmountOfTheContract", label: "Сумма договора", type: "text"},
    {name: "returnDate", label: "Дата возврата", type: "date"},
    {name: "theAmountOfCollateral", label: "Сумма обеспечения", type: "text"},
    {name: "classifierSection", label: "Раздел классификатора", type: "text"},
    {name: "classifierSection2014", label: "Раздел классификатора 2014", type: "text"},
    {name: "view", label: "Вид закупки", type: "select"},
    {name: "article", label: "Статья расходов", type: "select"},
    {name: "division", label: "Подразделение", type: "select"},
    {name: "sourceOfFinancing", label: "Источники финансирования", type: "text"},
    {name: "additionalInformation", label: "Дополнительная информация", type: "textArea"},
    {name: "MP", label: "МП", type: "bool"},
    {name: "subcontractorMP", label: "Субподрядчик МП", type: "bool"},
    {name: "transients", label: "Переходящие", type: "bool"},
  ]

const RegestryPage = async () => {    

    const placements = await getPlacements();

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
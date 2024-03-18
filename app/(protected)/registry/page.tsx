"use server"

import { AddAContract } from "@/components/contract/add-a-contract";
import { SheetSearch } from "@/components/contract/sheet-search";
import { TableOfContracts } from "@/components/contract/table-of-contracts"
import { Table, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPlacements } from "@/data/placement";
import { getTypes } from "@/data/type";
import { getFederals } from "@/data/federal";
import { getViews } from "@/data/view";
import { getArticles } from "@/data/article";
import { getDivisions } from "@/data/division";
import { getContracts, getNewContracts } from "@/data/contract";
import { getUsers } from "@/data/user";


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
    { name: "placementId", label: "Способ размещения", type: "select" },
    { name: "typeId", label: "Тип ЕП", type: "select" },
    { name: "federalId", label: "Федеральный закон", type: "select" },
    { name: "contractNumber", label: "Номер контракта", type: "text" },
    { name: "startDateOfTheAgreement", label: "Дата начала действия договора", type: "date" },
    { name: "endDateOfTheContract", label: "Дата окончания договора", type: "date" },
    { name: "provider", label: "Поставщик, подрядчик, исполнитель", type: "text" },
    { name: "theSubjectOfTheAgreement", label: "Передмет договора", type: "text" },
    { name: "actuallyPaidFor", label: "Фактически оплачено", type: "text" },
    { name: "theAmountOfTheContract", label: "Сумма договора", type: "text" },
    { name: "returnDate", label: "Дата возврата", type: "date" },
    { name: "theAmountOfCollateral", label: "Сумма обеспечения", type: "text" },
    { name: "viewId", label: "Вид закупки", type: "select" },
    { name: "articleId", label: "Статья расходов", type: "select" },
    { name: "divisionId", label: "Подразделение", type: "select" },
    { name: "sourceOfFinancing", label: "Источники финансирования", type: "text" },
    { name: "additionalInformation", label: "Дополнительная информация", type: "textArea" },
    { name: "MP", label: "МП", type: "bool" },
    { name: "subcontractorMP", label: "Субподрядчик МП", type: "bool" },
    { name: "transients", label: "Переходящие", type: "bool" },
    { name: "pdfFile", label: "Документ", type: "file" },
    { name: "contractColor", label: "Цвет", type: "select" },
]

const colors = [
    { color: "bg-yellow-950" },
    { color: "bg-red-600" },
    { color: "bg-orange-700" },
    { color: "bg-yellow-600" },
    { color: "bg-amber-500" },
    { color: "bg-lime-400" },
    { color: "bg-blue-700" },
    { color: "bg-lime-800" },
    { color: "bg-indigo-300" },
    { color: "bg-indigo-600" },
    { color: "bg-blue-400" },
    { color: "bg-cyan-500" },
    { color: "bg-blue-800" },
    { color: "bg-blue-900" },
    { color: "bg-fuchsia-700" },
]

interface ContractParam {
    id: string,
    placementId: string,
    typeId: string,
    federalId: string,
    contractNumber: string,
    startDateOfTheAgreement: string,
    endDateOfTheContract: string,
    provider: string,
    theSubjectOfTheAgreement: string,
    actuallyPaidFor: string,
    theAmountOfTheContract: string,
    returnDate: string,
    theAmountOfCollateral: string,
    viewId: string,
    articleId: string,
    divisionId: string,
    sourceOfFinancing: string,
    MP: boolean,
    subcontractorMP: boolean,
    transients: boolean,
    additionalInformation: string,
    contractColor: string
    userId: string
    pdfFile: string
}

interface User {
    name: string
}

interface References {
    id: string;
    name: string;
}

const RegestryPage = async () => {

    const users = await getUsers() as User[];
    const placements = await getPlacements() as References[];
    const types = await getTypes() as References[];
    const federals = await getFederals() as References[];
    const views = await getViews() as References[];
    const articles = await getArticles() as References[];
    const divisions = await getDivisions() as References[];
    const contracts = await getContracts() as ContractParam[];

    const newContracts = await getNewContracts(contracts);

    return (
        <div className="bg-secondary rounded-xl w-full flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <SheetSearch
                valuesParam={valuesParam}
                placements={placements as []}
                types={types as []}
                federals={federals as []}
                views={views as []}
                articles={articles as []}
                divisions={divisions as []}
                colors={colors}
                users={users as []}
            />
            <AddAContract
                valuesParam={valuesParam}
                placements={placements as []}
                types={types as []}
                federals={federals as []}
                views={views as []}
                articles={articles as []}
                divisions={divisions as []}
                colors={colors}
            />
            <Table>
                <TableCaption>Реестр договоров</TableCaption>
                <TableHeader className="h-[80px]">
                    <TableRow>
                        {tableRows.map(tableRow => (
                            <TableHead key={tableRow.name} className="w-[80px]">
                                {tableRow.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableOfContracts
                    contracts={newContracts as []}
                    valuesParam={valuesParam as []}
                    placements={placements as []}
                    types={types as []}
                    federals={federals as []}
                    views={views as []}
                    articles={articles as []}
                    divisions={divisions as []}
                    colors={colors as []}
                />
            </Table>
        </div>
    );
}

export default RegestryPage;
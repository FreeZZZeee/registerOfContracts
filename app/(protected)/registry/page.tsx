"use server"

import { AddAContract } from "@/components/contract/add-a-contract";
import { SheetSearch } from "@/components/contract/sheet-search";
import { TableOfContracts } from "@/components/contract/table-of-contracts"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPlacementById, getPlacements } from "@/data/placement";
import { getTypeById, getTypes } from "@/data/type";
import { getFederalById, getFederals } from "@/data/federal";
import { getViewById, getViews } from "@/data/view";
import { getArticleById, getArticles } from "@/data/article";
import { getDivisionById, getDivisions } from "@/data/division";
import { getContracts } from "@/data/contract";
import { getUserById } from "@/data/user";


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
    { name: "placement", label: "Способ размещения", type: "select" },
    { name: "type", label: "Тип ЕП", type: "select" },
    { name: "federal", label: "Федеральный закон", type: "select" },
    { name: "contractNumber", label: "Номер контракта", type: "text" },
    { name: "startDateOfTheAgreement", label: "Дата начала действия договора", type: "date" },
    { name: "endDateOfTheContract", label: "Дата окончания договора", type: "date" },
    { name: "provider", label: "Поставщик, подрядчик, исполнитель", type: "text" },
    { name: "theSubjectOfTheAgreement", label: "Передмет договора", type: "text" },
    { name: "actuallyPaidFor", label: "Фактически оплачено", type: "text" },
    { name: "theAmountOfTheContract", label: "Сумма договора", type: "text" },
    { name: "returnDate", label: "Дата возврата", type: "date" },
    { name: "theAmountOfCollateral", label: "Сумма обеспечения", type: "text" },
    { name: "view", label: "Вид закупки", type: "select" },
    { name: "article", label: "Статья расходов", type: "select" },
    { name: "division", label: "Подразделение", type: "select" },
    { name: "sourceOfFinancing", label: "Источники финансирования", type: "text" },
    { name: "additionalInformation", label: "Дополнительная информация", type: "textArea" },
    { name: "MP", label: "МП", type: "bool" },
    { name: "subcontractorMP", label: "Субподрядчик МП", type: "bool" },
    { name: "transients", label: "Переходящие", type: "bool" },
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
}

interface References {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
}

const RegestryPage = async () => {

    let count: number = 1;

    const placements = await getPlacements() as References[];
    const types = await getTypes() as References[];
    const federals = await getFederals() as References[];
    const views = await getViews() as References[];
    const articles = await getArticles() as References[];
    const divisions = await getDivisions() as References[];
    const contracts = await getContracts() as ContractParam[];

    const newContrats: ContractParam[] = await Promise.all(contracts?.map(async (contract) => {
        const placement = await getPlacementById(contract.placementId as string);
        const division = await getDivisionById(contract.divisionId as string);
        const executor = await getUserById(contract.userId as string);
        const view = await getViewById(contract.viewId as string);
        const article = await getArticleById(contract.articleId as string);
        const federal = await getFederalById(contract.federalId as string);
        const type = await getTypeById(contract.typeId as string);

        return {
            ...contract,
            placementId: placement?.name as string,
            divisionId: division?.name as string,
            userId: executor?.name as string,
            viewId: view?.name as string,
            articleId: article?.name as string,
            federalId: federal?.name as string,
            typeId: type?.name as string
        }
    }))

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
                            <TableHead className="w-[80px]">
                                {tableRow.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {newContrats?.map((contract) => {
                        return (
                            <TableOfContracts
                                key={contract.id}
                                id={contract.id as string}
                                count={count++}
                                placementName={contract.placementId as string}
                                contractNumber={contract.contractNumber as string}
                                startDateOfTheAgreement={contract.startDateOfTheAgreement as string}
                                endDateOfTheContract={contract.endDateOfTheContract as string}
                                provider={contract.provider as string}
                                federal={contract.federalId as string}
                                type={contract.typeId as string}
                                theSubjectOfTheAgreement={contract.theSubjectOfTheAgreement as string}
                                actuallyPaidFor={contract.actuallyPaidFor as string}
                                theAmountOfTheContract={contract.theAmountOfCollateral as string}
                                executor={contract.userId as string}
                                divisionName={contract.divisionId as string}
                                color={contract.contractColor as string}
                                returnDate={contract.returnDate as string}
                                theAmountOfCollateral={contract.theAmountOfCollateral as string}
                                view={contract.viewId as string}
                                article={contract.articleId as string}
                                sourceOfFinancing={contract.sourceOfFinancing as string}
                                MP={contract.MP as boolean}
                                subcontractorMP={contract.subcontractorMP as boolean}
                                transients={contract.transients as boolean}
                                additionalInformation={contract.additionalInformation as string}
                                valuesParam={valuesParam as []}
                                placements={placements as []}
                                types={types as []}
                                federals={federals as []}
                                views={views as []}
                                articles={articles as []}
                                divisions={divisions as []}
                                colors={colors as []}
                            />
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default RegestryPage;
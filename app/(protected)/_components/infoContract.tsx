"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { FcInfo } from "react-icons/fc";
import { ScrollArea } from "../../../components/ui/scroll-area";
import Link from "next/link";

type valuesParamPropsArr = {
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
    pdfFile: string
}


export const InfoContract = ({
    placementId,
    typeId,
    federalId,
    contractNumber,
    startDateOfTheAgreement,
    endDateOfTheContract,
    provider,
    theSubjectOfTheAgreement,
    actuallyPaidFor,
    theAmountOfTheContract,
    returnDate,
    theAmountOfCollateral,
    viewId,
    articleId,
    divisionId,
    sourceOfFinancing,
    MP,
    subcontractorMP,
    transients,
    additionalInformation,
    contractColor,
    pdfFile
}: valuesParamPropsArr) => {
    const contractParams = [
        { name: "Способ размещения", label: placementId },
        { name: "Тип ЕП", label: typeId },
        { name: "Федеральный закон", label: federalId },
        { name: "Дата начала действия договора", label: startDateOfTheAgreement },
        { name: "Дата окончания договора", label: endDateOfTheContract },
        { name: "Поставщик, подрядчик, исполнитель", label: provider },
        { name: "Передмет договора", label: theSubjectOfTheAgreement },
        { name: "Фактически оплачено", label: actuallyPaidFor },
        { name: "Сумма договора", label: theAmountOfTheContract },
        { name: "Дата возврата", label: returnDate },
        { name: "Сумма обеспечения", label: theAmountOfCollateral },
        { name: "Вид закупки", label: viewId },
        { name: "Статья расходов", label: articleId },
        { name: "Подразделение", label: divisionId },
        { name: "Источники финансирования", label: sourceOfFinancing },
        { name: "Дополнительная информация", label: additionalInformation },
        { name: "МП", label: MP ? "Да" : "Нет" },
        { name: "Субподрядчик МП", label: subcontractorMP ? "Да" : "Нет" },
        { name: "Переходящие", label: transients ? "Да" : "Нет" },
        { name: "Документ", label: pdfFile ? "Скачать" : "Файл не загружен", link: pdfFile ? pdfFile : "#" },
    ]
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-[50px] p-2"><FcInfo className="!w-full !h-full" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Договор №{contractNumber}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[700px] w-full rounded-md border p-4">
                    {contractParams.map((contractParam) => (
                        <div key={contractParam.name} className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden m-1">
                            <div className="p-2">
                                <div className="tracking-wide text-lg text-black font-semibold">{contractParam.name}:</div>

                                {contractParam.link ? (
                                    <Link target="_blank" href={contractParam.link}>{contractParam.label}</Link>
                                ) : (
                                    <p className="mt-2 text-gray-500">{contractParam.label}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="default"
                            onClick={() => { }}
                            type="button"
                        >
                            Закрыть
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
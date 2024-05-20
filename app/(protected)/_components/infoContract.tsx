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
import { valuesParamPropsArr } from "@/interfaces/infoContract.interface";



export const InfoContract = ({
    placement,
    type,
    point,
    subItem,
    federal,
    contractNumber,
    startDateOfTheAgreement,
    thePostagePeriod,
    endDateOfTheContract,
    provider,
    theSubjectOfTheAgreement,
    actuallyPaidFor,
    theAmountOfTheContract,
    returnDate,
    theAmountOfCollateral,
    view,
    article,
    division,
    sourceOfFinancing,
    MP,
    micro,
    small,
    average,
    subcontractorMP,
    transients,
    additionalInformation,
    pdfFile
}: valuesParamPropsArr) => {
    const contractParams = [
        { name: "Способ размещения", label: placement },
        { name: "Тип ЕП", label: type },
        { name: "П.", label: point },
        { name: "ПП.", label: subItem },
        { name: "Федеральный закон", label: federal },
        { name: "Дата начала действия договора", label: startDateOfTheAgreement },
        { name: "Срок поставки", label: thePostagePeriod },
        { name: "Дата окончания договора", label: endDateOfTheContract },
        { name: "Поставщик, подрядчик, исполнитель", label: provider },
        { name: "Передмет договора", label: theSubjectOfTheAgreement },
        { name: "Фактически оплачено", label: actuallyPaidFor },
        {
            name: "Сумма договора", label: new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" })
                .format(Number(theAmountOfTheContract.replace(/,/g, ".")))
        },
        { name: "Дата возврата", label: returnDate },
        {
            name: "Сумма обеспечения", label: new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" })
                .format(Number(theAmountOfCollateral.replace(/,/g, ".")))
        },
        { name: "Вид закупки", label: view },
        { name: "Статья расходов", label: article },
        { name: "Подразделение", label: division },
        { name: "Источники финансирования", label: sourceOfFinancing },
        { name: "Дополнительная информация", label: additionalInformation },
        { name: "МП", label: MP ? "Да" : "Нет" },
        { name: "Микро", label: micro ? "Да" : "Нет" },
        { name: "Малое", label: small ? "Да" : "Нет" },
        { name: "Среднее", label: average ? "Да" : "Нет" },
        { name: "Субподрядчик МП", label: subcontractorMP ? "Да" : "Нет" },
        { name: "Переходящие", label: transients ? "Да" : "Нет" },
        { name: "Документ", label: pdfFile ? "Скачать" : "Файл не загружен", link: pdfFile ? pdfFile : "#" },
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-[50px] p-2"><FcInfo className="!w-full !h-full" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Договор №{contractNumber}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[700px] w-full rounded-md border p-4">
                    {contractParams.map((contractParam) => (
                        <div key={contractParam.name} className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p className="text-gray-600">
                                {contractParam.name}
                            </p>

                            {contractParam.link && contractParam.link !== '#' ? (
                                <div className="space-y-2">
                                    <div className="border-2 flex items-center p-2 rounded justify-between space-x-2">
                                        <div className="space-x-2 truncate">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current inline text-gray-500" width="24" height="24" viewBox="0 0 24 24"><path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z" /></svg>
                                            <span>
                                                {contractParam.link.split("/").pop()}
                                            </span>
                                        </div>
                                        <Link href={contractParam.link} className="text-blue-700 hover:underline">
                                            Скачать
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <p>
                                    {contractParam.label}
                                </p>
                            )}
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
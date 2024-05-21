"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { ChangeEvent, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Textarea } from "../../../components/ui/textarea";
import { Switch } from "../../../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { ContractSchema } from "@/schemas/contract.schema";
import { contractUpdate } from "@/actions/contract";
import { FaRegFilePdf } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import Link from "next/link";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { formParams } from "@/data/form-params"
import { valuesParamPropsArr } from "@/interfaces/formContractEdit.interface";
import { EditContractPayment } from "./editContractPayment";
import { AutocompleteInput } from "@/components/autocompleteInput";
import { AddAContractPayment } from "./addAContractPayment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TiDelete } from "react-icons/ti";
import { payDeleteAction } from "@/actions/payment";

const colors = [
    { color: "bg-secondary" },
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


export const EditContract = ({
    id,
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
    theAmountOfTheContract,
    returnDate,
    theAmountOfCollateral,
    view,
    article,
    division,
    sourceOfFinancing,
    micro,
    small,
    average,
    subcontractorMP,
    transients,
    additionalInformation,
    contractColor,
    pdfFile,
    placements,
    types,
    federals,
    views,
    articles,
    divisions,
    providers,
    payment
}: valuesParamPropsArr) => {
    const [color, setColor] = useState<string>(contractColor);
    const [isPending, startTransition] = useTransition();
    const [pdf, setPdf] = useState<string>(pdfFile as string);

    const router = useRouter();


    const form = useForm<z.infer<typeof ContractSchema>>({
        resolver: zodResolver(ContractSchema),
        defaultValues: {
            placement: placement || undefined,
            type: type || undefined,
            point: point || undefined,
            subItem: subItem || undefined,
            federal: federal || undefined,
            contractNumber: contractNumber || undefined,
            startDateOfTheAgreement: startDateOfTheAgreement || undefined,
            thePostagePeriod: thePostagePeriod || undefined,
            endDateOfTheContract: endDateOfTheContract || undefined,
            provider: provider || undefined,
            theSubjectOfTheAgreement: theSubjectOfTheAgreement || undefined,
            theAmountOfTheContract: theAmountOfTheContract || undefined,
            returnDate: returnDate || undefined,
            theAmountOfCollateral: theAmountOfCollateral || undefined,
            view: view || undefined,
            article: article || undefined,
            division: division || undefined,
            sourceOfFinancing: sourceOfFinancing || undefined,
            micro: micro || undefined,
            small: small || undefined,
            average: average || undefined,
            subcontractorMP: subcontractorMP || undefined,
            transients: transients || undefined,
            additionalInformation: additionalInformation || undefined,
            contractColor: contractColor || undefined
        }
    });

    const onSubmit = (values: z.infer<typeof ContractSchema>) => {
        values.contractColor = color ? color : "";

        let formData: FormData;
        if (values?.pdfFile !== undefined) {
            formData = new FormData();
            formData.append('pdfFile', values.pdfFile as File);
            values.pdfFile = {} as File;
        }

        startTransition(() => {
            contractUpdate(values, id, formData)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }

                    if (data.success) {
                        toast.success(data.success);
                        router.push('/registry');
                        router.refresh();
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    }

    const deletePreview = () => {
        setPdf('');
    }

    let total = 0;

    const onDelete = (id: string) => {
        startTransition(() => {
            payDeleteAction(id)
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

    return (
        <Form {...form}>
            <form
                className="grid gap-4 py-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col flex-wrap gap-2">
                    {formParams.map((formParam, idx) => (
                        <div className="w-auto" key={idx}>

                            {formParam.type === "text"
                                && formParam.name !== "provider"
                                && formParam.name !== "actuallyPaidFor"
                                && formParam.name !== "division" && (
                                    <FormField
                                        control={form.control}
                                        name={formParam.name as any}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{formParam.label}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder={formParam.label}
                                                        disabled={isPending}
                                                        type={formParam.type}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                            {formParam.type === "text" && formParam.name === "actuallyPaidFor" && (
                                <>
                                    <FormLabel className="block my-3">{formParam.label}</FormLabel>
                                    <AddAContractPayment
                                        idContract={id}
                                        providers={divisions}
                                    />
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Сумма платежа</TableHead>
                                                <TableHead>Дата Регистрации платежа</TableHead>
                                                <TableHead>Подразделение</TableHead>
                                                <TableHead>№ платежного поручения</TableHead>
                                                <TableHead></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {payment && payment.map((paid, idx) => {
                                                total += Number(paid.amount.replace(/,/g, "."));
                                                return (
                                                    <TableRow key={idx} className="my-2">
                                                        <TableCell>
                                                            {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(Number(paid.amount.replace(/,/g, ".")))}
                                                        </TableCell>
                                                        <TableCell>{paid.paymentRegistrationDate.toISOString().slice(0, 10)}</TableCell>
                                                        <TableCell>{paid.division}</TableCell>
                                                        <TableCell>{paid.paymentOrderNumber}</TableCell>
                                                        <TableCell className="flex justify-end gap-2">
                                                            <EditContractPayment
                                                                providers={divisions as []}
                                                                valueProvider={paid.division}
                                                                payment={paid}
                                                            />
                                                            <Button
                                                                onClick={() => onDelete(paid.id)}
                                                                variant="destructive"
                                                                className="w-[50px] p-2"
                                                                disabled={isPending}
                                                            >
                                                                <TiDelete className="!w-full !h-full" />
                                                            </Button>
                                                        </TableCell>

                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                    <div className="flex justify-end">
                                        <span className="font-bold">Итого:&nbsp;</span><span>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(total)}</span>
                                    </div>
                                </>
                            )}

                            {formParam.type === "text"
                                && formParam.name === "division"
                                && (
                                    <AutocompleteInput
                                        control={form.control}
                                        nameProvider={formParam.name}
                                        label={formParam.label}
                                        type={formParam.type}
                                        isPending={isPending}
                                        providers={divisions as []}
                                        setValue={form.setValue}
                                        valueProvider={division}
                                    />
                                )}

                            {formParam.type === "text"
                                && formParam.name === "provider"
                                && (
                                    <AutocompleteInput
                                        control={form.control}
                                        nameProvider={formParam.name}
                                        label={formParam.label}
                                        type={formParam.type}
                                        isPending={isPending}
                                        providers={providers as []}
                                        setValue={form.setValue}
                                        valueProvider={provider}
                                    />
                                )}


                            {formParam.type === "date" && (
                                <FormField
                                    control={form.control}
                                    name={formParam.name as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{formParam.label}</FormLabel>
                                            <FormControl className="w-[200px]">
                                                <Input
                                                    {...field}
                                                    placeholder={formParam.label}
                                                    disabled={isPending}
                                                    type={formParam.type}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {formParam.type === "select" && (
                                <FormField
                                    control={form.control}
                                    name={formParam.name as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{formParam.label}</FormLabel>
                                            {formParam.name === "placement" && (
                                                <Select
                                                    disabled={isPending}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="!bg-white">
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder={formParam.label}
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {placements.map((placement, idx) => (
                                                            <SelectItem value={placement.name} key={idx}>
                                                                {placement.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            {formParam.name === "type" && (
                                                <Select
                                                    disabled={isPending}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="!bg-white">
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder={formParam.label}
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {types.map(type => (
                                                            <SelectItem value={type.name} key={type.name}>
                                                                {type.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            {formParam.name === "federal" && (
                                                <Select
                                                    disabled={isPending}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="!bg-white">
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder={formParam.label}
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {federals.map(federal => (
                                                            <SelectItem value={federal.name} key={federal.name}>
                                                                {federal.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            {formParam.name === "contractColor" && (
                                                <Select
                                                    disabled={isPending}
                                                    onValueChange={(value) => setColor(value)}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className={`${color} w-[250px]`}>
                                                            <SelectValue
                                                                placeholder="Выбрать цвет"
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {colors.map(color => (
                                                            <SelectItem
                                                                value={color.color}
                                                                key={color.color}
                                                                className={`${color.color} h-9 my-1 focus:opacity-50 focus:${color.color}`}>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            {formParam.name === "view" && (
                                                <Select
                                                    disabled={isPending}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="!bg-white">
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder={formParam.label}
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {views.map(view => (
                                                            <SelectItem value={view.name} key={view.name}>
                                                                {view.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            {formParam.name === "article" && (
                                                <Select
                                                    disabled={isPending}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="!bg-white">
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder={formParam.label}
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {articles.map(article => (
                                                            <SelectItem value={article.name} key={article.name}>
                                                                {article.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            {formParam.name === "division" && (
                                                <Select
                                                    disabled={isPending}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="!bg-white">
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder={formParam.label}
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {divisions.map(division => (
                                                            <SelectItem value={division.name} key={division.name}>
                                                                {division.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {formParam.type === "headingBool" && (
                                <FormField
                                    control={form.control}
                                    name={formParam.name as any}
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>{formParam.label}</FormLabel>
                                        </FormItem>
                                    )}
                                />

                            )}

                            {formParam.type === "bool" && (
                                <FormField
                                    control={form.control}
                                    name={formParam.name as any}
                                    render={({ field }) => (
                                        <FormItem className="inline-flex flex-row items-center justify-between
                                    rounded-lg border p-3 shadow-sm gap-x-4">
                                            <div className="space-y-0.5">
                                                <FormLabel>{formParam.label}</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    className="!m-0"
                                                    disabled={isPending}
                                                    onCheckedChange={field.onChange}
                                                    checked={field.value}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}

                            {formParam.type === "textArea" && (
                                <FormField
                                    control={form.control}
                                    name={formParam.name as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{formParam.label}</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Дополнительная информация" id="message-2"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            {formParam.type === "file" && (
                                <FormField
                                    control={form.control}
                                    name={formParam.name as any}
                                    render={({ field: { value, onChange, ...field } }) => (
                                        <div className="max-w-xl">
                                            {pdf ? (
                                                <>
                                                    <div className="flex justify-start gap-y-4 items-center">
                                                        <FaRegFilePdf className="w-[100px] h-[100px]" />
                                                        <Link
                                                            href="#"
                                                            onClick={() => deletePreview()}><RiDeleteBin2Fill className="w-[30px] h-[30px] text-red-500 text-center" /></Link>
                                                    </div>
                                                </>
                                            ) : (
                                                <label
                                                    className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                                    <span className="flex items-center space-x-2">
                                                        <IoCloudUploadOutline />
                                                        <span className="font-medium text-gray-600">
                                                            Перетащите файл для прикрепления или &nbsp;
                                                            <span className="text-blue-600 underline">нажамите</span>
                                                        </span>
                                                    </span>
                                                    <Input
                                                        {...field}
                                                        value={value?.fileName}
                                                        placeholder={formParam.label}
                                                        disabled={isPending}
                                                        type={formParam.type}
                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {

                                                            const sellectFile = event.target.files ? event.target.files[0] : null;
                                                            setPdf(sellectFile?.name as string)
                                                            onChange(sellectFile as File | null);
                                                        }}
                                                        className="hidden"
                                                    />
                                                </label>
                                            )}

                                        </div>
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    disabled={isPending}
                    type="submit">
                    Сохранить
                </Button>
            </form>
        </Form>
    );
}
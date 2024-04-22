"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { ScrollArea } from "../../../components/ui/scroll-area";
import { ContractSchema } from "@/schemas/contract.schema";
import { contractUpdate } from "@/actions/contract";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import Link from "next/link";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { formParams } from "@/data/form-params"
import { valuesParamPropsArr } from "@/interfaces/formContract.interface";

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


export const EditContract = ({
    id,
    placementId,
    typeId,
    point,
    subItem,
    federalId,
    contractNumber,
    startDateOfTheAgreement,
    thePostagePeriod,
    endDateOfTheContract,
    provider,
    theSubjectOfTheAgreement,
    theAmountOfTheContract,
    returnDate,
    theAmountOfCollateral,
    viewId,
    articleId,
    divisionId,
    sourceOfFinancing,
    MP,
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
}: valuesParamPropsArr) => {
    const [open, setOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>(contractColor);
    const [isPending, startTransition] = useTransition();
    const [pdf, setPdf] = useState<string>(pdfFile as string);

    const router = useRouter();

    const form = useForm<z.infer<typeof ContractSchema>>({
        resolver: zodResolver(ContractSchema),
        defaultValues: {
            placementId: placementId || undefined,
            typeId: typeId || undefined,
            point: point || undefined,
            subItem: subItem || undefined,
            federalId: federalId || undefined,
            contractNumber: contractNumber || undefined,
            startDateOfTheAgreement: startDateOfTheAgreement || undefined,
            thePostagePeriod: thePostagePeriod || undefined,
            endDateOfTheContract: endDateOfTheContract || undefined,
            provider: provider || undefined,
            theSubjectOfTheAgreement: theSubjectOfTheAgreement || undefined,
            theAmountOfTheContract: theAmountOfTheContract || undefined,
            returnDate: returnDate || undefined,
            theAmountOfCollateral: theAmountOfCollateral || undefined,
            viewId: viewId || undefined,
            articleId: articleId || undefined,
            divisionId: divisionId || undefined,
            sourceOfFinancing: sourceOfFinancing || undefined,
            MP: MP || undefined,
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
        values.contractColor = color;

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
                        setOpen(false);
                        router.refresh();
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    }

    const deletePreview = () => {
        setPdf('');
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="mx-1">
                <Button variant="outline" className="w-[50px] p-2"><FaRegEdit className="!w-full !h-full" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Редактировать</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="grid gap-4 py-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                            <div className="flex flex-col flex-wrap gap-2">
                                {formParams.map(formParam => (
                                    <div className="w-auto" key={formParam.name}>
                                        {formParam.type === "text" && (
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
                                                        {formParam.name === "placementId" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder={formParam.label}
                                                                        />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {placements.map(placement => (
                                                                        <SelectItem value={placement.name} key={placement.name}>
                                                                            {placement.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                        {formParam.name === "typeId" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
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
                                                        {formParam.name === "federalId" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
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
                                                                            className={`${color.color} h-9 my-1`}>
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                        {formParam.name === "viewId" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
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
                                                        {formParam.name === "articleId" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
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
                                                        {formParam.name === "divisionId" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
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

                                        {formParam.type === "bool" && (
                                            <FormField
                                                control={form.control}
                                                name={formParam.name as any}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between
                                    rounded-lg border p-3 shadow-sm w-[250px]">
                                                        <div className="space-y-0.5">
                                                            <FormLabel>{formParam.label}</FormLabel>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
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
                        </ScrollArea>

                        <DialogFooter>
                            <Button
                                disabled={isPending}
                                type="submit">
                                Сохранить
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
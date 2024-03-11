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
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { ContractSchema } from "@/schemas/contract.schema";


interface valuesParamProps {
    name: string;
    label: string;
    type: string;
}

interface selectParam {
    name: string;
}

interface colorParam {
    color: string;
}

type valuesParamPropsArr = {
    valuesParam: valuesParamProps[]
    placements: selectParam[]
    types: selectParam[]
    federals: selectParam[]
    views: selectParam[]
    articles: selectParam[]
    divisions: selectParam[]
    colors: colorParam[]
}


export const EditContract = ({
    valuesParam,
    placements,
    types,
    federals,
    views,
    articles,
    divisions,
    colors
}: valuesParamPropsArr) => {
    const [open, setOpen] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const form = useForm<z.infer<typeof ContractSchema>>({
        resolver: zodResolver(ContractSchema),
        defaultValues: {
            name: name || undefined
            placement: "",
            type: "",
            federal: "",
            contractNumber: "",
            startDateOfTheAgreement: "",
            endDateOfTheContract: "",
            provider: "",
            theSubjectOfTheAgreement: "",
            actuallyPaidFor: "",
            theAmountOfTheContract: "",
            returnDate: "",
            theAmountOfCollateral: "",
            view: "",
            article: "",
            division: "",
            sourceOfFinancing: "",
            MP: false,
            subcontractorMP: false,
            transients: false,
            additionalInformation: "",
            contractColor: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ContractSchema>) => {
        startTransition(() => {
            contractUpdate(values, id)
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
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Редактировать договор</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] sm:max-h-[800px]">
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
                                {valuesParam.map(valueParam => (
                                    <div className="w-auto" key={valueParam.name}>
                                        {valueParam.type === "text" && (
                                            <FormField
                                                control={form.control}
                                                name={valueParam.name as any}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{valueParam.label}</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder={valueParam.label}
                                                                disabled={isPending}
                                                                type={valueParam.type}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        {valueParam.type === "date" && (
                                            <FormField
                                                control={form.control}
                                                name={valueParam.name as any}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{valueParam.label}</FormLabel>
                                                        <FormControl className="w-[200px]">
                                                            <Input
                                                                {...field}
                                                                placeholder={valueParam.label}
                                                                disabled={isPending}
                                                                type={valueParam.type}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        {valueParam.type === "select" && (
                                            <FormField
                                                control={form.control}
                                                name={valueParam.name as any}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{valueParam.label}</FormLabel>
                                                        {valueParam.name === "placement" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder={valueParam.label}
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
                                                        {valueParam.name === "type" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder={valueParam.label}
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
                                                        {valueParam.name === "federal" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder={valueParam.label}
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
                                                        {valueParam.name === "contractColor" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={(value) => setColor(value)}
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
                                                        {valueParam.name === "view" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder={valueParam.label}
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
                                                        {valueParam.name === "article" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder={valueParam.label}
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
                                                        {valueParam.name === "division" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder={valueParam.label}
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

                                        {valueParam.type === "bool" && (
                                            <FormField
                                                control={form.control}
                                                name={valueParam.name as any}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between
                                    rounded-lg border p-3 shadow-sm w-[250px]">
                                                        <div className="space-y-0.5">
                                                            <FormLabel>{valueParam.label}</FormLabel>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
                                                                disabled={isPending}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        {valueParam.type === "textArea" && (
                                            <FormField
                                                control={form.control}
                                                name={valueParam.name as any}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{valueParam.label}</FormLabel>
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
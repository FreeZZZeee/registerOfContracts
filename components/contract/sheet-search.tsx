"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import Link from "next/link";

import { SearchContractSchema } from "@/schemas/contract.schema";
import { contractSearch } from "@/actions/contract";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { removeItem } from "@/hooks/lokalStorege.removeItem";
import { useRouter } from "next/navigation";

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
    users: selectParam[]
}

export const SheetSearch = ({
    valuesParam,
    placements,
    types,
    federals,
    views,
    articles,
    divisions,
    colors,
    users
}: valuesParamPropsArr) => {
    const [color, setColor] = useState<string>();
    const [open, setOpen] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof SearchContractSchema>>({
        resolver: zodResolver(SearchContractSchema),
        defaultValues: {
            placementId: "",
            typeId: "",
            federalId: "",
            contractNumber: "",
            startDateOfTheAgreement: "",
            endDateOfTheContract: "",
            provider: "",
            theSubjectOfTheAgreement: "",
            actuallyPaidFor: "",
            theAmountOfTheContract: "",
            returnDate: "",
            theAmountOfCollateral: "",
            viewId: "",
            articleId: "",
            divisionId: "",
            sourceOfFinancing: "",
            MP: false,
            subcontractorMP: false,
            transients: false,
            additionalInformation: "",
            contractColor: ""
        }
    });

    const onSubmit = (values: z.infer<typeof SearchContractSchema>) => {
        startTransition(() => {
            contractSearch(values)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }

                    if (data.success) {
                        toast.success(data.success);
                        setOpen(false);
                        localStorage.setItem('searchContracts', JSON.stringify(data.contracts));
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    }

    const clearSearch = () => {
        removeItem('searchContracts');
        toast.success("Фильтр сброшен");
        setOpen(false);
        window.location.reload()

    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline">Поиск</Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Поиск договоров</SheetTitle>
                    <SheetDescription>
                        Выберете нужные параметры.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form
                        className="grid gap-4 py-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <ScrollArea className="h-[700px] w-full rounded-md border p-4">
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
                                                        {valueParam.name === "placementId" && (
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
                                                        {valueParam.name === "typeId" && (
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
                                                        {valueParam.name === "federalId" && (
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
                                                        {valueParam.name === "viewId" && (
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
                                                        {valueParam.name === "articleId" && (
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
                                                        {valueParam.name === "divisionId" && (
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
                                <FormField
                                    control={form.control}
                                    name="userId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Исполнитель</FormLabel>
                                            <Select
                                                disabled={isPending}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Исполнитель"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {users.map(user => (
                                                        <SelectItem value={user.name} key={user.name}>
                                                            {user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </ScrollArea>
                        {/* <FormError message={error} />
            <FormSuccess message={success} /> */}
                        <SheetFooter>
                            {/* <SheetClose asChild> */}
                            <Button type="submit" className="w-full">Поиск</Button>
                            {/* </SheetClose> */}
                            <Link className="w-full text-white text-center bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 
              font-medium rounded-lg text-sm px-5 py-2 dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none
               dark:focus:ring-slate-800"
                                href="#"
                                onClick={() => clearSearch()}>Сбросить</Link>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>

    );
}
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
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { removeItem } from "@/hooks/lokalStorege.removeItem";
import { searchFormParams } from "@/data/form-params"
import { colors } from "@/data/colors";
import { valuesParamPropsArr } from "@/interfaces/searchContract.interface";

export const SheetSearch = ({
    placements,
    types,
    federals,
    articles,
    divisions,
    users
}: valuesParamPropsArr) => {
    const [color, setColor] = useState<string>();
    const [open, setOpen] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SearchContractSchema>>({
        resolver: zodResolver(SearchContractSchema),
        defaultValues: {
            user: "",
            placement: "",
            type: "",
            point: "",
            subItem: "",
            federal: "",
            startDateOfTheAgreement: "",
            thePostagePeriodFrom: "",
            thePostagePeriodIsUpTo: "",
            endDateOfTheContract: "",
            provider: "",
            theSubjectOfTheAgreement: "",
            theAmountOfTheContractFrom: "",
            theAmountOfTheContractIsUpTo: "",
            division: "",
            sourceOfFinancing: "",
            subcontractorMP: false,
            micro: false,
            small: false,
            average: false,
            transients: false,
            contractColor: ""
        }
    });

    const onSubmit = (values: z.infer<typeof SearchContractSchema>) => {
        values.contractColor = color;
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
                                {searchFormParams.map(formParam => (
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
                                                        {formParam.name === "user" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder={formParam.label}
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
                                                        )}
                                                        {formParam.name === "placement" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
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
                                                        {formParam.name === "type" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
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
                                                        {formParam.name === "federal" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
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

                                                        {formParam.name === "article" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
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
                                                        {formParam.name === "division" && (
                                                            <Select
                                                                disabled={isPending}
                                                                onValueChange={field.onChange}
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
                                                    <FormItem className="flex flex-row items-center justify-between
                                    rounded-lg border p-3 shadow-sm w-[250px]">
                                                        <div className="space-y-0.5">
                                                            <FormLabel>{formParam.label}</FormLabel>
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
                                    </div>
                                ))}
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
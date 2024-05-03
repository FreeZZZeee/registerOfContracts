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
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { guideCreateAction } from "@/actions/guide";
import { PaymentSchema } from "@/schemas/payment.schema";
import { GrUpdate } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";


export const addAContractPayment = () => {
    const [value, setValues] = useState<string>();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof PaymentSchema>>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {
            amount: "",
            contractId: ""
        }
    });

    const onSubmit = (values: z.infer<typeof PaymentSchema>) => {
        startTransition(() => {
            guideCreateAction(values, dbName)
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

    useEffect(() => {
        if (value) {
            setValues("");
        }
    }, [value])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Добавить</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Добавить</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="grid gap-4 py-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name={formParam.name as any}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{formParam.label}</FormLabel>
                                    <FormControl>
                                        <>
                                            <div className="pt-2 flex justify-center gap-x-2">
                                                <Input
                                                    {...field}
                                                    value={value}
                                                    placeholder="Сумма платежа"
                                                    disabled={isPending}
                                                    type="text"
                                                />
                                                <Input
                                                    {...field}
                                                    value={value}
                                                    placeholder="Дата регистрации платежа"
                                                    disabled={isPending}
                                                    type="date"
                                                />
                                                <Input
                                                    {...field}
                                                    value={value}
                                                    placeholder="Подразделение"
                                                    disabled={isPending}
                                                    type="text"
                                                />
                                                <Input
                                                    {...field}
                                                    value={value}
                                                    placeholder="№ платежного поручения"
                                                    disabled={isPending}
                                                    type="text"
                                                />
                                                <Button
                                                    onClick={() => { }}
                                                    variant="secondary"
                                                    className="w-[100px] p-2"
                                                    disabled={isPending}
                                                >
                                                    <GrUpdate className="!w-full !h-full" />
                                                </Button>
                                                <Button
                                                    onClick={() => { }}
                                                    variant="destructive"
                                                    className="w-[100px] p-2"
                                                    disabled={isPending}
                                                >
                                                    <TiDelete className="!w-full !h-full" />
                                                </Button>
                                            </div>
                                            <div className="flex flex-col">
                                                <Button variant="outline" className="w-56 ml-auto my-2">
                                                    Добавить
                                                </Button>
                                                <p className="font-bold mr-2 ml-auto">Итого: <span className="font-medium">0</span></p>
                                            </div>
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
    )
}
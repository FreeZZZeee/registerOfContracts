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
import { PaymentSchema } from "@/schemas/payment.schema";
import { payCreateAction } from "@/actions/payment";
import { formParamsPayment } from "@/data/form-params";


export const AddAContractPayment = () => {
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
            payCreateAction(values)
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
                        {formParamsPayment.map(formParam => (
                            <FormField
                                control={form.control}
                                name={formParam.name as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{formParam.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={value}
                                                placeholder={formParam.label}
                                                disabled={isPending}
                                                type={formParam.type}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

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
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
import { PaymentSchema } from "@/schemas/payment.schema";
import { payUpdateAction } from "@/actions/payment";
import { formParamsPayment } from "@/data/form-params";
import { AutocompleteInput } from "@/components/autocompleteInput";
import { FaRegEdit } from "react-icons/fa";
import { Payment } from "@/interfaces/payment.interface";

interface autocompleteInputProps {
    providers: []
    valueProvider: string
    payment: Payment
}


export const EditContractPayment = ({
    providers,
    valueProvider,
    payment
}: autocompleteInputProps) => {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof PaymentSchema>>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {
            amount: payment.amount || undefined,
            paymentOrderNumber: payment.paymentOrderNumber || undefined,
            paymentRegistrationDate: payment.paymentRegistrationDate.toISOString().substring(0, 10) || undefined,
            division: payment.division || undefined,
            contract: payment.contract || undefined
        }
    });

    const onSubmit = (values: z.infer<typeof PaymentSchema>) => {
        startTransition(() => {
            payUpdateAction(values, payment.id)
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
                <Button variant="outline"><FaRegEdit className="!w-full !h-full" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-100">
                <DialogHeader>
                    <DialogTitle>Редактировать</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="grid gap-4 py-4"
                    // onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {formParamsPayment.map(formParam => (
                            <div key={formParam.name}>
                                {formParam.name !== "division" && (
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
                                {formParam.name === "division" && (
                                    <AutocompleteInput
                                        control={form.control}
                                        nameProvider={formParam.name}
                                        label={formParam.label}
                                        type={formParam.type}
                                        isPending={isPending}
                                        providers={providers as []}
                                        setValue={form.setValue}
                                        valueProvider={valueProvider}
                                    />
                                )}
                            </div>

                        ))}

                        <DialogFooter>
                            <Button
                                disabled={isPending}
                                type="button"
                                onClick={() => onSubmit(form.getValues())}
                            >
                                Сохранить
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
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
import { AutocompleteInput } from "@/components/autocompleteInput";
import { selectParam } from "@/interfaces/guide.interface";

interface Props {
    idContract: string
    providers: selectParam[]
}

export const AddAContractPayment = ({
    idContract,
    providers
}: Props) => {
    const [value, setValues] = useState<string>();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof PaymentSchema>>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {
            amount: "",
            paymentOrderNumber: "",
            paymentRegistrationDate: undefined,
            division: "",
            contract: idContract
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
            <DialogTrigger asChild className="float-right">
                <Button variant="outline">Добавить</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-100">
                <DialogHeader>
                    <DialogTitle>Добавить</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="grid gap-4 py-4"
                    >
                        {formParamsPayment.map(formParam => (
                            <div key={formParam.name}>
                                {formParam.name !== "division" && (
                                    <FormField
                                        key={formParam.name}
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
                                        valueProvider={""}
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
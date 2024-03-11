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
import { ViewSchema } from "@/schemas/view.schema";
import { viewCreate } from "@/actions/view";
import { useRouter } from "next/navigation";


export const AddAView = () => {
    const [value, setValues] = useState<string>();
    const [open, setOpen] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const form = useForm<z.infer<typeof ViewSchema>>({
        resolver: zodResolver(ViewSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ViewSchema>) => {
        startTransition(() => {
            viewCreate(values)
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Наименование</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={value}
                                            placeholder="Наименование"
                                            disabled={isPending}
                                            type="text"
                                        />
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
    );
}
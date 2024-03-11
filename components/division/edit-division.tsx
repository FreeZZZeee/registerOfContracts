"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import {
    Dialog,
    DialogClose,
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
import { FaRegEdit } from "react-icons/fa";
import { DivisionSchema } from "@/schemas/division.schema";
import { divisionUpdate } from "@/actions/division";
import { useRouter } from "next/navigation";

interface EditDivisionProps {
    id: string;
    name: string;
}


export const EditDivision = ({
    id,
    name
}: EditDivisionProps) => {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof DivisionSchema>>({
        resolver: zodResolver(DivisionSchema),
        defaultValues: {
            name: name || undefined
        }
    });

    const onSubmit = (values: z.infer<typeof DivisionSchema>) => {
        startTransition(() => {
            divisionUpdate(values, id)
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
                <Button variant="outline" className="w-[50px]"><FaRegEdit className="w-full" /></Button>
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
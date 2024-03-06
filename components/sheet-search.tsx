"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContractSchema } from "@/schemas/contract.schema";
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import {  useForm } from "react-hook-form"
import { Form ,FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useState, useTransition } from "react";
import { contractCreate } from "@/actions/contract";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
  

export const SheetSearch = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContractSchema>>({
    resolver: zodResolver(ContractSchema),
    defaultValues: {
        name: "",
    }
  });

  const onSubmit = (values: z.infer<typeof ContractSchema>) => {
    startTransition(() => {
      contractCreate(values)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                }

                if (data.success) {
                    setSuccess(data.success);
                }
            })
            .catch(() => setError("Что-то пошло не так!"));
    });
}

    return (
        <Sheet>
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
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Номер договора</FormLabel>
                                <FormControl>
                                <Input 
                                    {...field}
                                    placeholder="Номер договора"
                                    disabled={isPending}
                                    type="text"
                                />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                            <FormError message={error}/>
                            <FormSuccess message={success}/>
                            <SheetFooter>
                          <SheetClose asChild>
                            <Button type="submit" className="w-full">Поиск</Button>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button>Сбросить все фильтры</Button>
                          </SheetClose>
                        </SheetFooter>
                    </form>                    
            </Form>    
          </SheetContent>
        </Sheet>

    );
}
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
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { typeCreate } from "@/actions/type";
import { TypeSchema } from "@/schemas/type.schema";
  

export const AddAType = () => {
    const [value, setValues] = useState<string>();
    const [isPending, startTransition] = useTransition();
  
    const form = useForm<z.infer<typeof TypeSchema>>({
      resolver: zodResolver(TypeSchema),
      defaultValues: {
          name: "",
      }
    });
  
    const onSubmit = (values: z.infer<typeof TypeSchema>) => {
      startTransition(() => {
        typeCreate(values)
              .then((data) => {
                  if (data.error) {
                      toast.error(data.error);
                  }
  
                  if (data.success) {
                    toast.success(data.success);
                    window.location.reload();   
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
      <Dialog>
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
                      <DialogClose asChild>
                          <Button 
                            disabled={isPending}
                            type="submit">
                              Сохранить
                          </Button>
                      </DialogClose>
                    </DialogFooter>
                </form>
            </Form>        
      </DialogContent>
    </Dialog>
    );
}
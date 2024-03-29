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
import { ArticleSchema } from "@/schemas/article.schema";
import { articleCreate } from "@/actions/article";
import { useRouter } from "next/navigation";


export const AddAArticle = () => {
  const [value, setValues] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ArticleSchema>>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {
      name: "",
    }
  });

  const onSubmit = (values: z.infer<typeof ArticleSchema>) => {
    startTransition(() => {
      articleCreate(values)
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
        .catch((e) => toast.error(e));
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
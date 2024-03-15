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
import { ContractSchema } from "@/schemas/contract.schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { contractCreate } from "@/actions/contract";
import { useRouter } from "next/navigation";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FILE } from "dns";




interface valuesParamProps {
  name: string;
  label: string;
  type: string;
}

interface selectParam {
  name: string;
}

interface colorParam {
  color: string;
}

type valuesParamPropsArr = {
  valuesParam: valuesParamProps[]
  placements: selectParam[]
  types: selectParam[]
  federals: selectParam[]
  views: selectParam[]
  articles: selectParam[]
  divisions: selectParam[]
  colors: colorParam[]
}

export const AddAContract = ({
  valuesParam,
  placements,
  types,
  federals,
  views,
  articles,
  divisions,
  colors
}: valuesParamPropsArr) => {
  const [value, setValues] = useState<string>();
  const [color, setColor] = useState<string>();
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ContractSchema>>({
    resolver: zodResolver(ContractSchema),
    defaultValues: {
      placementId: "",
      typeId: "",
      federalId: "",
      contractNumber: "",
      startDateOfTheAgreement: "",
      endDateOfTheContract: "",
      provider: "",
      theSubjectOfTheAgreement: "",
      actuallyPaidFor: "",
      theAmountOfTheContract: "",
      returnDate: "",
      theAmountOfCollateral: "",
      viewId: "",
      articleId: "",
      divisionId: "",
      sourceOfFinancing: "",
      MP: false,
      subcontractorMP: false,
      transients: false,
      additionalInformation: "",
      contractColor: "",
    }
  });

  const onSubmit = (values: z.infer<typeof ContractSchema>) => {
    values.contractColor = color;

    startTransition(() => {
      contractCreate(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            // setOpen(false);
            // router.refresh();
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
        <Button variant="outline">Добавить договор</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Добавить</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
              <div className="flex flex-col flex-wrap gap-2">
                {valuesParam.map(valueParam => (
                  <div className="w-auto" key={valueParam.name}>
                    {valueParam.type === "text" && (
                      <FormField
                        control={form.control}
                        name={valueParam.name as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{valueParam.label}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={value}
                                placeholder={valueParam.label}
                                disabled={isPending}
                                type={valueParam.type}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {valueParam.type === "date" && (
                      <FormField
                        control={form.control}
                        name={valueParam.name as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{valueParam.label}</FormLabel>
                            <FormControl className="w-[200px]">
                              <Input
                                {...field}
                                value={value}
                                placeholder={valueParam.label}
                                disabled={isPending}
                                type={valueParam.type}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {valueParam.type === "select" && (
                      <FormField
                        control={form.control}
                        name={valueParam.name as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{valueParam.label}</FormLabel>
                            {valueParam.name === "placementId" && (
                              <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={valueParam.label}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {placements && placements.map(placement => (
                                    <SelectItem value={placement.name} key={placement.name}>
                                      {placement.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {valueParam.name === "typeId" && (
                              <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={valueParam.label}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {types && types.map(type => (
                                    <SelectItem value={type.name} key={type.name}>
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {valueParam.name === "federalId" && (
                              <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={valueParam.label}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {federals && federals.map(federal => (
                                    <SelectItem value={federal.name} key={federal.name}>
                                      {federal.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {valueParam.name === "contractColor" && (
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
                            {valueParam.name === "viewId" && (
                              <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={valueParam.label}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {views && views.map(view => (
                                    <SelectItem value={view.name} key={view.name}>
                                      {view.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {valueParam.name === "articleId" && (
                              <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={valueParam.label}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {articles && articles.map(article => (
                                    <SelectItem value={article.name} key={article.name}>
                                      {article.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {valueParam.name === "divisionId" && (
                              <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={valueParam.label}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {divisions && divisions.map(division => (
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

                    {valueParam.type === "bool" && (
                      <FormField
                        control={form.control}
                        name={valueParam.name as any}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between
                                    rounded-lg border p-3 shadow-sm w-[250px]">
                            <div className="space-y-0.5">
                              <FormLabel>{valueParam.label}</FormLabel>
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

                    {valueParam.type === "textArea" && (
                      <FormField
                        control={form.control}
                        name={valueParam.name as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{valueParam.label}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Дополнительная информация" id="message-2"
                                disabled={isPending}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {valueParam.type === "file" && (
                      <FormField
                        control={form.control}
                        name={valueParam.name as any}
                        render={({ field }) => (
                          <div className="max-w-xl">
                            <label
                              className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                              <span className="flex items-center space-x-2">
                                <IoCloudUploadOutline />
                                <span className="font-medium text-gray-600">
                                  Перетащите файл для прикрепления или &nbsp;
                                  <span className="text-blue-600 underline">нажамите</span>
                                </span>
                              </span>
                              <Input
                                {...field}
                                value={value}
                                placeholder={valueParam.label}
                                disabled={isPending}
                                type={valueParam.type}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      />
                    )}
                  </div>
                ))}

              </div>
            </ScrollArea>

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
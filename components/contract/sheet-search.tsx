"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"

import { SearchContractSchema } from "@/schemas/contract.schema";
import { contractSearch } from "@/actions/contract";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";

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

export const SheetSearch = ({
  valuesParam,
  placements,
  types,
  federals,
  views,
  articles,
  divisions,
  colors
}: valuesParamPropsArr) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [color, setColor] = useState<string>();
  // const [contracts, setContracts] = useState<[]>([]);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof SearchContractSchema>>({
    resolver: zodResolver(SearchContractSchema),
    defaultValues: {
      placement: "",
      type: "",
      federal: "",
      contractNumber: "",
      startDateOfTheAgreement: "",
      endDateOfTheContract: "",
      provider: "",
      theSubjectOfTheAgreement: "",
      actuallyPaidFor: "",
      theAmountOfTheContract: "",
      returnDate: "",
      theAmountOfCollateral: "",
      view: "",
      article: "",
      division: "",
      sourceOfFinancing: "",
      MP: false,
      subcontractorMP: false,
      transients: false,
      additionalInformation: "",
      contractColor: ""
    }
  });

  const onSubmit = (values: z.infer<typeof SearchContractSchema>) => {
    startTransition(() => {
      contractSearch(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setSuccess(data.success);
            // localStorage.setItem('contracts', JSON.stringify(data.contracts));
            router.refresh();
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
            <ScrollArea className="h-[700px] w-full rounded-md border p-4">
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
                            {valueParam.name === "placement" && (
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
                                  {placements.map(placement => (
                                    <SelectItem value={placement.name} key={placement.name}>
                                      {placement.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {valueParam.name === "type" && (
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
                                  {types.map(type => (
                                    <SelectItem value={type.name} key={type.name}>
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {valueParam.name === "federal" && (
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
                                  {federals.map(federal => (
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
                            {valueParam.name === "view" && (
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
                                  {views.map(view => (
                                    <SelectItem value={view.name} key={view.name}>
                                      {view.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {valueParam.name === "article" && (
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
                                  {articles.map(article => (
                                    <SelectItem value={article.name} key={article.name}>
                                      {article.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {valueParam.name === "division" && (
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
                                  {divisions.map(division => (
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
                  </div>
                ))}

              </div>
            </ScrollArea>
            <FormError message={error} />
            <FormSuccess message={success} />
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
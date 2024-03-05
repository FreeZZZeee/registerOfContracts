"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from 'uuid';

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
import { ControllerRenderProps, useForm } from "react-hook-form"
import { divisionCreate } from "@/actions/division";
import { ContractSchema } from "@/schemas/contract.schema";
import { ScrollArea } from "../ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

interface valuesParamProps {
  placement: string;
  type: string;
  federal: string;
  contractNumber: string;
  startDateOfTheAgreement: string;
  endDateOfTheContract: string;
  provider: string;
  theSubjectOfTheAgreement: string;
  actuallyPaidFor: string;
  theAmountOfTheContract: string;
  returnDate: string;
  theAmountOfCollateral: string;
  classifierSection: string;
  classifierSection2014: string;
  view: string;
  article: string;
  division: string;
  sourceOfFinancing: string;
  MP: boolean;
  subcontractorMP: boolean;
  transients: boolean;
}

export const AddAContract = (
  {
    placement,
    type,
    federal,
    contractNumber,
    startDateOfTheAgreement,
    endDateOfTheContract,
    provider,
    theSubjectOfTheAgreement,
    actuallyPaidFor,
    theAmountOfTheContract,
    returnDate,
    theAmountOfCollateral,
    classifierSection,
    classifierSection2014,
    view,
    article,
    division,
    sourceOfFinancing,
    MP,
    subcontractorMP,
    transients
  }: valuesParamProps
  ) => {
    const [value, setValues] = useState<string>();
    const [isPending, startTransition] = useTransition();
  
    const form = useForm<z.infer<typeof ContractSchema>>({
      resolver: zodResolver(ContractSchema),
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
        classifierSection: "",
        classifierSection2014: "",
        view: "",
        article: "",
        division: "",
        sourceOfFinancing: "",
        MP: false,
        subcontractorMP: false,
        transients: false,
      }
    });
  
    const onSubmit = (values: z.infer<typeof ContractSchema>) => {
      startTransition(() => {
        divisionCreate(values)
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
        <Button variant="outline">Добавить договор</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[800px]">
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
                      <div key={valueParam.name}>
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
                                type="text"
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
                                              <SelectItem value="1">
                                              {placement.name}
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
                                <Textarea placeholder="Дополнительная информация" id="message-2" />
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
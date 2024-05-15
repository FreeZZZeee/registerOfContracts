import { Provider } from "@/interfaces/provider.interface"
import { Card, CardContent } from "./ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useEffect, useRef, useState } from "react"
import { useAutocomplete } from "@/hooks/useAutocomplete"

interface autocompleteInputProps {
    control: any
    nameProvider: any
    label: string
    type: string
    isPending: boolean
    providers: []
    setValue: any
}

export const AutocompleteInput = ({
    control,
    nameProvider,
    label,
    type,
    isPending,
    providers,
    setValue
}: autocompleteInputProps) => {
    const inputSearchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputSearchRef.current) {
            inputSearchRef.current.focus();
        }
    }, [])

    const {
        searchedValue,
        suggestions,
        selectedSuggestion,
        activeSuggestion,
        handleChange,
        handleKeyDown,
        handleClick,
    } = useAutocomplete(providers, inputSearchRef.current);

    return (
        <FormField
            control={control}
            name={nameProvider}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="pt-2 flex flex-col justify-center">
                            <Input
                                {...field}
                                value={searchedValue}
                                placeholder={label}
                                onChangeCapture={handleChange}
                                onKeyDown={handleKeyDown}
                                ref={inputSearchRef}
                                disabled={isPending}
                                type={type}
                            />
                            <Card className="mt-1 border-none">
                                {!suggestions.length &&
                                    searchedValue.length &&
                                    !selectedSuggestion.length ? (
                                    <></>
                                ) : (
                                    <>
                                        {suggestions.map(({ name }: Provider, index) => (
                                            <CardContent key={index} className="p-0">
                                                <p
                                                    className={`h-full pt-1 text-center hover:cursor-pointer hover:bg-gray-100 ${index === activeSuggestion - 1 ? "bg-gray-100" : ""
                                                        }`}
                                                    onClick={() => {
                                                        handleClick(name)
                                                        setValue(nameProvider, name)
                                                    }}
                                                >{name}</p>
                                            </CardContent>

                                        ))}
                                    </>
                                )}
                            </Card>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )
            }
        />
    )
}
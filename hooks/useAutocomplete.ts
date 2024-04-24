import { useEffect, useState } from "react";

import { Provider } from "@/interfaces/provider.interface";

export const useAutocomplete = (
    providers: Provider[],
    inputSearchRef: HTMLInputElement | null
) => {
    const [searchedValue, setSearchedValue] = useState("");
    const [suggestions, setSuggestions] = useState<Provider[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState("");
    const [activeSuggestion, setActiveSuggestion] = useState(0);

    useEffect(() => {
        if (inputSearchRef) {
            inputSearchRef.focus();
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value !== "") {
            const filteredSuggestions = providers.filter((itemData) => {
                const value = event.target.value.toUpperCase();
                const name = itemData.name.toUpperCase();

                return value && name.startsWith(value) && name !== value;
            });
            setSearchedValue(event.target.value);
            setSuggestions(filteredSuggestions);
        } else {
            setSearchedValue(event.target.value);
            setSuggestions([]);
            setSelectedSuggestion("");
            setActiveSuggestion(0);
        }
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (event.key === "ArrowDown" && activeSuggestion < suggestions.length) {
            setActiveSuggestion(activeSuggestion + 1);
        } else if (event.key === "ArrowUp" && activeSuggestion > 1) {
            setActiveSuggestion(activeSuggestion - 1);
        } else if (event.key === "Enter") {
            setSearchedValue(suggestions[activeSuggestion - 1].name);
            setSelectedSuggestion(suggestions[activeSuggestion - 1].name);
            setSuggestions([]);
            setActiveSuggestion(0);
        }
    };

    const handleClick = (value: string) => {
        setSearchedValue(value);
        setSuggestions([]);
        setSelectedSuggestion(value);
        setActiveSuggestion(0);
        //do something else
    };

    return {
        searchedValue,
        suggestions,
        selectedSuggestion,
        activeSuggestion,
        handleChange,
        handleKeyDown,
        handleClick,
    };
};

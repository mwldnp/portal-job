import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { router } from "@inertiajs/react";
import { Field } from "../ui/field";

interface SearchBoxProps {
    name?: string;
    value?: string;
    routeName: string;
    filters?: Record<string, any>;
    placeholder?: string;
    debounce?: number;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
    name = "search",
    value = "",
    routeName,
    filters = {},
    placeholder = "Search...",
    debounce = 500,
}) => {
    const [query, setQuery] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);

        router.get(routeName, { ...filters, [name]: newValue }, { preserveState: true });
    };

    return (
        <Field className="py-3 flex justify-end items-center" orientation={'horizontal'}>
            <Input
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
                className="max-w-xs"
            />
        </Field>
    );
};

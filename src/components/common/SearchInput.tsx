import { useState } from "react";
import { Genre } from "../../api/api";

import { Input } from "./Input";

type Props = {
    id: string;
    label?: string;
    value: string | number;
    searchOptions?: Genre[];
    onChange: (text: string) => void;
    onOptionSelect?: (option: Genre) => void;
}

export const SearchInput = ({ label, id, value, searchOptions = [], onChange, onOptionSelect}: Props) => {
    const [showSearchOptions, setShowSearchOptions] = useState(false);

    const handleClickOutside = () => {
        setShowSearchOptions(false);
    };
    
    return (
        <Input
            id={id}
            label={label}
            value={value}
            onSelect={() => setShowSearchOptions(true)}
            onChange={(e) => {
                onChange(e.target.value);
                setShowSearchOptions(true);
            }}
            onOutsideClick={handleClickOutside}
        >
            <div className={`absolute top-full w-full shadow-md rounded-bl-lg rounded-br-lg border rounded z-10 max-h-64 overflow-auto ${showSearchOptions && !!searchOptions.length ? 'visible' : 'hidden'}`}>
                {searchOptions?.map(option => (
                    <div
                        key={option.id}
                        className="px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                            onOptionSelect && onOptionSelect(option);
                            setShowSearchOptions(false);
                        }}
                    >
                        {option.name}
                    </div>
                ))}
            </div>
        </Input>
    );
};
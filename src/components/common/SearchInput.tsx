import { useState } from "react";

import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label?: string;
    searchOptions?: string[];
    onInputChange: (text: string) => void;
    onOptionSelect?: (text: string) => void;
    value: string | number;
}

export const SearchInput = ({ label, id, searchOptions = [], onInputChange, onOptionSelect, value, ...props}: Props) => {
    const [showSearchOptions, setShowSearchOptions] = useState(false);

    const handleClickOutside = () => {
        setShowSearchOptions(false);
    };
    
    const ref = useOutsideClick(handleClickOutside);

    return (
        <div ref={ref} className="mb-4 relative">
            {label && (
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={value}
                onSelect={() => setShowSearchOptions(true)}
                onChange={(e) => {
                    onInputChange(e.target.value);
                    setShowSearchOptions(true);
                }}
                {...props}
            /> 
            <div className={`absolute top-full bg-black text-white w-full p-2 ${showSearchOptions && !!searchOptions.length ? 'visible' : 'hidden'}`}>
                {searchOptions?.map(text => (
                    <div 
                        key={text}
                        className="p-2 hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                            onOptionSelect && onOptionSelect(text);
                            setShowSearchOptions(false);
                        }}
                    >
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
};
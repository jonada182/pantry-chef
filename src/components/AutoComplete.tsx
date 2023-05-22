import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  placeholder?: string;
  options: Option[];
  handleSelectValue: (value: string) => void;
}

export const AutoComplete = ({ placeholder = "Search...", options, handleSelectValue }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Option[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    if (searchValue == "")
      return setSuggestions([]);
    // Perform your suggestions logic here, e.g., filtering options based on the input value
    const filteredSuggestions = options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (value: string) => {
    handleSelectValue(value);
    setSuggestions([]);
    setSearchValue("");
  };

  return (
    <div className="relative">
      <input
        value={searchValue}
        type="text"
        onChange={handleChange}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-yellow-500"
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full max-h-60 overflow-y-auto py-1 mt-2 bg-white rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(suggestion.value)}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

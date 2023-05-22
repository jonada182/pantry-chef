import React from "react";

type Props = {
  type?: string;
  value?: string;
  placeholder?: string;
  isLoading?: boolean;
  handleOnChange: (value: string) => void;
  required?: boolean;
  className?: string;
};

export function TextInput({ type = "text", value, placeholder = "Type something", isLoading, handleOnChange, required = false, className = "" }: Props) {
  return (
    <input
      className={`px-4 py-2 bg-gray-100 w-full rounded h-12 ${className}`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => handleOnChange(e.target.value)}
      disabled={isLoading}
      required={required}
    />
  );
}

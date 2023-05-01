import React from "react";

type Props = {
  value?: string;
  isLoading?: boolean;
  handleOnChange: (value: string) => void;
};

export function TextInput({ value, isLoading, handleOnChange }: Props) {
  return (
    <input
      className="px-4 py-2 bg-gray-100 flex-1 rounded h-12"
      placeholder="Type a message to send"
      type="text"
      value={value}
      onChange={(e) => handleOnChange(e.target.value)}
      disabled={isLoading}
    />
  );
}

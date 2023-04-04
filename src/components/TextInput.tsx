type Props = {
  value: string;
  isLoading: boolean;
  handleOnChange: (value: string) => void;
};

export function TextInput({ value, isLoading, handleOnChange }: Props) {
  return (
    <input
      className="p-4 bg-gray-100 flex-1 rounded"
      placeholder="Type a message to send"
      type="text"
      value={value}
      onChange={(e) => handleOnChange(e.target.value)}
      disabled={isLoading}
    />
  );
}

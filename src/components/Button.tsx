type Props = {
  text: string;
  loadingText: string;
  isLoading: boolean;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Button({ text, loadingText, isLoading, handleOnClick }: Props) {
  return (
    <button
      className={`px-8 py-4 rounded font-bold ${isLoading ? "bg-light-primary" : "bg-primary"}`}
      onClick={(e) => handleOnClick(e)}
      disabled={isLoading}
    >
      {isLoading ? loadingText : text}
    </button>
  );
}

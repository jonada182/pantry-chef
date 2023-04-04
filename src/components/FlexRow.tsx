type Props = {
  gapSize: number;
  children?: React.ReactNode;
  className?: string;
};

export function FlexRow({ gapSize, children, className }: Props) {
  return (
    <div className={`flex flex-row gap-${gapSize} ${className}`}>{ children }</div>
  );
}

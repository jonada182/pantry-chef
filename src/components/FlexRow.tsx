type Props = {
  children?: React.ReactNode;
  className?: string;
  gap?: number;
};

export function FlexRow({ children, className = ``, gap = 0 }: Props) {
  const gapClass = `gap-${ gap }`;
  return (
    <div className={`flex flex-row ${gapClass} ${className}`}>{ children }</div>
  );
}

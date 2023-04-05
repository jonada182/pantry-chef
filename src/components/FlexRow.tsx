import { gapSizes } from "../helpers";

type Props = {
  children?: React.ReactNode;
  className?: string;
  gap?: number;
};

export function FlexRow({ children, className = ``, gap = 0 }: Props) {
  const gapClass = gapSizes[gap];
  return (
    <div className={`flex flex-row ${gapClass} ${className}`}>{ children }</div>
  );
}

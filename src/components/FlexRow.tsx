type Props = {
  gapSize: number;
  children: string | JSX.Element | JSX.Element[];
};

export function FlexRow({ gapSize, children }: Props) {
  return (
    <div className={`flex flex-row gap-${gapSize}`}>{ children }</div>
  );
}

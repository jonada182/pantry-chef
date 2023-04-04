type Props = {
  gapSize?: number;
  children: string | JSX.Element | JSX.Element[];
};

export function FlexCol({ gapSize, children }: Props) {
  return (
    <div className={`flex flex-col gap-${gapSize}`}>{ children }</div>
  );
}

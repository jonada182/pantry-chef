type Props = {
  title: string;
};

export function PageHeading({ title }: Props) {
  return (
    <h3 className="text-2xl font-bold text-primary-text">
      {title}
    </h3>
  );
}

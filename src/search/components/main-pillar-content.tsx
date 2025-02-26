interface Props {
  title: string;
  description: string;
  items: React.ReactNode;
}

export const MainPillarContent = (props: Props) => {
  const { title, description, items } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      </div>
      <span className="text-sm lg:text-base">{description}</span>
      {items}
    </div>
  );
};

interface Props {
  children: React.ReactNode;
  list: React.ReactNode;
}

export const ListPageLayout = ({ children, list }: Props) => {
  return (
    <>
      <div className="w-full lg:w-1/2">
        <div className="flex flex-col gap-8 px-2 py-8 pt-24 md:px-8 md:pt-8">
          {list}
        </div>
      </div>

      {children}
    </>
  );
};

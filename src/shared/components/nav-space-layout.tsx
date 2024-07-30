interface Props {
  children: React.ReactNode;
}

export const NavSpaceLayout = ({ children }: Props) => {
  return <div className="min-h-screen w-full md:pl-[212px]">{children}</div>;
};

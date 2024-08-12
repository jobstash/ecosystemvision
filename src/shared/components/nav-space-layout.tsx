import { Nav } from '@/shared/components/nav';

interface Props {
  children: React.ReactNode;
}

export const NavLayout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <div className="min-h-screen w-full md:pl-[212px]">{children}</div>
    </>
  );
};

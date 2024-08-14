import { Nav } from '@/shared/components/nav';

interface Props {
  children: React.ReactNode;
}

export const NavLayout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <div className="min-h-screen w-full overflow-x-hidden lg:pl-[264px]">{children}</div>
    </>
  );
};

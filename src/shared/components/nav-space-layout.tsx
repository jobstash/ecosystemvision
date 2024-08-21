import { Nav } from '@/shared/components/nav';

interface Props {
  children: React.ReactNode;
}

export const NavLayout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <div className="min-h-screen lg:ml-[264px]">{children}</div>
    </>
  );
};

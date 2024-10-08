import { Nav } from '@/shared/components/nav';

interface Props {
  children: React.ReactNode;
}

export const NavLayout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <div className="relative min-h-screen w-full lg:ml-[264px] lg:max-w-[calc(100%-264px)]">
        {children}
      </div>
    </>
  );
};

import { Nav } from '@/shared/components/nav';

interface Props {
  children: React.ReactNode;
}

export const NavLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 hidden h-screen w-[236px] shrink-0 flex-col bg-[#070708] p-4 lg:flex">
        <Nav />
      </div>

      <div className="w-full lg:max-w-[calc(100vw-236px)] ">{children}</div>
    </div>
  );
};

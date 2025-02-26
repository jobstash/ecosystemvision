import { DesktopNav, MobileNav } from '@/shared/components/nav';

interface Props {
  children: React.ReactNode;
}

export const NavLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      <DesktopNav />
      <MobileNav />

      <div className="w-full lg:max-w-[calc(100vw-236px)] ">{children}</div>
    </div>
  );
};

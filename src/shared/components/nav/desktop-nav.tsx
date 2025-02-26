import { NavSections } from './sections';

export const DesktopNav = () => {
  return (
    <div className="sticky top-0 hidden h-screen w-[236px] shrink-0 flex-col bg-[#070708] px-4 lg:flex">
      <NavSections />
    </div>
  );
};

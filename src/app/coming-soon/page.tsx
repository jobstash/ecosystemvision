import { ComingSoonForm } from '@/app/coming-soon/coming-soon-form';
import { ComingSoonText } from '@/app/coming-soon/coming-soon-text';

const Page = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-2">
      <ComingSoonText />
      <div className="mt-4 flex max-w-sm flex-col items-center justify-center space-y-4">
        <h2 className="bg-gradient-to-r from-white to-[#D99073] bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
          Join our waitlist!
        </h2>
        <span className="max-w-xs pb-4 text-center text-xs text-white/60 md:max-w-sm md:text-base">
          Connect with Web3 leaders, get paid as a verified rep, and enjoy
          dynamic fees that match demand.
        </span>

        <ComingSoonForm />
      </div>
    </div>
  );
};
export default Page;

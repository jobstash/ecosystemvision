import Image from 'next/image';

import { ComingSoonText } from '@/app/coming-soon/coming-soon-text';

const Page = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-2">
      <Image
        priority
        src={'/rocket.png'}
        quality={100}
        alt={'Coming Soon'}
        width={371}
        height={371}
      />
      <ComingSoonText />
    </div>
  );
};
export default Page;

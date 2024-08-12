import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@nextui-org/react';

export const HomePage = () => {
  return (
    <div className="relative max-w-[1340px] overflow-hidden px-5 pt-12 text-white lg:px-7 lg:pt-20">
      <Image
        src={'/header-image.png'}
        alt={'Ecosystem.vision'}
        className="absolute right-0 top-0 z-0 w-[730px]"
        width={728}
        height={686}
      />
      <section className="relative z-10">
        <div>
          <h1 className="w-full text-32 font-medium leading-tight lg:w-1/2 lg:text-64">
            Unlock Earnings and Influence in Web3: Become a Verified
            Professional
          </h1>
          <div className="my-10 h-px bg-custom-mobile lg:bg-custom"></div>
          <h2 className="w-full pb-10 text-xl lg:w-2/3">
            Join our exclusive network to connect with industry leaders, earn
            money by being contacted as a verified representative, and stay
            ahead in the Web3 ecosystem. Dynamic contact fees ensure fair
            compensation based on demand.
          </h2>
        </div>
        <Button
          href={''}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-semibold text-black"
        >
          <span className="text-base font-medium">
            Join Now and Start Earning
          </span>
        </Button>
      </section>
      <section className="relative z-10 -ml-24 flex -rotate-[4deg] whitespace-nowrap py-12 text-2xl uppercase tracking-tight text-white/10 lg:text-5xl">
        ecosystem.vision • ecosystem.vision • ecosystem.vision •
        ecosystem.vision • ecosystem.vision • ecosystem.vision •
        ecosystem.vision • ecosystem.vision • ecosystem.vision •
        ecosystem.vision • Lev Kormych • Lev Kormych • Lev Kormych •
      </section>
      <section className="pt-10 lg:pt-20">
        <div className="-mx-5 flex lg:flex-wrap">
          <div className="basis-2/3 px-5 lg:w-1/4">
            <div className="rounded-20 bg-gradient-to-tl from-gradient-1/0 to-gradient-2/25 p-5">
              <Image
                src={'yolo'}
                alt={'yolo'}
                width={65}
                height={65}
                sizes="(max-width: 64px)"
              />
              <h3 className="font-medium">
                Earn and Connect as a Verified Professional
              </h3>
              <p className="">
                Monetize your expertise by being available for contact as a
                verified professional. Earn money and build trust as a
                representative of your organization, eliminating scammers and
                impostors.
              </p>
            </div>
          </div>
          <div className="basis-2/3 px-5 lg:w-1/4">
            <div className="rounded-20 bg-gradient-to-tl from-gradient-1/0 to-gradient-2/25 p-5">
              <Image
                src={'yolo'}
                alt={'yolo'}
                width={65}
                height={65}
                sizes="(max-width: 64px)"
              />
              <h3 className=" font-medium ">Gain Investor Insights</h3>
              <p>
                Discover where top investors are putting their money, explore
                similar ecosystems and verticals, and understand the funding
                stages of various organizations.
              </p>
            </div>
          </div>
          <div className="basis-2/3 px-5 lg:w-1/4">
            <div className="rounded-20 bg-gradient-to-tl from-gradient-1/0 to-gradient-2/25 p-5">
              <Image
                src={'yolo'}
                alt={'yolo'}
                width={65}
                height={65}
                sizes="(max-width: 64px)"
              />
              <h3 className=" font-medium ">Track Grant Program Impact</h3>
              <p>
                Analyze the impact of grant programs, including our
                collaboration with ThankArb, and identify new grant
                opportunities within the ecosystem.
              </p>
            </div>
          </div>
          <div className="basis-2/3 px-5 lg:w-1/4">
            <div className="rounded-20 bg-gradient-to-tl from-gradient-1/0 to-gradient-2/25 p-5">
              <Image
                src={'yolo'}
                alt={'yolo'}
                width={65}
                height={65}
                sizes="(max-width: 64px)"
              />
              <h3 className=" font-medium ">
                Access Comprehensive Ecosystem Data
              </h3>
              <p>
                Explore detailed data on projects and organizations within
                diverse crypto ecosystems and networks, enabling informed
                decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-20">
        <h2 className="pb-6 text-32 leading-tight">
          Connect, Earn, and Grow with Verified Web3 Professionals
        </h2>
        <p className="text-bae">
          Accelerate your projects and earn money by connecting with verified
          professionals in top Web3 companies. Dynamic pricing ensures fair
          compensation, while rigorous verification through GitHub activity or
          professional email guarantees a secure and scam-free environment.
        </p>
        <div className="aspect-square relative mt-16">
          <Image
            src={'/placeholder.png'}
            alt={'placeholder'}
            width={65}
            height={65}
            className="absolute inset-0 size-full object-cover object-center"
          />
        </div>
        <div className="my-10 h-px bg-custom-mobile lg:bg-custom"></div>
        <div>
          <div>
            <p>
              &ldquo;Connecting with verified professionals on this platform has
              significantly accelerated our project timelines. The transparency
              and ease of finding reliable contacts are unparalleled.&rdquo;
            </p>
          </div>
          <div>
            <p>
              &quot;The detailed grant impact analysis provided us with invaluable
              insights, helping us secure additional funding and drive our
              project forward.&rdquo;
            </p>
          </div>
          <div>
            <p>
              &quot; Identifying key investment opportunities and understanding the
              ecosystem landscape has never been easier. This platform is a
              must-have for any serious investor.&rdquo;
            </p>
          </div>
        </div>
        <Button
          as={Link}
          href={''}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-14 h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-semibold text-black"
        >
          <span className="text-base font-medium">
            Join Now and Start Earning
          </span>
        </Button>
        <div className="mt-20 h-px bg-custom-mobile lg:bg-custom"></div>
      </section>
      <section className="relative pt-20">
        
        <div className='relative z-10'>
          <h2 className="pb-6 text-32 font-medium leading-tight">
            Grant Impact Analysis: A Collaboration with Ecosystem Vision and the
            Cartographer Syndicates
          </h2>
          <p className="pb-12 text-base">
            Gain deep insights into the effectiveness of grant programs with our
            detailed metrics and analyses. Our collaboration with ThankArb,
            Ecosystem Vision, and the Cartographer Syndicate showcases how
            funding is driving real progress in the Web3 space.
          </p>
          <Button
            as={Link}
            href={''}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-semibold text-black"
          >
            <span className="text-base font-medium">Explore Grant Impact</span>
          </Button>
        </div>
        <div className="aspect-h-16 aspect-w-9 relative">
          <Image
            src={'/bg-image.jpg'}
            alt={'placeholder'}
            width={728}
            height={686}
            className='absolute inset-0 object-cover object-center'
          />
        </div>
      </section>
      <section className='relative z-10'>
        <h2 className="pb-6 text-32 font-medium leading-tight">
          Real Success Stories from Web3 Professionals
        </h2>
        <p className="pb-12 text-base">
          Read success stories of how our platform has helped users connect with
          verified professionals, access valuable data, and drive their projects
          forward.
        </p>
        <Button
          as={Link}
          href={''}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-semibold text-black"
        >
          <span className="text-base font-medium">
            Discover More Success Stories
          </span>
        </Button>
        <div className='w-[230px] rounded-xl border-t border-white bg-innovate p-5'>
          <h2 className="pb-6 text-base leading-tight">
            RuHow CryptoInnovate Connected with Top Talent
          </h2>
          <p className="text-xs text-white/75">
            CryptoInnovate used our platform to find and connect with verified
            developers and industry experts, resulting in a 30% increase in
            project efficiency and faster time-to-market.
          </p>
        </div>
      </section>
      <section>
        <h2 className="pb-6 text-32 font-medium leading-tight">
          Discover Leading Organizations in Web3
        </h2>
        <p className="pb-12 text-base">
          Gain access to detailed profiles of over 6,500 leading Web3
          organizations. Our data includes comprehensive company summaries,
          URLs, social media handles, documentation, grant information, and
          venture capital investments. Sort by recent funding, industry, and
          more to discover the perfect partners and opportunities.
        </p>
        <Button
          as={Link}
          href={''}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-semibold text-black"
        >
          <span className="text-base font-medium">Explore Organizations</span>
        </Button>
        <div className="aspect-h-16 aspect-w-9 relative">
          <Image
            src={'/space.jpg'}
            alt={'placeholder'}
            width={728}
            height={686}
            className='absolute inset-0 object-cover object-center'
          />
        </div>
      </section>
      <section>
        <h2 className="pb-6 text-32 font-medium leading-tight">Explore Top Grant Programs</h2>
        <p className="pb-12 text-base">
          Access detailed data on over 4,000 top Web3 projects, including
          insights into total value locked (TVL), financial metrics, network
          deployments, and ecosystem details. Utilize advanced sorting and
          filtering to identify high-impact projects and understand their
          significance within the Web3 landscape..
        </p>
        <Button
          as={Link}
          href={''}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-semibold text-black"
        >
          <span className="text-base font-medium">Discover Programs</span>
        </Button>
      </section>
    </div>
  );
};

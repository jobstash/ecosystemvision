import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@nextui-org/react';
import Spline from '@splinetool/react-spline';

import { FeatureSwiper } from '@/home/components/feature-swiper';
import { Footer } from '@/home/components/footer';
import { FlashIcon } from '@/home/components/icons/flash';
import { Marquee } from '@/home/components/marquee';
import { TestimonialSwiper } from '@/home/components/testimonial-swiper';

export const HomePage = () => {
  return (
    <div className="pt-[70px] font-inter-tight lg:pt-0">
      <main className="relative max-w-[1340px] px-5 pt-12 text-white md:px-10 lg:px-7 lg:pt-20">
        <div className="absolute right-0 top-0 z-0 size-[900px] -translate-y-1/2 translate-x-1/2  lg:-translate-y-1/3 lg:translate-x-1/3 ">
          <Spline
            scene="https://prod.spline.design/kO6h5vInhIdK643Y/scene.splinecode" 
            width={900}
            height={900}
          />
        </div>
        <section className="pointer-events-none relative z-10 ">
          <div>
            <h1 className="w-full font-grotesk text-32 font-medium leading-9 tracking-tighter antialiased md:w-9/12 md:text-48 md:leading-[57px] lg:w-1/2 lg:text-64 lg:leading-[76px]">
              Unlock Earnings and Influence in Web3: Become a Verified
              Professional
            </h1>
            <div className="my-10 h-px bg-custom"></div>
            <h2 className="w-full pb-12 text-base font-normal leading-5 md:w-10/12 	lg:w-2/3 lg:text-xl">
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
            className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-medium text-black"
          >
            <span className="text-base font-medium">
              Join Now and Start Earning
            </span>
          </Button>
        </section>
        <section className="relative z-10  -ml-20  flex rotate-[-4deg]  py-12 text-2xl uppercase tracking-tight text-white/10 md:pb-20 md:text-4xl lg:pb-12 lg:text-5xl">
          <Marquee />
        </section>

        <FeatureSwiper />

        <section className="pt-20 md:pt-32">
          <div className="flex flex-wrap lg:items-center">
            <div className="md:w-3/5 lg:w-2/5 lg:pr-24">
              <h2 className="pb-6 font-grotesk text-32 font-medium leading-10 tracking-tighter antialiased  md:text-40 md:leading-tight lg:text-48">
                Connect, Earn, and Grow with Verified Web3 Professionals
              </h2>
              <p className="text-base leading-5 lg:text-xl lg:leading-tight">
                Accelerate your projects and earn money by connecting with
                verified professionals in top Web3 companies. Dynamic pricing
                ensures fair compensation, while rigorous verification through
                GitHub activity or professional email guarantees a secure and
                scam-free environment.
              </p>
            </div>
            <div className="w-full lg:w-3/5">
              <div className="aspect-h-1 aspect-w-1 relative mt-16 lg:mt-0">
                <Image
                  src={'/placeholder.png'}
                  alt={'placeholder'}
                  width={749}
                  height={776}
                  className="absolute inset-0 size-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="my-10 h-px bg-custom-mobile md:my-14 lg:my-20 lg:bg-custom"></div>

          <TestimonialSwiper />

          <Button
            as={Link}
            href={''}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-6 h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-semibold text-black"
          >
            <span className="text-base font-medium">
              Join Now and Start Earning
            </span>
          </Button>
          <div className="mt-20 h-px bg-custom-mobile lg:bg-custom"></div>
        </section>
        <section className="relative pt-16 md:pt-20">
          <div className="relative z-10">
            <h2 className="pb-6 font-grotesk text-32 font-medium leading-10 tracking-tighter antialiased md:w-2/3 md:text-40 md:leading-tight lg:text-48">
              Grant Impact Analysis: A Collaboration with Ecosystem Vision and
              the Cartographer Syndicates
            </h2>
            <p className="pb-12 text-base leading-5 md:w-10/12 lg:w-2/3 lg:text-xl lg:leading-tight">
              Gain deep insights into the effectiveness of grant programs with
              our detailed metrics and analyses. Our collaboration with
              ThankArb, Ecosystem Vision, and the Cartographer Syndicate
              showcases how funding is driving real progress in the Web3 space.
            </p>
            <Button
              as={Link}
              href={''}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-medium text-black"
            >
              <span className="text-base font-medium">
                Explore Grant Impact
              </span>
            </Button>
          </div>
          <div className=" aspect-h-7 aspect-w-5 bottom-0 mt-12 md:aspect-h-5 lg:aspect-h-7 md:-mt-32 lg:ml-[-294px] lg:mt-[-700px] lg:w-screen">
            <Image
              src={'/bg-image.jpg'}
              alt={'placeholder'}
              width={1599}
              height={1521}
              className="absolute inset-0 object-cover object-bottom	"
            />
          </div>
        </section>
        <section className="relative z-10 pt-20 md:pt-40">
          <div className="flex flex-wrap">
            <div className="md:w-1/2">
              <h2 className="pb-6 font-grotesk text-32 font-medium leading-10 tracking-tighter antialiased md:text-40 md:leading-tight lg:text-48">
                Real Success Stories from Web3 Professionals
              </h2>
              <p className="pb-12 text-base leading-5 lg:text-xl lg:leading-tight">
                Read success stories of how our platform has helped users
                connect with verified professionals, access valuable data, and
                drive their projects forward.
              </p>
              <Button
                as={Link}
                href={''}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-medium text-black"
              >
                <span className="text-base font-medium">
                  Discover More Success Stories
                </span>
              </Button>
            </div>
            <div className="md:flex md:w-1/2 md:items-center md:justify-center">
              <div className="ml-5 mt-16 w-[240px] rotate-12 rounded-xl border-t border-white bg-innovate p-5 md:mt-0 lg:ml-0 lg:w-[400px] lg:p-8">
                <div className="mb-3 flex size-8 items-center justify-center rounded-md border-t bg-[#17171A] shadow-lg lg:mb-6 lg:size-14 [&>svg]:lg:size-10">
                  <FlashIcon />
                </div>
                <h2 className="pb-6 text-base  leading-tight text-[#EAEAEA] md:text-xl lg:text-27 lg:leading-tight">
                  RuHow CryptoInnovate Connected with Top Talent
                </h2>
                <p className="pb-4 text-xs text-white/75 md:text-14 lg:text-lg lg:leading-tight">
                  CryptoInnovate used our platform to find and connect with
                  verified developers and industry experts, resulting in a 30%
                  increase in project efficiency and faster time-to-market.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="pb-20 pt-28 md:pb-32 lg:flex lg:flex-wrap lg:items-start lg:pt-40">
          <div className="hidden lg:flex lg:w-1/3">
            <div className="aspect-h-1 aspect-w-1 relative w-full">
              <Image
                src={'/app.png'}
                alt={'app'}
                width={403}
                height={452}
                className="absolute inset-0 object-contain object-center"
              />
            </div>
          </div>
          <div className="lg:w-2/3 lg:px-14">
            <h2 className="pb-6 font-grotesk text-32 font-medium leading-10 tracking-tighter antialiased  md:text-40 md:leading-tight lg:text-48">
              Discover Leading Organizations in Web3
            </h2>
            <p className="pb-12 text-base leading-5 lg:text-xl lg:leading-tight">
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
              className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-medium text-black"
            >
              <span className="text-base font-medium">
                Explore Organizations
              </span>
            </Button>
          </div>
        </section>
        <section className="relative">
          <div className="aspect-h-5 aspect-w-4 relative mb-16 md:aspect-h-11 md:aspect-w-16 lg:ml-[-264px] lg:w-screen">
            <Image
              src={'/space.jpg'}
              alt={'placeholder'}
              width={1595}
              height={839}
              className="absolute inset-0 object-cover object-center"
            />
          </div>
          <div className="lg:lefft-0 lg:absolute lg:top-0 lg:w-1/3 lg:translate-y-1/2">
            <h2 className="pb-6  font-grotesk text-32 font-medium leading-10 tracking-tighter antialiased md:text-48 md:leading-tight lg:text-48">
              Explore Top Grant Programs
            </h2>
            <p className="pb-12 text-base leading-5 lg:text-xl lg:leading-tight">
              Access detailed data on over 4,000 top Web3 projects, including
              insights into total value locked (TVL), financial metrics, network
              deployments, and ecosystem details. Utilize advanced sorting and
              filtering to identify high-impact projects and understand their
              significance within the Web3 landscape@/home
            </p>
            <Button
              as={Link}
              href={''}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-medium text-black"
            >
              <span className="text-base font-medium">Discover Programs</span>
            </Button>
          </div>
        </section>
        <section>
          <h2 className="pb-6  font-grotesk text-32 font-medium leading-10 tracking-tighter antialiased md:text-48 md:leading-[57px]">
            Explore Top Grant Programs
          </h2>
          <p className="pb-12 text-base leading-5">
            Access detailed data on over 4,000 top Web3 projects, including
            insights into total value locked (TVL), financial metrics, network
            deployments, and ecosystem details. Utilize advanced sorting and
            filtering to identify high-impact projects and understand their
            significance within the Web3 landscape@/home
          </p>
          <Button
            as={Link}
            href={''}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto h-auto w-full max-w-[280px] bg-gradient-to-r from-white to-white/50 py-3 font-medium text-black"
          >
            <span className="text-base font-medium">Discover Programs</span>
          </Button>
        </section>
        <section className="relative my-32 text-center md:my-48">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={'/header-image.png'}
              alt={'Ecosystem.vision'}
              className="md:w-[450px]"
              width={224}
              height={209}
              priority
            />
          </div>
          <div className="relative z-10">
            <h2 className="mx-auto w-2/3 pb-3 font-grotesk text-2xl font-medium leading-8 tracking-tighter antialiased md:pb-6 md:text-48 md:leading-[57px]">
              Join Now and Start Earning
            </h2>
            <Button
              as={Link}
              href={''}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto h-auto w-full max-w-[140px] rounded bg-white py-1 font-medium text-black md:max-w-[280px] md:rounded-lg md:py-3"
            >
              <span className="text-[8px] font-medium md:text-base">
                Join Now and Start Earning
              </span>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

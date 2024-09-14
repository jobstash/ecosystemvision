// import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
// import React, { Suspense } from 'react';
import React from 'react';

import { Button } from '@nextui-org/react';

import { FeatureSwiper } from '@/home/components/feature-swiper';
import { Footer } from '@/home/components/footer';
import { FlashIcon } from '@/home/components/icons/flash';
import { Marquee } from '@/home/components/marquee';
import { TestimonialSwiper } from '@/home/components/testimonial-swiper';

// const Spline = dynamic(() => import('@splinetool/react-spline'), {
//   ssr: true,
//   loading: () => <p>Loading ...</p>,
// });

export const HomePage = () => {
  return (
    <div className="overflow-hidden pt-[70px] font-inter-tight lg:pt-0">
      <main className="relative max-w-[1340px] px-5 pt-12 text-white md:px-10 lg:px-7 lg:pt-20">
        {/* <div className="absolute right-0 top-0 z-0 size-[900px] -translate-y-1/2 translate-x-1/2  lg:translate-x-1/3 lg:translate-y-[-40%] ">
          <Suspense fallback={<div>Loading...</div>}>
            <Spline scene="https://prod.spline.design/kO6h5vInhIdK643Y/scene.splinecode" />
          </Suspense>
        </div> */}
        <section className="relative z-10 ">
          <div>
            <h1 className="w-full font-grotesk text-32 font-semibold leading-9 tracking-tight antialiased md:w-9/12 md:text-48 md:leading-[57px] lg:w-1/2 lg:text-64 lg:leading-[76px]">
              Ecosystem Vision: See the Crypto Universe Unfold
            </h1>
            <div className="my-10 h-px bg-custom"></div>
            <h2 className="w-full pb-12 text-base font-normal leading-6 md:w-10/12 lg:w-2/3 lg:text-xl">
              Discover insights. Uncover opportunities. Dive into data on over
              6,500 companies, thousands of projects, and hundreds of grant
              programs shaping the decentralized future.
            </h2>
          </div>
          <Button
            as={Link}
            href={'/explore'}
            className="mx-auto h-auto w-full max-w-[280px] bg-white py-3 font-medium text-black"
          >
            <span className="text-base font-medium">Start Your Journey</span>
          </Button>
        </section>

        {/* Marquee Section */}
        <section className="relative z-10 -ml-20 flex rotate-[-4deg] py-12 text-2xl uppercase tracking-tight text-white/10 md:pb-20 md:text-4xl lg:pb-12 lg:text-5xl">
          <Marquee />
        </section>

        {/* Features Section */}
        <FeatureSwiper />

        {/* Grant Impact Analysis */}
        <section className="pt-20 md:pt-32">
          <div className="flex flex-wrap lg:items-center">
            <div className="md:w-3/5 lg:w-2/5 lg:pr-24">
              <h2 className="pb-6 font-grotesk text-32 font-semibold leading-10 tracking-tight antialiased  md:text-40 md:leading-tight lg:text-48">
                See Grant Impact Like Never Before
              </h2>
              <p className="text-base leading-6 lg:text-xl lg:leading-tight">
                Gain unprecedented insights into grant programs with our
                detailed impact analysis. Explore how funding drives innovation
                in the crypto space through our collaboration with ThankArb and
                the Cartographer Syndicate.
              </p>
            </div>
            <div className="w-full lg:w-3/5">
              <div className="aspect-h-1 aspect-w-1 relative mt-16 lg:mt-0">
                <Image
                  src={'/placeholder.png'}
                  alt={'Grant Impact Analysis'}
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
            href={'/grants'}
            className="mx-auto mt-6 h-auto w-full max-w-[280px] bg-white py-3 font-semibold text-black"
          >
            <span className="text-base font-medium">Explore Grant Impact</span>
          </Button>
          <div className="mt-20 h-px bg-custom-mobile lg:bg-custom"></div>
        </section>

        {/* Projects Exploration */}
        <section className="relative pt-16 md:pt-20">
          <div className="relative z-10">
            <h2 className="pb-6 font-grotesk text-32 font-semibold leading-10 tracking-tight antialiased md:text-40 md:leading-tight lg:text-48">
              Discover Projects that Shape the Future
            </h2>
            <p className="pb-12 text-base leading-6 lg:text-xl lg:leading-tight">
              Navigate the ever-evolving world of crypto projects. Stay
              informed, find inspiration, and connect with the innovations
              redefining the decentralized landscape.
            </p>
            <Button
              as={Link}
              href={'/projects'}
              className="mx-auto h-auto w-full max-w-[280px] bg-white py-3 font-medium text-black"
            >
              <span className="text-base font-medium">Explore Projects</span>
            </Button>
          </div>
          <div className="aspect-h-5 aspect-w-5 bottom-0 mt-12 md:aspect-h-5 lg:aspect-h-7 lg:ml-[-294px] lg:w-screen">
            <Image
              src={'/bg-image.jpg'}
              alt={'placeholder'}
              width={1599}
              height={1521}
              className="absolute inset-0 object-cover object-bottom"
            />
          </div>
        </section>

        {/* Organizations Section */}
        <section className="relative pt-16 md:pt-20">
          <div className="flex flex-wrap lg:items-center">
            <div className="md:w-1/2">
              <h2 className="pb-6 font-grotesk text-32 font-semibold leading-10 tracking-tight antialiased md:text-40 md:leading-tight lg:text-48">
                Connect with Leading Organizations
              </h2>
              <p className="pb-12 text-base leading-6 lg:text-xl lg:leading-tight">
                Access comprehensive profiles of the top players in the crypto
                ecosystem. From startups to established entities, find the
                information that powers your next big move.
              </p>
              <Button
                as={Link}
                href={'/organizations'}
                className="mx-auto h-auto w-full max-w-[280px] bg-white py-3 font-medium text-black"
              >
                <span className="text-base font-medium">
                  Discover Organizations
                </span>
              </Button>
            </div>
            <div className="md:flex md:w-1/2 md:items-center md:justify-center">
              <div className="ml-5 mt-16 w-[240px] rotate-12 rounded-xl border-t border-white bg-innovate p-5 md:mt-0 lg:ml-0 lg:w-[400px] lg:p-8">
                <div className="mb-3 flex size-8 items-center justify-center rounded-md border-t bg-[#17171A] shadow-lg lg:mb-6 lg:size-14">
                  <FlashIcon />
                </div>
                <h2 className="pb-6 text-base leading-tight text-[#EAEAEA] md:text-xl lg:text-27 lg:leading-tight">
                  Spotlight: Innovators Making Waves
                </h2>
                <p className="pb-4 text-xs text-white/75 md:text-14 lg:text-lg lg:leading-tight">
                  Uncover stories of innovation. See how pioneers leverage our
                  data to ignite their ventures and stay ahead in the
                  decentralized revolution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Business Representatives Preannouncement */}
        <section className="relative z-10 pt-20 md:pt-40">
          <div className="flex flex-wrap lg:items-center">
            <div className="md:w-1/2">
              <h2 className="pb-6 font-grotesk text-32 font-semibold leading-10 tracking-tight antialiased md:text-40 md:leading-tight lg:text-48">
                Coming Soon: Verified Business Representatives
              </h2>
              <p className="pb-12 text-base leading-6 lg:text-xl lg:leading-tight">
                Ecosystem Vision will soon launch a platform where verified BD,
                DevRel and Marketing employees can connect, collaborate, and
                drive innovation in the Crypto space. Stay tuned for more
                details and be among the first to join.
              </p>
              <Button
                as={Link}
                href={'/coming-soon'}
                className="mx-auto h-auto w-full max-w-[280px] bg-white py-3 font-medium text-black"
              >
                <span className="text-base font-medium">Learn More</span>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-h-1 aspect-w-1 relative mt-16 md:mt-0">
                <Image
                  src={'/placeholder.png'}
                  alt={'Verified Representatives'}
                  width={749}
                  height={776}
                  className="absolute inset-0 size-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Venture Capital Insights Preannouncement */}
        <section className="relative pt-20 md:pt-32">
          <div className="flex flex-wrap lg:items-center">
            <div className="w-full md:w-3/5 lg:w-2/5">
              <h2 className="pb-6 font-grotesk text-32 font-semibold leading-10 tracking-tight antialiased md:text-40 md:leading-tight lg:text-48">
                Unveiling Soon: VC Fund Insights
              </h2>
              <p className="text-base leading-6 lg:text-xl lg:leading-tight">
                Ecosystem Vision will soon offer in-depth insights about venture
                capital funds in the crypto space. VCs can sign up now to gain
                early access and connect with promising projects and companies.
              </p>
              <Button
                as={Link}
                href={'/vc-signup'}
                className="mx-auto mt-6 h-auto w-full max-w-[280px] bg-white py-3 font-medium text-black"
              >
                <span className="text-base font-medium">Sign Up as a VC</span>
              </Button>
            </div>
            <div className="w-full md:w-2/5 lg:w-3/5">
              <div className="aspect-h-1 aspect-w-1 relative mt-16 lg:mt-0">
                <Image
                  src={'/placeholder.png'}
                  alt={'VC Insights'}
                  width={749}
                  height={776}
                  className="absolute inset-0 size-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="relative my-40 text-center md:my-64 lg:my-80">
          <div className="relative z-10">
            <h2 className="mx-auto w-2/3 pb-3 font-grotesk text-2xl font-semibold leading-8 tracking-tight antialiased md:pb-6 md:text-48 md:leading-[57px]">
              Add your organization or project to Ecosystem Vision
            </h2>
            <Button
              as={Link}
              href={'/coming-soon'}
              className="mx-auto h-auto w-full max-w-[140px] rounded bg-white py-1 font-medium text-black md:max-w-[280px] md:rounded-lg md:py-3"
            >
              <span className="text-[12px] font-medium md:text-base">
                Enter the Ecosystem
              </span>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

'use client';

import { AccessIcon } from '@/home/components/icons/access';
import { EarnIcon } from '@/home/components/icons/earn';
import { GainIcon } from '@/home/components/icons/gain';
import { TrackIcon } from '@/home/components/icons/track';
import { MySwiper, SwiperSlide } from '@/home/components/swiper';

export const FeatureSwiper = () => {
  return (
    <section className="lg:pt-20">
      <MySwiper spaceBetween={40}>
        <SwiperSlide>
          <div className="flex h-full grow flex-col gap-y-4 rounded-20 bg-gradient-to-tl from-gradient-1/0 to-gradient-2/25 p-5">
            <EarnIcon />
            <h3 className="text-base font-semibold">
              Earn and Connect as a Verified Professional
            </h3>
            <p className="text-base font-normal">
              Monetize your expertise by being available for contact as a
              verified professional. Earn money and build trust as a
              representative of your organization, eliminating scammers and
              impostors.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col gap-y-4 rounded-20 bg-gradient-to-tl from-gradient-1/0 to-gradient-2/25 p-5">
            <GainIcon />
            <h3 className="text-base font-semibold">Gain Investor Insights</h3>
            <p className="text-base font-normal">
              Discover where top investors are putting their money, explore
              similar ecosystems and verticals, and understand the funding
              stages of various organizations.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col gap-y-4 rounded-20 bg-gradient-to-tl from-gradient-1/0 to-gradient-2/25 p-5">
            <TrackIcon />
            <h3 className="text-base font-semibold">
              Track Grant Program Impact
            </h3>
            <p className="text-base font-normal">
              Analyze the impact of grant programs, including our collaboration
              with ThankArb, and identify new grant opportunities within the
              ecosystem.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col gap-y-4 rounded-20 bg-gradient-to-tl from-gradient-1/0 to-gradient-2/25 p-5">
            <AccessIcon />
            <h3 className="text-base font-semibold">
              Access Comprehensive Ecosystem Data
            </h3>
            <p className="text-base font-normal">
              Explore detailed data on projects and organizations within diverse
              crypto ecosystems and networks, enabling informed decision-making.
            </p>
          </div>
        </SwiperSlide>
      </MySwiper>
    </section>
  );
};

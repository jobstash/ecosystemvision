'use client';

import { Avatar } from '@nextui-org/react';

import { MySwiper, SwiperSlide } from '@/home/components/swiper';

export const TestimonialSwiper = () => {
  return (
    <div className="testimonial-swiper">
      <MySwiper spaceBetween={32} hasNavigation={true} hasPagination={true}>
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal">
              &ldquo;Connecting with verified professionals on this platform has
              significantly accelerated our project timelines. The transparency
              and ease of finding reliable contacts are unparalleled.&rdquo;
            </p>
            <Avatar
              showFallback
              src={'placeholder.png'}
              classNames={{
                base: 'h-14 w-14 mb-4',
                fallback: 'bg-red-500',
              }}
            />
            <div>
              <div className="text-base font-semibold leading-tight">
                John D.
              </div>
              <span className="text-13 font-thin text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal">
              &quot;The detailed grant impact analysis provided us with
              invaluable insights, helping us secure additional funding and
              drive our project forward.&rdquo;
            </p>
            <Avatar
              showFallback
              src={'placeholder.png'}
              classNames={{
                base: 'h-14 w-14 mb-4',
                fallback: 'bg-red-500',
              }}
            />
            <div>
              <div className="text-base font-semibold">John D.</div>
              <span className="text-13 font-thin text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal">
              &quot;The detailed grant impact analysis provided us with
              invaluable insights, helping us secure additional funding and
              drive our project forward.&rdquo;
            </p>
            <Avatar
              showFallback
              src={'placeholder.png'}
              classNames={{
                base: 'h-14 w-14 mb-4',
                fallback: 'bg-red-500',
              }}
            />
            <div>
              <div className="text-base font-semibold">John D.</div>
              <span className="text-13 font-thin text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal">
              Explore detailed data on projects and organizations within diverse
              crypto ecosystems and networks, enabling informed decision-making.
            </p>
            <Avatar
              showFallback
              src={'placeholder.png'}
              classNames={{
                base: 'h-14 w-14 mb-4',
                fallback: 'bg-red-500',
              }}
            />
            <div>
              <div className="text-base font-semibold">John D.</div>
              <span className="text-13 font-thin text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal">
              &ldquo;Connecting with verified professionals on this platform has
              significantly accelerated our project timelines. The transparency
              and ease of finding reliable contacts are unparalleled.&rdquo;
            </p>
            <Avatar
              showFallback
              src={'placeholder.png'}
              classNames={{
                base: 'h-14 w-14 mb-4',
                fallback: 'bg-red-500',
              }}
            />
            <div>
              <div className="text-base font-semibold">John D.</div>
              <span className="text-13 font-thin text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
      </MySwiper>
    </div>
  );
};

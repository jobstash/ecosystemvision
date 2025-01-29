'use client';

import { Avatar } from '@heroui/avatar';

import { MySwiper, SwiperSlide } from '@/home/components/swiper';

export const TestimonialSwiper = () => {
  const breakpoints = {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  };
  return (
    <div className="testimonial-swiper md:overflow-hidden">
      <MySwiper
        spaceBetween={32}
        hasNavigation={true}
        hasPagination={true}
        breakpoints={breakpoints}
      >
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal leading-5 lg:text-xl lg:leading-[26px]">
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
              <span className="text-13 text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal leading-5 lg:text-xl lg:leading-[26px]">
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
              <span className="text-13 text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal leading-5 lg:text-xl lg:leading-[26px]">
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
              <span className="text-13 text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal leading-5 lg:text-xl lg:leading-[26px]">
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
              <span className="text-13 text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full grow flex-col">
            <p className="grow pb-8 text-base font-normal leading-5 lg:text-xl lg:leading-[26px]">
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
              <span className="text-13 text-white/70">
                Project Lead at CryptoInnovate
              </span>
            </div>
          </div>
        </SwiperSlide>
      </MySwiper>
    </div>
  );
};

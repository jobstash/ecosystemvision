'use client';

import React from 'react';

import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';

interface MySwiperProps {
  children: React.ReactNode;
  spaceBetween?: number;
  hasNavigation?: boolean;
  hasPagination?: boolean;
  breakpoints?: {
    [width: number]: {
      slidesPerView: number;
    };
  };
}

export const MySwiper: React.FC<MySwiperProps> = ({
  children,
  spaceBetween = 20,
  hasNavigation = false,
  hasPagination = false,
  breakpoints,
}) => {
  return (
    <Swiper
      modules={[A11y, Keyboard, Navigation, Pagination]}
      keyboard={{ enabled: true, onlyInViewport: true }}
      spaceBetween={spaceBetween}
      slidesPerView={1.3}
      autoHeight={false}
      navigation={hasNavigation}
      pagination={hasPagination ? { clickable: true } : false}
      breakpoints={breakpoints}
    >
      {children}
    </Swiper>
  );
};

export { SwiperSlide } from 'swiper/react';

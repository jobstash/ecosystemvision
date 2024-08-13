'use client';

import React from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';

interface MySwiperProps {
  children: React.ReactNode;
  spaceBetween?: number;
  hasNavigation?: boolean;
  hasPagination?: boolean;
}

export const MySwiper: React.FC<MySwiperProps> = ({
  children,
  spaceBetween = 20,
  hasNavigation = false,
  hasPagination = false,
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={1.3}
      autoHeight={false}
      navigation={hasNavigation}
      pagination={hasPagination}
    >
      {children}
    </Swiper>
  );
};

export { SwiperSlide } from 'swiper/react';

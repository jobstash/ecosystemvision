import type { Meta, StoryObj } from '@storybook/react';

import { MySwiper, SwiperSlide } from './swiper';

const meta: Meta<typeof MySwiper> = {
  title: 'Home/Carousel',
  component: MySwiper,
  args: { hasNavigation: true, hasPagination: true },
  render: (args) => (
    <div className="mx-auto max-w-3xl p-6">
      <MySwiper {...args}>
        {['Organizations', 'Projects', 'Funds', 'People'].map((title) => (
          <SwiperSlide key={title}>
            <div className="min-h-48 rounded-xl bg-neutral-800 p-8 text-white">
              <h2>{title}</h2>
              <p>Synthetic carousel example.</p>
            </div>
          </SwiperSlide>
        ))}
      </MySwiper>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof MySwiper>;

export const Navigation: Story = {};

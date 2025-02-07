import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PopularMedium, CoupleMedium, TasteMedium } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import BalanceGameCategory from '@/components/mobile/atoms/BalanceGameCategory/BalanceGameCategory';

const meta = {
  title: 'mobile/atoms/BalanceGameCategory',
  component: BalanceGameCategory,
  parameters: {
    layout: 'centered',
  },

  args: {
    label: '인기',
    icon: <PopularMedium />,
  },
} satisfies Meta<typeof BalanceGameCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <BalanceGameCategory label="인기" icon={<PopularMedium />} />
        <BalanceGameCategory label="커플" icon={<CoupleMedium />} />
        <BalanceGameCategory label="취향" icon={<TasteMedium />} />
        <BalanceGameCategory label="기타" />
      </li>
    </ul>
  ),
};

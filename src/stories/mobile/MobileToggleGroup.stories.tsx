/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MobileToggleGroup from '@/components/mobile/atom/MobileToggleGroup/MobileToggleGroup';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'mobile/MobileToggleGroup',
  component: MobileToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    selectedValue: 'views',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof MobileToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

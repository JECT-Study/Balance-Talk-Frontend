import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PopularMedium, SampleFirst, SampleSecond } from '@/assets';
import { GameContent } from '@/types/game';
import BalanceGameCategorySection from '@/components/mobile/organisms/BalanceGameCategorySection/BalanceGameCategorySection';
import store from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

const bestGames: GameContent[] = [
  {
    id: 1,
    title: '게임 1',
    mainTag: '인기',
    subTag: '화제',
    images: [SampleFirst, SampleSecond],
    bookmarkState: true,
  },
  {
    id: 2,
    title: '게임2',
    mainTag: '인기',
    subTag: '화제',
    images: [SampleFirst, SampleSecond],
    bookmarkState: true,
  },
];

const meta = {
  title: 'mobile/organisms/BalanceGameCategorySection',
  component: BalanceGameCategorySection,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'object' },
    contents: { control: 'object' },
  },
  args: {
    label: '인기',
    icon: <PopularMedium />,
    contents: bestGames,
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ReactQueryProvider>
          <Router>
            <Story />
          </Router>
        </ReactQueryProvider>
      </Provider>
    ),
  ],
} satisfies Meta<typeof BalanceGameCategorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

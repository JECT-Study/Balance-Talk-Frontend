import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchGameListSection from '@/components/organisms/SearchGameListSection/SearchGameListSection';
import { SampleFirst, SampleSecond } from '@/assets';

const meta: Meta<typeof SearchGameListSection> = {
  title: 'organisms/SearchGameListSection',
  component: SearchGameListSection,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const gameListSample = Array.from({ length: 18 }, (_, index) => ({
  optionAImg: SampleFirst,
  optionBImg: SampleSecond,
  title: `게임 ${index + 1} - 유진 VS 민지 사복 고르기`,
  mainTag: '취향',
  subTag: '얼마나 맞나 보자',
}));

export const Default: Story = {
  args: {
    gameList: gameListSample.slice(0, 9),
    keyword: '예시 키워드',
    selectedPage: 1,
    totalPages: 2,
    sort: 'views',
    isLoading: false,
    onPageChange: (page) => console.log(`페이지 변경: ${page}`),
    onSortChange: (sort) => console.log(`정렬 변경: ${sort}`),
  },
};

export const All: Story = {
  render: (args) => {
    const [sort, setSort] = useState('views');

    const handleSortChange = (newSort: string) => {
      setSort(newSort);
      console.log(`정렬 변경: ${newSort}`);
    };

    return (
      <>
        <div style={{ marginBottom: '40px' }}>
          <h3>1페이지</h3>
          <SearchGameListSection
            {...args}
            gameList={gameListSample.slice(0, 9)}
            totalPages={2}
            selectedPage={1}
            sort={sort}
            isLoading={false}
            onSortChange={handleSortChange}
          />
        </div>
        <div>
          <h3>2페이지</h3>
          <SearchGameListSection
            {...args}
            gameList={gameListSample.slice(9, 18)}
            totalPages={2}
            selectedPage={2}
            sort={sort}
            isLoading={false}
            onSortChange={handleSortChange}
          />
        </div>
        <div>
          <h3>로딩중</h3>
          <SearchGameListSection
            {...args}
            gameList={gameListSample.slice(9, 18)}
            totalPages={2}
            selectedPage={2}
            sort={sort}
            isLoading
            onSortChange={handleSortChange}
          />
        </div>
      </>
    );
  },
};

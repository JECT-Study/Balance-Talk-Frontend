import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { SampleFirst, SampleSecond } from '@/assets';

const meta: Meta<typeof ContentsButton> = {
  title: 'molecules/ContentsButton',
  component: ContentsButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    imgUrl: { control: { type: 'object' } },
    label: { control: 'text' },
    tagLabels: { control: { type: 'object' } },
    bookmarkState: { control: 'boolean' },
    showBookmark: { control: 'boolean' },
  },
  args: {
    imgUrl: [SampleFirst, SampleSecond],
    label: '유진 VS 민지 사복 고르기',
    tagLabels: ['얼마나 맞나 보자', '#취향'],
    bookmarkState: false,
    showBookmark: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const itemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const headerStyle = css`
  margin-bottom: 20px;
`;

export const Default: Story = {
  args: {
    imgUrl: [SampleFirst, SampleSecond],
    label: '유진 VS 민지 사복 고르기',
    tagLabels: ['얼마나 맞나 보자', '#취향'],
    bookmarkState: false,
    showBookmark: true,
  },
};

export const All: Story = {
  render: (args) => (
    <div css={containerStyle}>
      <div css={itemStyle}>
        <h3 css={headerStyle}>기본</h3>
        <ContentsButton {...args} bookmarkState={false} showBookmark />
      </div>
      <div css={itemStyle}>
        <h3 css={headerStyle}>북마크 pressed</h3>
        <ContentsButton {...args} bookmarkState showBookmark />
      </div>
      <div css={itemStyle}>
        <h3 css={headerStyle}>북마크 없음</h3>
        <ContentsButton {...args} showBookmark={false} />
      </div>
    </div>
  ),
};

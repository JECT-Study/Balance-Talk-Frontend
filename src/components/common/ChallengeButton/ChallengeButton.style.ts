import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';
import type { ChallengeBtnProps } from './ChallengeButton';

export const loadingStyling = css`
  /* animation: ${loadingStyle} 2s infinite; */
`;

export const btnWrapper = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '38px',
  width: '100%',
  height: '112px',
  padding: '20px 24px',
  borderRadius: '16px',
  backgroundColor: color.Neutral[900],
  cursor: 'pointer',
});

export const highlightBtn = css({
  border: `1px solid ${color.Neutral[800]}`,
  boxShadow: `0 0 6px ${color.Primary[400]}`,
  ':hover': {
    border: `1px solid ${color.Primary[400]}`,
    boxShadow: `0 0 12px ${color.Primary[400]}`,
  },
  '.right-arrow': {
    fill: color.Primary[400],
  },
});

export const defaultBtn = css({
  border: `1px solid ${color.Neutral[800]}`,
  ':hover h4': {
    color: color.Neutral[50],
  },
  ':hover p': {
    color: color.Neutral[400],
  },
  '.right-arrow': {
    fill: color.Neutral[600],
  },
  ':hover .right-arrow': {
    fill: color.Neutral[400],
  },
});

export const textWrapper = css({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const titleStyling = ({
  highlight,
}: Pick<ChallengeBtnProps, 'highlight'>) =>
  css({
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '25.2px',
    color: highlight ? color.Primary[400] : color.Neutral[500],
  });

export const descriptionStyling = css(typo.Body.Medium_2, {
  color: color.Neutral[600],
});

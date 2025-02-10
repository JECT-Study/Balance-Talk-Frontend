import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const categoryButtonBaseStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '367px',
  height: '189px',
  padding: '40px 85px',
  borderRadius: '20px',
  border: '1px solid #dedede',
  backgroundColor: color.WT,
  boxShadow: '1px 1px 15px 0 rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in',
  '@media (max-width: 430px)': {
    width: '164px',
    height: '70px',
    padding: '5px 45px 14px 45px',
    borderRadius: '7px',
    border: '0.35px solid #dedede',
  },
});

export const imgWrap = css({
  flexShrink: 0,
});

export const labelStyle = css({
  ...typo.SubTitle,
  marginTop: 'auto',
  '@media (max-width: 430px)': {
    ...typo.Mobile.Text.Medium_8,
  },
  '@media (max-width: 320px)': {
    ...typo.Mobile.Text.Medium_7,
  },
});

import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const contentWrapStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '6px',
});

export const textStyle = css(typo.Mobile.Text.Bold_20, {
  color: color.MAIN,
});

import { css } from '@emotion/react';
import { rotate } from '@/styles/keyframes';

export const pageStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
});

export const spinnerRotateStyling = css({
  animation: `${rotate} 2s infinite linear`,
});

export const spinnerStyling = css({
  transform: 'scale(0.7)',
});

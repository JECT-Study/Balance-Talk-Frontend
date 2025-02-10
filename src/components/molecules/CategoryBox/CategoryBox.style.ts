import { css } from '@emotion/react';

export const categoryBoxStyling = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '21px',
  width: '100%',

  '& button': {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '562px',
  },

  '@media (max-width: 430px)': {
    gap: '6.6px',
    '& button': {
      flex: 'unset',
      width: '164px',
      height: '70px',
    },
  },

  '@media (max-width: 320px)': {
    gap: '6.6px',
    '& button': {
      width: '136.5px',
    },
  },
});

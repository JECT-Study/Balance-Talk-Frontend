import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const infoContainer = css({
  all: 'unset',
  display: 'flex',
  width: '904px',
  height: '61px',
  padding: '15px 40px',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  border: `1.5px solid ${color.GY[2]}`,
  borderRadius: '15px',
  backgroundColor: color.WT,
  boxSizing: 'border-box',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: `1px solid ${color.BK}`,
    outlineOffset: '1px',
  },
});

export const textContainer = css({
  display: 'flex',
  width: '546px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '-2px',
  alignSelf: 'stretch',
  marginRight: 'auto',
});

export const titleLabel = css({
  width: '100%',
  ...typo.Main.Medium_16,
  color: color.BK,
  margin: 0,
  textAlign: 'left',
});

export const bookmarkWrapper = css({
  marginLeft: 'auto',
});

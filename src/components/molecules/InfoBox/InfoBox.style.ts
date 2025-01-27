import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const infoContainer = css({
  all: 'unset',
  display: 'flex',
  width: '904px',
  height: '84px',
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

export const titleLabel = css(typo.Main.Medium_16, {
  width: '100%',
  color: color.BK,
  margin: '0',
  textAlign: 'left',
});

export const subtitleWrapper = css({
  display: 'flex',
  gap: '10px',
  width: '100%',
});

export const prefixLabel = css(typo.Comment.SemiBold_16, {
  color: color.GY[1],
});

export const subtitleLabel = css(typo.Comment.Regular_16, {
  color: color.GY[1],
});

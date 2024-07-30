import color from '@/styles/color';
import typo from '@/styles/typo';
import { css } from '@emotion/react';
import type { InputProps } from './Input';

export const inputContainerStyling = css({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
});

export const inputWrapperStyling = css({
  display: 'flex',
  gap: '14px',
  alignItems: 'center',
  paddingTop: 0,
  paddingBottom: 0,
  margin: '15px 0px',

  '&:focus-within': {
    outline: `1.5px solid ${color.MAIN}`,
  },

  '& svg': {
    width: '24px',
    height: '24px',
  },
});

export const getVariantStyling = (variant: Required<InputProps>['variant']) => {
  const style = {
    default: css({
      backgroundColor: 'transparent',
      outline: `1px solid ${color.GY[2]}`,
      borderRadius: '10px',
    }),
  };

  return style[variant as keyof typeof style];
};

export const getSizeStyling = (size: Required<InputProps>['size']) => {
  const style = {
    medium: css(typo.SubTitle, {
      padding: '21px 23px',
    }),
  };

  return style[size];
};

export const getInputStyling = css({
  width: '100%',
  paddingLeft: 0,
  paddingRight: 0,
  border: 'none',
  outline: 0,
  color: color.GY[1],

  '&::placeholder': {
    color: color.GY[1],
  },
});
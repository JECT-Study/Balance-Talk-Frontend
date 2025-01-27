import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import type { ContentsButtonProps } from './ContentsButton';

type SizeType = Required<ContentsButtonProps>['size'];

const sizeStyles = {
  large: {
    width: '563px',
    height: '357px',
    infoHeight: '107px',
    labelMaxWidth: '440px',
    imageHeight: '250px',
  },
  medium: {
    width: '432px',
    height: '354px',
    infoHeight: '104px',
    labelMaxWidth: '330px',
    imageHeight: '250px',
  },
  small: {
    width: '369px',
    height: '278px',
    infoHeight: '95px',
    labelMaxWidth: '315px',
    imageHeight: '183px',
  },
  extraSmall: {
    width: '162px',
    height: '121px',
    infoHeight: '40px',
    labelMaxWidth: '141px',
    imageHeight: '81px',
  },
};

export const cardWrapper = (size: SizeType) =>
  css({
    all: 'unset',
    width: sizeStyles[size].width,
    height: sizeStyles[size].height,
    borderRadius: '20px',
    border: `1px solid ${color.GY[2]}`,
    backgroundColor: color.WT,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.2s, background-color 0.2s, box-shadow 0.2s',
    ':active': {
      backgroundColor: color.WT,
      boxShadow: '0 5px 15px 0 rgba(119, 130, 255, 0.7)',
      '& > div > div > img': {
        transform: 'scale(0.98)',
      },
    },
    ':hover': {
      border: `1px solid ${color.MAIN}`,
      '& > div > div > img': {
        transform: 'scale(1.05)',
      },
    },
    '@media (max-width: 430px)': {
      borderRadius: '10px',
    },
    ':focus-visible': {
      outline: `1px solid ${color.BK}`,
      outlineOffset: '1px',
    },
  });

export const imageContainer = (size: SizeType) =>
  css({
    display: 'flex',
    width: '100%',
    height: sizeStyles[size].imageHeight,
    overflow: 'hidden',
  });

export const imageWrapper = css({
  flex: 1,
  overflow: 'hidden',
  position: 'relative',
  border: `none`,
});

export const image = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'transform 0.2s ease-in-out',
  border: `none`,
});

export const chipsContainer = css({
  position: 'absolute',
  top: '10px',
  left: '10px',
  display: 'flex',
  gap: '10px',
});

export const infoContainer = (size: SizeType) =>
  css({
    width: '100%',
    height: sizeStyles[size].infoHeight,
    padding: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    '@media (max-width: 430px)': {
      padding: '10px',
    },
  });

export const label = (size: SizeType, highlighted?: boolean) =>
  css(typo.Component.Medium, {
    color: highlighted ? color.MAIN : color.BK,
    maxWidth: sizeStyles[size].labelMaxWidth,
    '@media (max-width: 430px)': typo.Mobile.Text.SemiBold_10,
  });

export const bookmarkWrapper = css({
  marginLeft: 'auto',
});

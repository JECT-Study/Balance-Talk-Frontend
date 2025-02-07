import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import type { MoreButtonProps } from './MoreButton';

export const moreButtonStyling = (icon: Required<MoreButtonProps>['icon']) =>
  css({
    ...typo.Main.Medium,
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    color: icon === 'plus' ? color.GY[1] : color.MAIN,
    cursor: 'pointer',
    '@media (max-width: 430px)': {
      ...typo.Mobile.Text.SemiBold_14,
    },
  });

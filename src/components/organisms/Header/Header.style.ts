import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const containerStyle = css({
  width: '100%',
  padding: '0 200px',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: color.WT,
  boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  '@media (max-width: 430px)': {
    padding: '0 20px',
    height: '55px',
  },
});

export const logoStyle = css({
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 430px)': {
    flex: 1,
  },
});

export const LoginButtonStyle = css({
  ...typo.Main.SemiBold,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: color.GY[1],
  width: '100.24px',
  height: '32.92px',
  marginRight: '7.76px',
});

export const rightContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 430px)': {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export const notificationStyle = css({
  marginLeft: '42.93px',
});

export const listButtonStyle = css({
  cursor: 'pointer',
});

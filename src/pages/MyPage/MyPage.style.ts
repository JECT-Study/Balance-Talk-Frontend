import { css } from '@emotion/react';
import color from '@/styles/color';

export const pageContainer = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  padding: '60px 0 20px 0',
  backgroundColor: color.WT,
  overflow: 'hidden',
  marginTop: '100px',
  justifyContent: 'center',
});

export const contentWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '904px',
  marginLeft: '20px',
});

export const contentList = css({
  marginTop: '15px',
  backgroundColor: color.WT,
  overflowY: 'auto',
  position: 'relative',
});

export const loader = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  color: color.BK,
  marginTop: '10px',
});

export const toastModalStyle = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',

  '@media (max-width: 430px)': {
    top: '65px',
  },
});

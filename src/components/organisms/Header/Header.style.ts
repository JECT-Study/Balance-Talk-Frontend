import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const containerStyle = css`
  width: 100%;
  padding: 0 200px;
  height: 100px;
  @media (max-width: 430px) {
    padding: 0 20px;
    height: 55px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${color.WT};
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const logoStyle = css`
  display: flex;
  align-items: center;
  @media (max-width: 430px) {
    flex: 1;
    justify-content: center;
  }
`;

export const LoginButtonStyle = css`
  ${typo.Main.SemiBold};
  background: none;
  border: none;
  cursor: pointer;
  color: ${color.GY[1]};
  width: 100.24px;
  height: 32.92px;
  margin-right: 7.76px;
`;

export const rightContainerStyle = css`
  display: flex;
  align-items: center;
  @media screen and (max-width: 430px) {
    flex: 1;
    justify-content: flex-end;
  }
`;

export const notificationStyle = css`
  margin-left: 42.93px;
`;

export const listButtonStyle = css`
  cursor: pointer;
`;

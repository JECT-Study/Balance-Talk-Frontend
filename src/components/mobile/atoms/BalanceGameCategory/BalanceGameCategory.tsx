import React from 'react';
import * as S from './BalanceGameCategory.style';

interface BalanceGameCategoryProps {
  label: string;
  icon?: React.ReactNode;
}

const BalanceGameCategory = ({ label, icon }: BalanceGameCategoryProps) => {
  return (
    <div css={S.contentWrapStyle}>
      <span>{icon}</span>
      <p css={S.textStyle}>{label}</p>
    </div>
  );
};

export default BalanceGameCategory;

import React from 'react';
import { Spinner } from '@/assets';
import * as S from './LoadingPage.style';

const LoadingPage = () => {
  return (
    <div css={S.pageStyling}>
      <div css={S.spinnerRotateStyling}>
        <Spinner css={S.spinnerStyling} />
      </div>
    </div>
  );
};

export default LoadingPage;

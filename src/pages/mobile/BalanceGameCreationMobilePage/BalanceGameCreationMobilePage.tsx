import React from 'react';
import { useLocation } from 'react-router-dom';
import { GameSet } from '@/types/game';
import BalanceGameCreateSection from '@/components/mobile/organisms/BalanceGameCreateSection/BalanceGameCreateSection';
import * as S from './BalanceGameCreationMobilePage.style';

interface State {
  game: GameSet;
  gameSetId: number;
}

const BalanceGameCreationMobilePage = () => {
  const location = useLocation();
  const state = location.state as State;

  const balanceGameData = state?.game;
  const balanceGameSetId = state?.gameSetId;

  return (
    <div css={S.pageStyle}>
      <BalanceGameCreateSection
        existingGame={balanceGameData}
        gameSetId={balanceGameSetId}
      />
    </div>
  );
};

export default BalanceGameCreationMobilePage;

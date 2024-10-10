import React, { useState } from 'react';
import { GameOption } from '@/types/game';
import { getRandomNumber } from '@/utils/calculator';
import BalanceGameButton from '@/components/atoms/BalanceGameButton/BalanceGameButton';
import { useCreateGameVoteMutation } from '@/hooks/api/vote/useCreateGameVoteMutation';
import { useEditGameVoteMutation } from '@/hooks/api/vote/useEditGameVoteMutation';
import { useDeleteGameVoteMutation } from '@/hooks/api/vote/useDeleteGameVoteMutation';
import * as S from './BalanceGameBox.style';

export interface BalanceGameBoxProps {
  gameId: number;
  options?: GameOption[];
  selectedVote: 'A' | 'B' | null;
}

const BalanceGameBox = ({
  gameId,
  options,
  selectedVote,
}: BalanceGameBoxProps) => {
  const optionA = options?.[0];
  const optionB = options?.[1];

  const getRandomImages = () => {
    const randomImageA = S.gameBgArray[getRandomNumber(S.gameBgArray.length)];
    const randomImageB = S.gameBgArray[getRandomNumber(S.gameBgArray.length)];

    return [randomImageA, randomImageB];
  };

  const [backgroundImages] = useState<string[]>(getRandomImages);
  const [backgroundImageA, backgroundImageB] = backgroundImages;

  const { mutate: createGameVote } = useCreateGameVoteMutation(gameId);
  const { mutate: editGameVote } = useEditGameVoteMutation(gameId);
  const { mutate: deleteGameVote } = useDeleteGameVoteMutation(gameId);

  const handleGameVote = (
    selectedOption: 'A' | 'B' | null,
    voteOption: 'A' | 'B',
  ) => {
    if (!selectedOption) {
      createGameVote(voteOption);
    } else if (selectedOption === voteOption) {
      deleteGameVote();
    } else {
      editGameVote(voteOption);
    }
  };

  const handleButtonClick = (voteOption: 'A' | 'B') => {
    handleGameVote(selectedVote, voteOption);
  };

  return (
    <div css={[S.containerStyle, S.getOutlineStyle(selectedVote ?? null)]}>
      <BalanceGameButton
        name={optionA?.name ?? ''}
        imgUrl={optionA?.imgUrl ?? null}
        description={optionA?.description ?? ''}
        optionType={optionA?.optionType ?? 'A'}
        selectedButton={selectedVote ?? null}
        randomImage={backgroundImageA}
        onClick={() => {
          handleButtonClick('A');
        }}
      />
      {!selectedVote && <div css={S.letterStyle}>VS</div>}
      <BalanceGameButton
        name={optionB?.name ?? ''}
        imgUrl={optionB?.imgUrl ?? null}
        description={optionB?.description ?? ''}
        optionType={optionB?.optionType ?? 'B'}
        selectedButton={selectedVote ?? null}
        randomImage={backgroundImageB}
        onClick={() => {
          handleButtonClick('B');
        }}
      />
    </div>
  );
};

export default BalanceGameBox;

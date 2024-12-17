/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { MobileBookmarkDF, MobileBookmarkPR, MobileShare } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { GameDetail, GameSet } from '@/types/game';
import { ERROR } from '@/constants/message';
import { PATH } from '@/constants/path';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import useToastModal from '@/hooks/modal/useToastModal';
import { MyVoteOption, VoteOption, VoteRecord } from '@/types/vote';
import Button from '@/components/mobile//atoms/Button/Button';
import IconButton from '@/components/mobile//atoms/IconButton/IconButton';
import GameTag from '@/components/mobile//atoms/GameTag/GameTag';
import GameTagChip from '@/components/mobile//atoms/GameTagChip/GameTagChip';
import GameStageLabel from '@/components/mobile//atoms/GameStageLabel/GameStageLabel';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import BalanceGameBox from '@/components/mobile/molecules/BalanceGameBox/BalanceGameBox';
import { useCreateGameBookmarkMutation } from '@/hooks/api/bookmark/useCreateGameBookmarkMutation';
import { useDeleteGameBookmarkMutation } from '@/hooks/api/bookmark/useDeleteGameBookmarkMutation';
import * as S from './BalanceGameSection.style';
import ShareModal from '../../molecules/ShareModal/ShareModal';

export interface BalanceGameSectionProps {
  gameSetId: number;
  game?: GameSet;
  isMyGame?: boolean;
  currentStage: number;
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
  handleNextGame: () => void;
  handlePrevGame: () => void;
}

const gameDefaultDetail: GameDetail[] = Array.from({ length: 10 }, () => ({
  id: 0,
  title: '',
  description: '',
  gameOptions: [],
  votesCountOfOptionA: 0,
  votesCountOfOptionB: 0,
  myBookmark: false,
  votedOption: null,
}));

const BalanceGameSection = ({
  gameSetId,
  game,
  isMyGame,
  currentStage,
  setCurrentStage,
  handleNextGame,
  handlePrevGame,
}: BalanceGameSectionProps) => {
  const initialRender = useRef(true);
  const navigate = useNavigate();

  const gameStages: GameDetail[] =
    game?.gameDetailResponses ?? gameDefaultDetail;
  const isGuest = !localStorage.getItem('accessToken');

  const [guestVotedList, setGuestVotedList] = useState<VoteRecord[]>([]);

  useEffect(() => {
    const updateGuestVotedList = () => {
      const storedVotes = localStorage.getItem(`game_${gameSetId}`);
      setGuestVotedList(
        storedVotes ? (JSON.parse(storedVotes) as VoteRecord[]) : [],
      );
    };

    updateGuestVotedList();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `game_${gameSetId}`) {
        updateGuestVotedList();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    updateGuestVotedList();
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [gameSetId]);

  const handleGuestGameVote = (
    selectedOption: MyVoteOption,
    voteOption: VoteOption,
  ) => {
    const updatedVotes = [...guestVotedList];
    const currentVoteIndex = updatedVotes.findIndex(
      (vote) => vote.gameId === game?.gameDetailResponses[currentStage]?.id,
    );

    if (!selectedOption) {
      updatedVotes.push({
        gameId: game?.gameDetailResponses[currentStage]?.id as number,
        votedOption: voteOption,
      });
    } else if (selectedOption === voteOption) {
      updatedVotes.splice(currentVoteIndex, 1);
    } else {
      updatedVotes[currentVoteIndex].votedOption = voteOption;
    }

    setGuestVotedList(updatedVotes);
    localStorage.setItem(`game_${gameSetId}`, JSON.stringify(updatedVotes));
  };

  const currentGame: GameDetail = gameStages[currentStage];

  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const { isVisible, modalText, showToastModal } = useToastModal();

  useEffect(() => {
    if (game && initialRender.current) {
      const bookmarkedIndex = gameStages.findIndex(
        (gameDetail) => gameDetail.myBookmark,
      );

      if (bookmarkedIndex !== -1) {
        setCurrentStage(bookmarkedIndex);
      }
      initialRender.current = false;
    }
  }, [game, gameStages, setCurrentStage]);

  const handleNextButton = () => {
    if (
      (isGuest && !guestVotedList[currentStage]?.votedOption) ||
      (!isGuest && !currentGame.votedOption)
    )
      return;
    handleNextGame();
  };

  const handleNextStage = () => {
    setCurrentStage((stage) => stage + 1);
  };

  const { mutate: createBookmark } = useCreateGameBookmarkMutation(
    gameSetId,
    currentGame.id,
  );

  const { mutate: deleteBookmark } = useDeleteGameBookmarkMutation(
    gameSetId,
    currentGame.id,
  );

  const handleBookmarkClick = () => {
    if (!game) return;

    if (isGuest) {
      navigate(`/${PATH.LOGIN}`);
      return;
    }

    if (isMyGame) {
      showToastModal(ERROR.BOOKMARK.MY_GAME);
      return;
    }

    if (currentGame.myBookmark) {
      deleteBookmark();
    } else {
      createBookmark();
    }
  };

  const myGameItem: MenuItem[] = [{ label: '수정' }, { label: '삭제' }];
  const otherGameItem: MenuItem[] = [{ label: '신고' }];

  return (
    <div css={S.balanceGameStyling}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <div css={S.centerStyling}>
        <ShareModal
          isOpen={shareModalOpen}
          onConfirm={() => {}}
          onClose={() => setShareModalOpen(false)}
        />
      </div>
      <div css={S.balancGameTopWrapper}>
        <GameTag tag="커플" />
        <div css={S.iconButtonWrapper}>
          <IconButton
            icon={<MobileShare />}
            onClick={() => setShareModalOpen(true)}
          />
          <IconButton
            icon={
              currentGame.myBookmark ? (
                <MobileBookmarkPR />
              ) : (
                <MobileBookmarkDF />
              )
            }
            onClick={handleBookmarkClick}
          />
        </div>
      </div>

      {/* 스크롤 영역 */}
      <div css={S.balanceGameScrollStyling}>
        {/* 연보라배경 */}
        <div css={S.balanceGameSectionStyling}>
          <div css={S.stageWrapper}>
            <div css={S.stageStyling}>
              <GameStageLabel color="main" stage={currentStage} />
            </div>
            <div css={S.menuStyling}>
              <MenuTap menuData={isMyGame ? myGameItem : otherGameItem} />
            </div>
          </div>
          <div css={S.titleStyling}>{game?.title}</div>
          <div css={S.descriptionStyling}>{currentGame.description}</div>
          <BalanceGameBox
            gameSetId={gameSetId}
            gameId={currentGame.id}
            options={currentGame.gameOptions}
            selectedVote={
              isGuest
                ? guestVotedList[currentStage]?.votedOption
                : currentGame.votedOption
            }
            handleNextStage={handleNextStage}
            handleGuestGameVote={handleGuestGameVote}
          />
        </div>

        <div css={S.subTagWrapper}>
          <GameTagChip tag={game?.subTag ?? ''} />
        </div>
      </div>

      <div css={S.stageButtonWrapper}>
        <Button
          variant="primary"
          size="medium"
          css={S.getButtonVisibility(currentStage)}
          onClick={handlePrevGame}
        >
          이전
        </Button>
        <Button
          variant="primary"
          size="medium"
          active={
            isGuest
              ? guestVotedList[currentStage]?.votedOption !== null
              : currentGame.votedOption !== null
          }
          onClick={handleNextButton}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default BalanceGameSection;

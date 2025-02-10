import React, { useState } from 'react';
import {
  GameEnding,
  MobileBookmarkDF,
  MobileBookmarkPR,
  MobileShare,
} from '@/assets';
import { PATH } from '@/constants/path';
import { useNavigate } from 'react-router-dom';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useGameEndBookmark } from '@/hooks/game/useBalanceGameBookmark';
import useToastModal from '@/hooks/modal/useToastModal';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import InteractionButton from '../../atoms/InteractionButton/InteractionButton';
import Button from '../../atoms/Button/Button';
import ShareModal from '../../molecules/ShareModal/ShareModal';
import * as S from './BalanceGameEndingSection.style';

export interface BalanceGameEndingSectionProps {
  title: string;
  gameSetId: number;
  isMyGame: boolean;
  isMyEndBookmark: boolean;
}

const BalanceGameEndingSection = ({
  title,
  gameSetId,
  isMyGame,
  isMyEndBookmark,
}: BalanceGameEndingSectionProps) => {
  const navigate = useNavigate();
  const isGuest = !useNewSelector(selectAccessToken);

  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const { handleEndBookmarkClick } = useGameEndBookmark(
    isGuest,
    isMyGame,
    isMyEndBookmark,
    gameSetId,
    showToastModal,
  );

  return (
    <div css={S.balanceGameEndingStyling}>
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
      <div css={S.titleStyling}>{title}</div>
      <div css={S.checkIconWrapper}>
        <img src={GameEnding} alt="BalanceGame Ending" />
      </div>
      <div css={S.buttonWrapper}>
        <InteractionButton
          buttonLabel="다른 사람들은 어떤 선택을 할까?"
          icon={<MobileShare />}
          iconLabel="공유하기"
          onClick={() => setShareModalOpen(true)}
        />
        <InteractionButton
          buttonLabel="이 게임 제법 폼이 좋아?"
          icon={isMyEndBookmark ? <MobileBookmarkPR /> : <MobileBookmarkDF />}
          iconLabel="저장하기"
          onClick={() =>
            handleEndBookmarkClick(() => navigate(`/${PATH.LOGIN}`))
          }
        />
      </div>
      <div css={S.buttonStyling}>
        <Button variant="primary" size="large">
          더 많은 밸런스게임 하기
        </Button>
      </div>
    </div>
  );
};

export default BalanceGameEndingSection;

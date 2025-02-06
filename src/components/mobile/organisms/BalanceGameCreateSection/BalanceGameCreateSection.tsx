import React, { useState } from 'react';
import { BUTTON_TEXT, MAX_STAGE } from '@/constants/game';
import { GameSet } from '@/types/game';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import Button from '@/components/mobile/atoms/Button/Button';
import GameStageLabel from '@/components/mobile/atoms/GameStageLabel/GameStageLabel';
import DraftSaveButton from '@/components/mobile/atoms/DraftSaveButton/DraftSaveButton';
import TitleDescriptionField from '@/components/mobile/atoms/TitleDescriptionField/TitleDescriptionField';
import TextModal from '@/components/mobile/molecules/TextModal/TextModal';
import OptionCard from '@/components/mobile/molecules/OptionCard/OptionCard';
import GameTagModal from '@/components/mobile/molecules/GameTagModal/GameTagModal';
import TempGameModal from '@/components/mobile/molecules/TempGameModal/TempGameModal';
import { usePostBalanceGameForm } from '@/hooks/game/usePostBalanceGameForm';
import * as S from './BalanceGameCreateSection.style';

interface BalanceGameCreateSectionProps {
  existingGame?: GameSet;
}

const BalanceGameCreateSection = ({
  existingGame,
}: BalanceGameCreateSectionProps) => {
  const [gameStage, setGameStage] = useState<number>(0);

  const [tagModalOpen, setTagModalOpen] = useState<boolean>(false);
  const [tempModalOpen, setTempModalOpen] = useState<boolean>(false);

  const [imgDeleteModalOpen, setImgDeleteModalOpen] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<number>(0);

  const {
    form,
    onChange,
    setEach,
    isVisible,
    modalText,
    handleImgChange,
    handleDeleteImg,
    handlePrevGame,
    handleNextGame,
    handleBalanceGame,
    handleTempBalanceGame,
    handleDraftButton,
  } = usePostBalanceGameForm(
    gameStage,
    setGameStage,
    setTagModalOpen,
    existingGame,
  );

  return (
    <form css={S.balanceGameStyling}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal bgColor="black">{modalText}</ToastModal>
        </div>
      )}
      <div css={S.centerStyling}>
        {tagModalOpen && (
          <GameTagModal
            form={form}
            isOpen={tagModalOpen}
            onClose={() => setTagModalOpen(false)}
            setMainTagValue={setEach}
            setSubTagValue={onChange}
            submitGame={handleBalanceGame}
          />
        )}
        {tempModalOpen && (
          <TempGameModal
            isOpen={tempModalOpen}
            onClose={() => {
              setTempModalOpen(false);
            }}
            onGetGame={() => {
              handleDraftButton();
              setTempModalOpen(false);
            }}
            onSaveGame={() => {
              handleTempBalanceGame();
              setTempModalOpen(false);
            }}
          />
        )}
        {imgDeleteModalOpen && (
          <TextModal
            text="이미지를 삭제하시겠습니까?"
            isOpen={imgDeleteModalOpen}
            onClose={() => {
              setImgDeleteModalOpen(false);
            }}
            onConfirm={() => {
              handleDeleteImg(
                form.games[gameStage].gameOptions[selectedOptionId].fileId ??
                  null,
                selectedOptionId,
              );
              setImgDeleteModalOpen(false);
            }}
          />
        )}
      </div>
      <div css={S.balanceGameTopWrapper}>
        <div css={S.balanceGameTextWrapper}>
          <p css={S.balanceGameTextStyle}>밸런스게임 작성하기</p>
          <GameStageLabel stage={gameStage} />
        </div>
        <DraftSaveButton
          onClick={() => {
            setTempModalOpen(true);
          }}
        />
      </div>
      <TitleDescriptionField
        titleProps={{
          name: 'title',
          value: form.title,
          onChange: (e) => onChange(e),
        }}
        subTitleProps={{
          name: 'description',
          value: form.games[gameStage].description,
          onChange: (e) => onChange(e, gameStage, -1),
        }}
      />
      <div css={S.cardButtonWrapper}>
        <div css={S.cardTextWrapper}>
          <span css={S.cardTextStyle}>선택지 입력</span>
          <span css={S.cardTextSubStyle}>(필수)</span>
        </div>
        <OptionCard
          type="A"
          nameProps={{
            name: 'name',
            value: form.games[gameStage].gameOptions[0].name,
            onChange: (e) => onChange(e, gameStage, 0),
          }}
          descriptionProps={{
            name: 'description',
            value: form.games[gameStage].gameOptions[0].description,
            onChange: (e) => onChange(e, gameStage, 0),
          }}
          imgUrl={form.games[gameStage].gameOptions[0].imgUrl}
          handleImgChange={handleImgChange}
          handleDeleteImg={() => {
            setSelectedOptionId(0);
            setImgDeleteModalOpen(true);
          }}
        />
        <OptionCard
          type="B"
          nameProps={{
            name: 'name',
            value: form.games[gameStage].gameOptions[1].name,
            onChange: (e) => onChange(e, gameStage, 1),
          }}
          descriptionProps={{
            name: 'description',
            value: form.games[gameStage].gameOptions[1].description,
            onChange: (e) => onChange(e, gameStage, 1),
          }}
          imgUrl={form.games[gameStage].gameOptions[1].imgUrl}
          handleImgChange={handleImgChange}
          handleDeleteImg={() => {
            setSelectedOptionId(1);
            setImgDeleteModalOpen(true);
          }}
        />
        <div css={S.buttonWrapper}>
          <Button
            variant="primary"
            size="medium"
            css={S.getButtonVisibility(gameStage)}
            onClick={handlePrevGame}
          >
            {BUTTON_TEXT.PREVIOUS}
          </Button>
          <Button variant="primary" size="medium" onClick={handleNextGame}>
            {gameStage === MAX_STAGE ? BUTTON_TEXT.COMPLETE : BUTTON_TEXT.NEXT}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BalanceGameCreateSection;

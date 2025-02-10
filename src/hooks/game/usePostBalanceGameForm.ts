import { PATH } from '@/constants/path';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BalanceGame, GameSet, TempGame } from '@/types/game';
import {
  createInitialGameStages,
  transformBalanceGameToTempGame,
  transformGameSetToBalanceGameSet,
  transformTempGameToBalanceGame,
} from '@/utils/balanceGameUtils';
import { SUCCESS } from '@/constants/message';
import useGameInputs from '@/hooks/game/useGameInputs';
import useToastModal from '@/hooks/modal/useToastModal';
import { useCreateGameMutation } from '@/hooks/api/game/useCreateGameMutation';
import { useLoadTempGameQuery } from '@/hooks/api/game/useLoadTempGameQuery';
import { useSaveTempGameMutation } from '@/hooks/api/game/useSaveTempGameMutation';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import { useDeleteFileMutation } from '@/hooks/api/file/useDeleteFileMutation';
import {
  validateBalanceGameForm,
  validateGameTag,
} from './validateBalanceGameForm';
import { useEditGamesMutation } from '../api/game/useEditGamesMutation';

export const usePostBalanceGameForm = (
  gameStage: number,
  setGameStage: React.Dispatch<React.SetStateAction<number>>,
  setTagModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  existingGame?: GameSet,
  gameSetId?: number,
) => {
  const navigate = useNavigate();
  const existingBalanceGame =
    existingGame && transformGameSetToBalanceGameSet(existingGame);

  const defaultGameOptions = createInitialGameStages(10);
  const initialState: BalanceGame = existingBalanceGame ?? {
    title: '',
    mainTag: '',
    subTag: '',
    games: defaultGameOptions,
  };

  const { form, setForm, onChange, setEach } = useGameInputs(initialState);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const { mutate: createBalanceGame } = useCreateGameMutation(showToastModal);
  const { mutate: editBalanceGame } = useEditGamesMutation();

  const { mutate: uploadFiles } = useFileUploadMutation();
  const { mutate: deleteFiles } = useDeleteFileMutation();

  const { data: tempGame } = useLoadTempGameQuery();
  const { mutate: saveTempGame } = useSaveTempGameMutation();

  const [isTempGameLoaded, setIsTempGameLoaded] = useState<boolean>(false);

  const handleBalanceGame = () => {
    const gameValidation = validateGameTag(form);

    if (!gameValidation.isValid) {
      return;
    }

    if (existingGame && gameSetId) {
      editBalanceGame(
        {
          gameSetId,
          data: form,
        },
        {
          onSuccess: () => {
            showToastModal(SUCCESS.GAME.EDIT, () => {
              navigate(`/${PATH.BALANCEGAME.VIEW(gameSetId)}`);
            });
          },
        },
      );
    } else {
      createBalanceGame(form);
    }
  };

  const handleTempBalanceGame = () => {
    const tempBalanceGame: TempGame = transformBalanceGameToTempGame(
      form,
      isTempGameLoaded,
    );
    saveTempGame(tempBalanceGame);
    setIsTempGameLoaded(true);
    showToastModal(SUCCESS.TEMPGAME.SAVE);
  };

  const handleDraftButton = () => {
    if (tempGame) {
      const savedBalanceGame: BalanceGame = transformTempGameToBalanceGame(
        tempGame,
        form.mainTag,
        form.subTag,
      );
      setForm(savedBalanceGame);
      setIsTempGameLoaded(true);
      showToastModal(SUCCESS.TEMPGAME.LOAD);
    }
  };

  const handleImgChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: number,
  ) => {
    if (event.target.files) {
      const imgFile = event.target.files[0];
      const imageFormData = new FormData();
      imageFormData.append('file', imgFile);

      uploadFiles(
        {
          formData: imageFormData,
          params: { type: 'GAME_OPTION' },
        },
        {
          onSuccess: (res) => {
            setEach('fileId', res.fileIds[0], gameStage, optionId);
            setEach('imgUrl', res.imgUrls[0], gameStage, optionId);
          },
        },
      );
    }
  };

  const handleDeleteImg = (fileId: number | null, optionId: number) => {
    if (fileId) {
      deleteFiles(fileId, {
        onSuccess: () => {
          setEach('fileId', null, gameStage, optionId);
          setEach('imgUrl', '', gameStage, optionId);
        },
      });
    }
  };

  const handlePrevGame = () => {
    setGameStage((prev) => prev - 1);
  };

  const handleNextGame = () => {
    const gameValidation = validateBalanceGameForm(form, gameStage);

    if (!gameValidation.isValid) {
      showToastModal(gameValidation.message);
      return;
    }

    if (gameStage === 9) {
      setTagModalOpen(true);
      return;
    }

    setGameStage((prev) => prev + 1);
  };

  return {
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
  };
};

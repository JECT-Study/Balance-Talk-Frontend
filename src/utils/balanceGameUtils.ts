import {
  BalanceGameOption,
  BalanceGameSet,
  BalanceGame,
  TempGame,
  GameSet,
} from '@/types/game';

export const createInitialGameStages = (totalStage: number): BalanceGameSet[] =>
  Array.from({ length: totalStage }, (_, idx) => ({
    description: '',
    gameOptions: [
      {
        id: idx * 2,
        name: '',
        imgUrl: '',
        fileId: null,
        description: '',
        optionType: 'A',
      },
      {
        id: idx * 2 + 1,
        name: '',
        imgUrl: '',
        fileId: null,
        description: '',
        optionType: 'B',
      },
    ],
  }));

export const updateOptionInGameSets = (
  options: BalanceGameOption[],
  optionType: 'A' | 'B',
  newOption: Partial<BalanceGameOption>,
): BalanceGameOption[] => {
  return options.map((option) =>
    option.optionType === optionType ? { ...option, ...newOption } : option,
  );
};

/**
 * GameSet 데이터를 BalanceGameSet 형식으로 변환하는 함수
 * @param gameSet GameSet API에서 받은 원본 데이터
 * @returns BalanceGameSet[]로 가공된 데이터
 */
export const transformGameSetToBalanceGame = (
  gameSet: GameSet,
): BalanceGameSet[] => {
  return gameSet.gameDetailResponses.map(
    ({ description = '', gameOptions }) => ({
      description,
      gameOptions: gameOptions.map(
        ({
          id,
          name,
          description: optionDescription,
          optionType,
          imgUrl,
          fileId,
        }) => ({
          id,
          name,
          description: optionDescription,
          optionType,
          imgUrl: imgUrl ?? '',
          fileId: fileId ?? null,
        }),
      ),
    }),
  );
};

export const transformBalanceGameToTempGame = (
  balanceGame: BalanceGame,
  isTempLoaded: boolean,
): TempGame => ({
  title: balanceGame.title,
  isLoaded: isTempLoaded,
  tempGames: balanceGame.games.map((gameSet) => ({
    description: gameSet.description,
    tempGameOptions: gameSet.gameOptions.map((option) => ({
      name: option.name,
      description: option.description,
      fileId: option.fileId ?? null,
      imgUrl: option.imgUrl ?? '',
      optionType: option.optionType,
    })),
  })),
});

export const transformTempGameToBalanceGame = (
  tempGame: TempGame,
  gameMainTag: string,
  gameSubTag: string,
): BalanceGame => ({
  title: tempGame.title,
  mainTag: gameMainTag,
  subTag: gameSubTag,
  games: tempGame.tempGames.map((tempGameSet) => ({
    description: tempGameSet.description,
    gameOptions: tempGameSet.tempGameOptions.map((tempOption, index) => ({
      id: index,
      name: tempOption.name,
      imgUrl: tempOption.imgUrl ?? '',
      fileId: tempOption.fileId ?? null,
      description: tempOption.description,
      optionType: tempOption.optionType,
    })),
  })),
});

export const transformGameSetToBalanceGameSet = (
  gameSet: GameSet,
): BalanceGame => {
  return {
    title: gameSet.title,
    mainTag: gameSet.mainTag,
    subTag: gameSet.subTag,
    games: gameSet.gameDetailResponses.map((gameDetail) => ({
      description: gameDetail.description ?? '',
      gameOptions: gameDetail.gameOptions.map((option) => ({
        id: option.id,
        name: option.name,
        imgUrl: option.imgUrl ?? '',
        description: option.description,
        optionType: option.optionType,
        fileId: option.fileId ?? null,
      })),
    })),
  };
};

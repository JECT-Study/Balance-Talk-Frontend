import { getGameWritten } from '@/api/mypages';
import { GameWritten, MyBalanceGameItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformGameWrittenItem } from '@/utils/transformBalanceGame';

type GameWrittenTransformed = Omit<GameWritten, 'content'> & {
  content: MyBalanceGameItem[];
};

export const useGameWrittensQuery = () => {
  const {
    data: gameWrittensData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<GameWritten, GameWrittenTransformed>(
    ['gameWritten'],

    async ({ pageParam = 0 }) => {
      return getGameWritten(pageParam, 20);
    },

    (infiniteData: InfiniteData<GameWritten>): GameWrittenTransformed => {
      const firstPage = infiniteData.pages[0];
      return {
        ...firstPage,
        content: infiniteData.pages.flatMap((page) =>
          page.content.map((item) => transformGameWrittenItem(item)),
        ),
      };
    },
  );

  return {
    gameWritten: gameWrittensData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

import { getGameVote } from '@/api/mypages';
import { GameVote, MyBalanceGameItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformGameVoteItem } from '@/utils/transformBalanceGame';

export interface GameVoteTransformedPage extends Omit<GameVote, 'content'> {
  content: MyBalanceGameItem[];
}

export const useGameVotesQuery = (memberId: number) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteScroll<GameVote, InfiniteData<GameVoteTransformedPage>>(
      ['gameVote'],
      async ({ pageParam = 0 }) => {
        return getGameVote(pageParam, 20);
      },
      (infiniteData: InfiniteData<GameVote>) => {
        const newPages = infiniteData.pages.map((page) => ({
          ...page,
          content: page.content.map((item) =>
            transformGameVoteItem(item, memberId),
          ),
        }));

        const newInfiniteData: InfiniteData<GameVoteTransformedPage> = {
          ...infiniteData,
          pages: newPages,
        };

        return newInfiniteData;
      },
    );

  return {
    gameVote: data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

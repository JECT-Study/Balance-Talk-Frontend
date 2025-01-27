import { getGameBookmark } from '@/api/mypages';
import { GameBookmark, MyBalanceGameItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformBalanceGameItem } from '@/utils/transformBalanceGame';

export interface GameBookmarkTransformedPage
  extends Omit<GameBookmark, 'content'> {
  content: MyBalanceGameItem[];
}

export const useGameBookmarksQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteScroll<GameBookmark, InfiniteData<GameBookmarkTransformedPage>>(
      ['gameBookmark'],
      async ({ pageParam = 0 }) => {
        return getGameBookmark(pageParam, 20);
      },
      (infiniteData: InfiniteData<GameBookmark>) => {
        const newPages = infiniteData.pages.map((page) => ({
          ...page,
          content: page.content.map((item) => transformBalanceGameItem(item)),
        }));

        return {
          ...infiniteData,
          pages: newPages,
        };
      },
    );

  return {
    gameBookmark: data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

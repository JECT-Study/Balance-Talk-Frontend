import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Id, ServerResponse } from '@/types/api';
import { deleteDoneGameBookmark } from '@/api/bookmarks';
import { GameBookmarkTransformedPage } from '@/hooks/api/mypages/useGameBookmarksQuery';
import { GameVoteTransformedPage } from '@/hooks/api/mypages/useGameVotesQuery';

export const useMyBalanceGameBookmarkDeleteMutation = () => {
  const queryClient = useQueryClient();

  type GameBookmarkInfinite = InfiniteData<GameBookmarkTransformedPage>;

  type GameVoteInfinite = InfiniteData<GameVoteTransformedPage>;

  interface DeleteBookmarkContext {
    gameBookmark?: GameBookmarkInfinite;
    gameVote?: GameVoteInfinite;
  }

  return useMutation<
    AxiosResponse<ServerResponse>,
    Error,
    Id,
    DeleteBookmarkContext
  >({
    mutationFn: (gameSetId: number) => {
      return deleteDoneGameBookmark(gameSetId);
    },

    onMutate: async (gameSetId: number): Promise<DeleteBookmarkContext> => {
      await queryClient.cancelQueries({ queryKey: ['gameBookmark'] });
      await queryClient.cancelQueries({ queryKey: ['gameVote'] });

      const prevGameBookmark = queryClient.getQueryData<GameBookmarkInfinite>([
        'gameBookmark',
      ]);
      const prevGameVote = queryClient.getQueryData<GameVoteInfinite>([
        'gameVote',
      ]);

      if (prevGameBookmark) {
        const newPages = prevGameBookmark.pages.map((page) => ({
          ...page,
          content: page.content.map((item) =>
            item.gameSetId === gameSetId
              ? { ...item, bookmarked: false }
              : item,
          ),
        }));
        queryClient.setQueryData<GameBookmarkInfinite>(['gameBookmark'], {
          ...prevGameBookmark,
          pages: newPages,
        });
      }

      if (prevGameVote) {
        const newPages = prevGameVote.pages.map((page) => ({
          ...page,
          content: page.content.map((item) =>
            item.gameSetId === gameSetId
              ? { ...item, bookmarked: false }
              : item,
          ),
        }));
        queryClient.setQueryData<GameVoteInfinite>(['gameVote'], {
          ...prevGameVote,
          pages: newPages,
        });
      }

      return {
        gameBookmark: prevGameBookmark,
        gameVote: prevGameVote,
      };
    },

    onError: (err, gameSetId, context) => {
      if (!context) return;

      if (context.gameBookmark) {
        queryClient.setQueryData(['gameBookmark'], context.gameBookmark);
      }

      if (context.gameVote) {
        queryClient.setQueryData(['gameVote'], context.gameVote);
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['gameVote'] });
    },
  });
};

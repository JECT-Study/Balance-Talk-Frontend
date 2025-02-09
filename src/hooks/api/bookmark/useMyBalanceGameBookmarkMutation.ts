import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Id, ServerResponse } from '@/types/api';
import { GameBookmarkTransformedPage } from '@/hooks/api/mypages/useMyGameBookmarksQuery';
import { GameVoteTransformedPage } from '@/hooks/api/mypages/useMyGameVotesQuery';

type GameBookmarkInfinite = InfiniteData<GameBookmarkTransformedPage>;
type GameVoteInfinite = InfiniteData<GameVoteTransformedPage>;

interface BookmarkContext {
  gameBookmark?: GameBookmarkInfinite;
  gameVote?: GameVoteInfinite;
}

export const useMyBalanceGameBookmarkMutation = (
  mutationFn: (id: Id) => Promise<AxiosResponse<ServerResponse>>,
  nextBookmarkedValue: boolean,
  invalidateKeys: string[],
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ServerResponse>, Error, Id, BookmarkContext>(
    {
      mutationFn,

      onMutate: async (gameSetId) => {
        await queryClient.cancelQueries({ queryKey: ['gameBookmark'] });
        await queryClient.cancelQueries({ queryKey: ['gameVote'] });

        const prevGameBookmark = queryClient.getQueryData<GameBookmarkInfinite>(
          ['gameBookmark'],
        );
        const prevGameVote = queryClient.getQueryData<GameVoteInfinite>([
          'gameVote',
        ]);

        if (prevGameBookmark) {
          const newPages = prevGameBookmark.pages.map((page) => ({
            ...page,
            content: page.content.map((item) =>
              item.gameSetId === gameSetId
                ? { ...item, bookmarked: nextBookmarkedValue }
                : item,
            ),
          }));
          queryClient.setQueryData(['gameBookmark'], {
            ...prevGameBookmark,
            pages: newPages,
          });
        }

        if (prevGameVote) {
          const newPages = prevGameVote.pages.map((page) => ({
            ...page,
            content: page.content.map((item) =>
              item.gameSetId === gameSetId
                ? { ...item, bookmarked: nextBookmarkedValue }
                : item,
            ),
          }));
          queryClient.setQueryData(['gameVote'], {
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
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: [key] }),
          ),
        );
      },
    },
  );
};

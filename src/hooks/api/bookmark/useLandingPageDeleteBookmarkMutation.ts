import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { deleteDoneGameBookmark } from '@/api/bookmarks';
import { Id, ServerResponse } from '@/types/api';
import { BookmarkContext } from '@/types/bookmarks';
import { GameContent } from '@/types/game';

export const useLandingPageDeleteBookmarkMutation = (activeTab: string) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ServerResponse>, Error, Id, BookmarkContext>(
    {
      mutationFn: (gameId: Id) => deleteDoneGameBookmark(gameId),

      onMutate: (gameId: Id): BookmarkContext => {
        const prevBest = queryClient.getQueryData<GameContent[]>([
          'bestGames',
          activeTab,
        ]);
        const prevLatest = queryClient.getQueryData<GameContent[]>([
          'latestGames',
          activeTab,
        ]);

        if (prevBest) {
          const updatedBest = prevBest.map((item) =>
            item.id === gameId ? { ...item, bookmarked: false } : item,
          );
          queryClient.setQueryData(['bestGames', activeTab], updatedBest);
        }
        if (prevLatest) {
          const updatedLatest = prevLatest.map((item) =>
            item.id === gameId ? { ...item, bookmarked: false } : item,
          );
          queryClient.setQueryData(['latestGames', activeTab], updatedLatest);
        }
        return { bestGames: prevBest, latestGames: prevLatest };
      },

      onError: (error, gameId, context) => {
        if (context?.bestGames) {
          queryClient.setQueryData(['bestGames', activeTab], context.bestGames);
        }
        if (context?.latestGames) {
          queryClient.setQueryData(
            ['latestGames', activeTab],
            context.latestGames,
          );
        }
      },

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['bestGames', activeTab],
        });
        await queryClient.invalidateQueries({
          queryKey: ['latestGames', activeTab],
        });
      },
    },
  );
};

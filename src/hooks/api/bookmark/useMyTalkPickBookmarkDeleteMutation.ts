import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteTalkPickBookmark } from '@/api/bookmarks';
import { MyBookmarkTransformedPage } from '@/hooks/api/mypages/useMyBookmarksQuery';
import { AxiosResponse } from 'axios';
import { ServerResponse } from '@/types/api';

export const useMyTalkPickBookmarkDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<ServerResponse>,
    Error,
    number,
    InfiniteData<MyBookmarkTransformedPage> | undefined
  >({
    mutationFn: (talkPickId: number) => deleteTalkPickBookmark(talkPickId),

    onMutate: async (talkPickId) => {
      await queryClient.cancelQueries({ queryKey: ['myBookmarks'] });

      const previousData = queryClient.getQueryData<
        InfiniteData<MyBookmarkTransformedPage>
      >(['myBookmarks']);

      if (previousData) {
        const newPages = previousData.pages.map((page) => ({
          ...page,
          content: page.content.map((item) =>
            item.id === talkPickId ? { ...item, bookmarked: false } : item,
          ),
        }));

        queryClient.setQueryData(['myBookmarks'], {
          ...previousData,
          pages: newPages,
        });
      }
      return previousData;
    },

    onError: (err, talkPickId, context) => {
      if (context) {
        queryClient.setQueryData(['myBookmarks'], context);
      }
    },

    onSuccess: async () => {},
  });
};

import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from '@tanstack/react-query';
import { MyBookmarkTransformedPage } from '@/hooks/api/mypages/useMyBookmarksQuery';
import { postTalkPickBookmark } from '@/api/bookmarks';
import { ServerResponse } from '@/types/api';
import { AxiosResponse } from 'axios';

export const useMyTalkPickBookmarkCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<ServerResponse>,
    Error,
    number,
    InfiniteData<MyBookmarkTransformedPage> | undefined
  >({
    mutationFn: (talkPickId: number) => postTalkPickBookmark(talkPickId),

    onMutate: async (talkPickId) => {
      await queryClient.cancelQueries({ queryKey: ['myBookmarks'] });

      const previousData = queryClient.getQueryData<
        InfiniteData<MyBookmarkTransformedPage>
      >(['myBookmarks']);
      if (previousData) {
        const newPages = previousData.pages.map((page) => ({
          ...page,
          content: page.content.map((item) =>
            item.id === talkPickId ? { ...item, bookmarked: true } : item,
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

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
    },
  });
};

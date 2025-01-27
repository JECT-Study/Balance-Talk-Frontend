import { getMyComment } from '@/api/mypages';
import { MyComment, InfoItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { transformCommentItem } from '@/utils/transformTalkPick';
import { InfiniteData } from '@tanstack/react-query';

type MyCommentTransformed = Omit<MyComment, 'content'> & {
  content: InfoItem[];
};

export const useMyCommentsQuery = () => {
  const {
    data: myCommentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<MyComment, MyCommentTransformed>(
    ['myComments'],

    async ({ pageParam = 0 }) => {
      return getMyComment(pageParam, 20);
    },

    (infiniteData: InfiniteData<MyComment>): MyCommentTransformed => {
      const firstPage = infiniteData.pages[0];

      return {
        ...firstPage,
        content: infiniteData.pages.flatMap((page) =>
          page.content.map((item) => transformCommentItem(item)),
        ),
      };
    },
  );

  return {
    myComments: myCommentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

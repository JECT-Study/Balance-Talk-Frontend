import { getMyVote } from '@/api/mypages';
import { InfoItem, MyVote } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformVoteItem } from '@/utils/transformTalkPick';

type MyVoteTransformed = Omit<MyVote, 'content'> & {
  content: InfoItem[];
};

export const useMyVotesQuery = () => {
  const {
    data: myVoteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<MyVote, MyVoteTransformed>(
    ['myVote'],

    async ({ pageParam = 0 }) => {
      return getMyVote(pageParam, 20);
    },

    (infiniteData: InfiniteData<MyVote>): MyVoteTransformed => {
      const firstPage = infiniteData.pages[0];
      return {
        ...firstPage,

        content: infiniteData.pages.flatMap((page) =>
          page.content.map((item) => transformVoteItem(item)),
        ),
      };
    },
  );

  return {
    myVote: myVoteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

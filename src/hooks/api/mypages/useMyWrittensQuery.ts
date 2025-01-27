import { getMyWritten } from '@/api/mypages';
import { MyContentItem, MyWritten } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { transformWrittenItem } from '@/utils/transformTalkPick';
import { InfiniteData } from '@tanstack/react-query';

type MyWrittenTransformed = Omit<MyWritten, 'content'> & {
  content: MyContentItem[];
};

export const useMyWrittensQuery = () => {
  const {
    data: myWrittenData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<MyWritten, MyWrittenTransformed>(
    ['myWritten'],

    async ({ pageParam = 0 }) => {
      return getMyWritten(pageParam, 20);
    },

    (infiniteData: InfiniteData<MyWritten>): MyWrittenTransformed => {
      const firstPage = infiniteData.pages[0];

      return {
        ...firstPage,
        content: infiniteData.pages.flatMap((page) =>
          page.content.map((item) => transformWrittenItem(item)),
        ),
      };
    },
  );

  return {
    myWritten: myWrittenData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

/**
 * 2개의 제네릭:
 *  - TQueryFnData: queryFn이 실제 API에서 받아오는 원본 타입
 *  - TData: 최종 변환(Select) 이후에 사용할 UI 모델 타입
 */

export const useInfiniteScroll = <
  TQueryFnData extends { last: boolean; number: number },
  TData = TQueryFnData,
>(
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam?: number }) => Promise<TQueryFnData>,
  selectFn?: (data: InfiniteData<TQueryFnData>) => TData,
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<TQueryFnData, Error, TData, typeof queryKey, number>({
      queryKey,
      queryFn: async ({ pageParam = 0 }) => {
        return queryFn({ pageParam });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.number + 1;
      },
      initialPageParam: 0,
      select: selectFn,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

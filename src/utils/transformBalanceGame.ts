import { MyBalanceGameItem } from '@/types/mypages';

export const transformBalanceGameItem = (
  item: MyBalanceGameItem,
): MyBalanceGameItem => {
  return {
    ...item,
    showBookmark: true,
  };
};

export const transformGameWrittenItem = (
  item: MyBalanceGameItem,
): MyBalanceGameItem => {
  return {
    ...item,
    showBookmark: false,
  };
};

export const transformGameVoteItem = (
  item: MyBalanceGameItem,
  memberId: number,
): MyBalanceGameItem => {
  return {
    ...item,
    showBookmark: item.writerId !== memberId,
  };
};

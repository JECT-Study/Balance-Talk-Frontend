import React, { useMemo } from 'react';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { useNavigate } from 'react-router-dom';
import { MyBalanceGameItem } from '@/types/mypages';
import * as S from './MyBalanceGameList.style';

export interface MyBalanceGameListProps {
  items: MyBalanceGameItem[];
  onBookmarkClick?: (item: MyBalanceGameItem) => void;
}

const MyBalanceGameList = ({
  items = [],
  onBookmarkClick,
}: MyBalanceGameListProps) => {
  const navigate = useNavigate();

  const groupedItems = useMemo(() => {
    return items.reduce(
      (acc, { editedAt, ...rest }) => {
        if (!acc[editedAt]) {
          acc[editedAt] = [];
        }
        acc[editedAt].push({ editedAt, ...rest });
        return acc;
      },
      {} as Record<string, MyBalanceGameItem[]>,
    );
  }, [items]);

  const handleItemClick = (gameId: number) => {
    navigate(`/balancegame/${gameId}`);
  };

  return (
    <div css={S.container}>
      {Object.keys(groupedItems).map((date) => (
        <div key={date} css={S.dateWrapper}>
          <span css={S.dateLabel}>{date}</span>
          <ul css={S.contentList}>
            {groupedItems[date].map((item) => (
              <li key={item.gameId} css={S.contentItem}>
                <ContentsButton
                  images={[item.optionAImg, item.optionBImg]}
                  title={item.title}
                  mainTag={item.mainTagName}
                  subTag={item.subTag}
                  bookmarked={item.bookmarked}
                  showBookmark={item.showBookmark}
                  size="medium"
                  onClick={() => handleItemClick(item.gameId)}
                  onBookmarkClick={() => onBookmarkClick?.(item)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyBalanceGameList;

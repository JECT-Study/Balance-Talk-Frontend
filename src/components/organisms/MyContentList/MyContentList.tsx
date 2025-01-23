import React, { useMemo } from 'react';
import MyContentBox from '@/components/molecules/MyContentBox/MyContentBox';
import { useNavigate } from 'react-router-dom';
import { MyContentItem } from '@/types/mypages';
import * as S from './MyContentList.style';

export interface MyContentListProps {
  items: MyContentItem[];
}

const MyContentList = ({ items = [] }: MyContentListProps) => {
  const navigate = useNavigate();

  const groupedItems = useMemo(() => {
    return items.reduce<Record<string, MyContentItem[]>>(
      (acc, { editedAt, ...rest }) => {
        if (!acc[editedAt]) {
          acc[editedAt] = [];
        }
        acc[editedAt].push({ editedAt, ...rest });
        return acc;
      },
      {},
    );
  }, [items]);

  const handleItemClick = (id: number) => {
    navigate(`/talkpick/${id}`);
  };

  return (
    <section aria-label="내 콘텐츠 목록" css={S.container}>
      {Object.entries(groupedItems).map(([date, contentItems]) => (
        <section key={date} css={S.dateWrapper}>
          <span css={S.dateLabel}>{date}</span>
          <ul css={S.contentList}>
            {contentItems.map(
              ({
                id,
                title,
                commentCount,
                bookmarks,
                showBookmark,
                bookmarked,
              }) => (
                <li key={id} css={S.contentItem}>
                  <MyContentBox
                    title={title}
                    commentCount={commentCount}
                    bookmarks={bookmarks}
                    showBookmark={showBookmark}
                    bookmarked={bookmarked}
                    onClick={() => handleItemClick(id)}
                  />
                </li>
              ),
            )}
          </ul>
        </section>
      ))}
    </section>
  );
};

export default MyContentList;

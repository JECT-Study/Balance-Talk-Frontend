import React from 'react';
import InfoLabel from '@/components/atoms/InfoLabel/InfoLabel';
import Bookmark, { BookmarkProps } from '@/components/atoms/Bookmark/Bookmark';
import * as S from './MyContentBox.style';

export interface MyContentBoxProps {
  title: string;
  commentCount: number;
  bookmarks: number;
  showBookmark?: boolean;
  bookmarked?: BookmarkProps['bookmarked'];
  onClick: () => void;
  onBookmarkClick?: () => void;
}
const MyContentBox = ({
  title,
  commentCount,
  bookmarks,
  showBookmark = false,
  bookmarked = false,
  onClick,
  onBookmarkClick,
}: MyContentBoxProps) => {
  return (
    <button type="button" css={S.infoContainer} onClick={onClick}>
      <div css={S.textContainer}>
        <p css={S.titleLabel}>{title}</p>
      </div>
      <InfoLabel label="톡댓톡" count={commentCount} />
      <InfoLabel label="저장" count={bookmarks} />
      {showBookmark && (
        <Bookmark
          bookmarked={bookmarked}
          css={S.bookmarkWrapper}
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkClick?.();
          }}
        />
      )}
    </button>
  );
};

export default MyContentBox;

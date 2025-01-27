import React, { ComponentPropsWithRef, useMemo } from 'react';
import Chips from '@/components/atoms/Chips/Chips';
import Bookmark, { BookmarkProps } from '@/components/atoms/Bookmark/Bookmark';
import { highlightText } from '@/utils/highlightText';
import {
  RandomBlackFrame,
  RandomBlueFrame,
  RandomGreenFrame,
  RandomPinkFrame,
  RandomPurpleFrame,
  RandomTealFrame,
} from '@/assets';
import { getRandomNumbers } from '@/utils/calculator';
import * as S from './ContentsButton.style';

export interface ContentsButtonProps extends ComponentPropsWithRef<'button'> {
  title: string;
  mainTag: string;
  subTag?: string;
  images: string[];
  bookmarked?: BookmarkProps['bookmarked'];
  showBookmark?: boolean;
  size?: 'large' | 'medium' | 'small' | 'extraSmall';
  keyword?: string;
  onClick: () => void;
  onBookmarkClick?: () => void;
}

const randomImages = [
  RandomBlackFrame,
  RandomBlueFrame,
  RandomGreenFrame,
  RandomPinkFrame,
  RandomPurpleFrame,
  RandomTealFrame,
];

const useRandomImagePair = () => {
  return useMemo(() => {
    const randomIndexes = getRandomNumbers(randomImages.length);
    return [randomImages[randomIndexes[0]], randomImages[randomIndexes[1]]];
  }, []);
};

const ContentsButton = ({
  title,
  mainTag,
  subTag,
  images,
  size = 'large',
  keyword,
  bookmarked = false,
  showBookmark = true,
  onClick,
  onBookmarkClick,
  ...attributes
}: ContentsButtonProps) => {
  const validImages = images?.filter(Boolean);

  const memoizedRandomPair = useRandomImagePair();

  const displayImages =
    !validImages || validImages.length === 0 ? memoizedRandomPair : validImages;

  return (
    <button
      type="button"
      css={S.cardWrapper(size)}
      onClick={onClick}
      {...attributes}
    >
      <div css={S.imageContainer(size)}>
        <div css={S.imageWrapper}>
          <img src={displayImages[0]} alt="option A" css={S.image} />
        </div>
        <div css={S.imageWrapper}>
          <img src={displayImages[1]} alt="option B" css={S.image} />
        </div>
        <div css={S.chipsContainer}>
          {subTag?.trim() && <Chips>{subTag}</Chips>}
          <Chips>{`#${mainTag}`}</Chips>
        </div>
      </div>
      <div css={S.infoContainer(size)}>
        {highlightText(title, keyword ?? '').map((part) => (
          <span key={part.value} css={S.label(size, part.highlighted)}>
            {part.value}
          </span>
        ))}
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
      </div>
    </button>
  );
};

export default ContentsButton;

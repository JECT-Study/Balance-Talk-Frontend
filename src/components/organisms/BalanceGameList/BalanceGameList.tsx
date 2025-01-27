/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useCallback, useState } from 'react';
import { AngleSmallDown } from '@/assets';
import ToggleGroup from '@/components/atoms/ToggleGroup/ToggleGroup';
import Button from '@/components/atoms/Button/Button';
import CategoryBar from '@/components/molecules/CategoryBar/CategoryBar';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { GameContent } from '@/types/game';
import { ToggleGroupValue } from '@/types/toggle';
import { useNavigate } from 'react-router-dom';
import { ERROR } from '@/constants/message';
import MobileToggleGroup from '@/components/mobile/atoms/MobileToggleGroup/MobileToggleGroup';
import * as S from './BalanceGameList.style';

export interface ContentListProps {
  contents: GameContent[];
  selectedValue: ToggleGroupValue;
  setSelectedValue: React.Dispatch<React.SetStateAction<ToggleGroupValue>>;
  activeTab: '인기' | '커플' | '취향' | '월드컵';
  setActiveTab: React.Dispatch<
    React.SetStateAction<'인기' | '커플' | '취향' | '월드컵'>
  >;
  onBookmarkClick?: (content: GameContent) => void;
  isMobile?: boolean;
}

const BalanceGameList = ({
  contents,
  selectedValue,
  setSelectedValue,
  activeTab,
  setActiveTab,
  onBookmarkClick,
  isMobile = false,
}: ContentListProps) => {
  const [visibleItems, setVisibleItems] = useState<number>(4);
  const navigate = useNavigate();

  const handleItemClick = useCallback(
    (gameId: number) => {
      if (!gameId || gameId <= 0) {
        alert(ERROR.GAME.NOT_EXIST);
        return;
      }
      navigate(`/balancegame/${gameId}`);
    },
    [navigate],
  );

  const handleLoadMore = useCallback(() => {
    setVisibleItems((prev) => Math.min(prev + 6, contents.length));
  }, [contents.length]);

  const handleToggleChange = useCallback(
    (value: ToggleGroupValue) => {
      setSelectedValue(value);
    },
    [setSelectedValue],
  );

  return (
    <div css={S.containerStyle}>
      <div css={S.titleWrapStyle}>
        <div>주제별 밸런스 게임</div>
        {isMobile ? (
          <MobileToggleGroup
            selectedValue={selectedValue}
            onClick={handleToggleChange}
          />
        ) : (
          <ToggleGroup
            selectedValue={selectedValue}
            onClick={setSelectedValue}
          />
        )}
      </div>
      <div css={S.barStyle}>
        <CategoryBar
          isMobile={isMobile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div css={S.contentStyle}>
        {contents.slice(0, visibleItems).map((content) => (
          <ContentsButton
            size={isMobile ? 'extraSmall' : 'large'}
            key={content.id}
            images={content.images}
            title={content.title}
            mainTag={content.mainTag}
            subTag={content.subTag}
            showBookmark={content.showBookmark}
            bookmarked={content.bookmarked || false}
            onClick={() => handleItemClick(content.id)}
            onBookmarkClick={() => {
              onBookmarkClick?.(content);
            }}
          />
        ))}
        {visibleItems < contents.length && (
          <div css={S.loadMoreWrapperStyle}>
            <Button
              variant="outlineShadow"
              size={isMobile ? 'small' : 'large'}
              onClick={handleLoadMore}
              iconRight={<AngleSmallDown />}
            >
              더보기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceGameList;

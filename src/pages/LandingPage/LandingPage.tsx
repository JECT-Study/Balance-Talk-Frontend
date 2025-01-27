import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBanner from '@/components/molecules/TopBanner/TopBanner';
import SearchTagBar from '@/components/molecules/SearchTagBar/SearchTagBar';
import CategoryBox from '@/components/molecules/CategoryBox/CategoryBox';
import BalanceGameList from '@/components/organisms/BalanceGameList/BalanceGameList';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import FloatingMenuButton from '@/components/mobile/molecules/FloatingMenuButton/FloatingMenuButton';
import LoginModal from '@/components/molecules/LoginModal/LoginModal';
import { useTodayTalkPickQuery } from '@/hooks/api/talk-pick/useTodayTalkPickQuery';
import { useBestGameList } from '@/hooks/api/game/useBestGameListQuery';
import { useLatestGameList } from '@/hooks/api/game/useLatestGameListQuery';
import useIsMobile from '@/hooks/common/useIsMobile';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { isLoggedIn } from '@/utils/auth';
import { useLandingPageCreateBookmarkMutation } from '@/hooks/api/bookmark/useLandingPageCreateBookmarkMutation';
import { useLandingPageDeleteBookmarkMutation } from '@/hooks/api/bookmark/useLandingPageDeleteBookmarkMutation';
import useModal from '@/hooks/modal/useModal';
import useToastModal from '@/hooks/modal/useToastModal';
import { GameContent } from '@/types/game';
import { ToggleGroupValue } from '@/types/toggle';
import { NOTICE, SUCCESS } from '@/constants/message';
import { useTodayBalanceGameList } from '@/hooks/game/useTodayBalanceGameList';
import { todayTalkPickDummyData } from '@/mocks/data/banner';
import * as S from './LandingPage.style';

const LandingPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { isOpen: isLoginModalOpen, openModal, closeModal } = useModal();
  const { isVisible, modalText, showToastModal } = useToastModal();

  const { member } = useMemberQuery();

  const { todayTalkPickList = todayTalkPickDummyData } =
    useTodayTalkPickQuery();
  const { todayBalanceGameList } = useTodayBalanceGameList();
  const [isServicePreparing, setIsServicePreparing] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<ToggleGroupValue>({
    field: 'views',
    order: 'desc',
  });
  const [activeTab, setActiveTab] = useState<
    '인기' | '커플' | '취향' | '월드컵'
  >('인기');

  const isBestGamesEnabled =
    activeTab === '인기' || selectedValue.field === 'views';
  const isLatestGamesEnabled =
    activeTab !== '인기' && selectedValue.field !== 'views';

  const { bestGames } = useBestGameList(activeTab, isBestGamesEnabled);
  const { latestGames } = useLatestGameList(activeTab, isLatestGamesEnabled);

  const contents = useMemo(() => {
    if (isBestGamesEnabled) {
      return bestGames ?? [];
    }
    if (isLatestGamesEnabled) {
      return latestGames ?? [];
    }
    return [];
  }, [isBestGamesEnabled, isLatestGamesEnabled, bestGames, latestGames]);

  const processedContents = useMemo(() => {
    if (!member?.id) return [];
    return contents.map((item: GameContent) => ({
      ...item,
      showBookmark: item.writerId !== member.id,
    }));
  }, [contents, member?.id]);

  const handleService = () => {
    setIsServicePreparing(true);

    setTimeout(() => {
      setIsServicePreparing(false);
    }, 2000);
  };

  const handleSearch = (query: string) => {
    navigate(`/result/search/all?query=${query}`);
  };

  const handleLogin = () => {
    showToastModal(SUCCESS.LOGIN);
    closeModal();
  };

  const createBookmark = useLandingPageCreateBookmarkMutation(activeTab);
  const deleteBookmark = useLandingPageDeleteBookmarkMutation(activeTab);

  const handleBookmarkClick = useCallback(
    (content: GameContent) => {
      if (!content.id) return;

      if (!isLoggedIn()) {
        openModal();
        return;
      }

      if (content.bookmarked) {
        deleteBookmark.mutate(content.id, {
          onError: () => {
            showToastModal('북마크 해제에 실패했습니다.');
          },
        });
      } else {
        createBookmark.mutate(content.id, {
          onError: () => {
            showToastModal('북마크 등록에 실패했습니다.');
          },
        });
      }
    },
    [createBookmark, deleteBookmark, openModal, showToastModal],
  );

  return (
    <div css={S.pageWrapperStyle}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      {isServicePreparing && (
        <div css={S.toastModalStyling}>
          <ToastModal bgColor="white">{NOTICE.STATUS.NOT_READY}</ToastModal>
        </div>
      )}
      <TopBanner
        todayTalkPickList={todayTalkPickList}
        todayBalanceGameList={todayBalanceGameList}
      />

      {isMobile ? (
        <div css={S.contentWrapStyle}>
          <CategoryBox isMobile={isMobile} handleService={handleService} />
          <div css={S.searchBoxStyle}>
            <p css={S.searchBoxTitleStyle}>어떤 콘텐츠를 찾아볼까요?</p>
            <SearchTagBar isMobile onSearch={handleSearch} />
          </div>
          <BalanceGameList
            isMobile
            contents={processedContents}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onBookmarkClick={handleBookmarkClick}
          />
          <div css={S.floatingDropdownStyle}>
            <FloatingMenuButton />
          </div>
        </div>
      ) : (
        <div css={S.contentWrapStyle}>
          <SearchTagBar onSearch={handleSearch} />
          <div css={S.categoryBoxStyle}>
            <CategoryBox handleService={handleService} />
          </div>
          <BalanceGameList
            contents={processedContents}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onBookmarkClick={handleBookmarkClick}
          />
        </div>
      )}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeModal}
          onModalLoginSuccess={handleLogin}
        />
      )}
    </div>
  );
};

export default LandingPage;

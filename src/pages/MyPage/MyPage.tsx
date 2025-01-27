import React from 'react';
import SideBar from '@/components/organisms/SideBar/SideBar';
import OptionBar from '@/components/organisms/OptionBar/OptionBar';
import MyContentList from '@/components/organisms/MyContentList/MyContentList';
import InfoList from '@/components/organisms/InfoList/InfoList';
import MyBalanceGameList from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { OptionKeys } from '@/constants/optionSets';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useMyVotesQuery } from '@/hooks/api/mypages/useMyVotesQuery';
import { useMyCommentsQuery } from '@/hooks/api/mypages/useMyCommentsQuery';
import { useMyWrittensQuery } from '@/hooks/api/mypages/useMyWrittensQuery';
import { useMyBookmarksQuery } from '@/hooks/api/mypages/useMyBookmarksQuery';
import { useGameBookmarksQuery } from '@/hooks/api/mypages/useGameBookmarksQuery';
import { useGameWrittensQuery } from '@/hooks/api/mypages/useGameWrittensQuery';
import { useGameVotesQuery } from '@/hooks/api/mypages/useGameVotesQuery';
import { useObserver } from '@/hooks/api/mypages/useObserver';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import MypageCardSkeleton from '@/components/atoms/MypageCardSkeleton/MypageCardSkeleton';
import { useMyPageOptions } from '@/hooks/mypages/useMyPageOptions';
import { useMyTalkPickBookmarkCreateMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkCreateMutation';
import { useMyTalkPickBookmarkDeleteMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkDeleteMutation';
import { useMyBalanceGameBookmarkCreateMutation } from '@/hooks/api/bookmark/useMyBalanceGameBookmarkCreateMutation';
import { useMyBalanceGameBookmarkDeleteMutation } from '@/hooks/api/bookmark/useMyBalanceGameBookmarkDeleteMutation';
import { MyBalanceGameItem, MyContentItem } from '@/types/mypages';
import useToastModal from '@/hooks/modal/useToastModal';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { UseMutationOptions } from '@tanstack/react-query';
import { ERROR, SUCCESS } from '@/constants/message';
import * as S from './MyPage.style';

const SKELETON_ITEMS_DEFAULT = 8;

const MyPage = () => {
  const {
    selectedGroup,
    selectedOption,
    options,
    handleGroupSelect,
    handleOptionSelect,
  } = useMyPageOptions();

  const { isVisible, modalText, showToastModal } = useToastModal();

  const { member, isLoading: isMemberLoading } = useMemberQuery();
  const currentUserId = member?.id ?? 0;

  const myBookmarksQuery = useMyBookmarksQuery();
  const myVotesQuery = useMyVotesQuery();
  const myCommentsQuery = useMyCommentsQuery();
  const myWrittensQuery = useMyWrittensQuery();
  const gameBookmarksQuery = useGameBookmarksQuery();
  const gameVotesQuery = useGameVotesQuery(currentUserId);
  const gameWrittensQuery = useGameWrittensQuery();

  const talkPickCreateBookmark = useMyTalkPickBookmarkCreateMutation();
  const talkPickDeleteBookmark = useMyTalkPickBookmarkDeleteMutation();

  const balanceCreateBookmark = useMyBalanceGameBookmarkCreateMutation();
  const balanceDeleteBookmark = useMyBalanceGameBookmarkDeleteMutation();

  const queries = {
    myBookmarks: myBookmarksQuery,
    myVotes: myVotesQuery,
    myComments: myCommentsQuery,
    myWrittens: myWrittensQuery,
    gameBookmarks: gameBookmarksQuery,
    gameVotes: gameVotesQuery,
    gameWrittens: gameWrittensQuery,
  };

  const isQueryLoading =
    Object.values(queries).some((query) => query.isLoading) || isMemberLoading;

  const { ref } = useObserver(queries);

  if (isQueryLoading) {
    return (
      <div css={S.pageContainer}>
        <SideBar isLoading />
        <div css={S.contentWrapper}>
          <OptionBar
            selectedGroup={selectedGroup}
            selectedOption={selectedOption}
            options={options}
            onGroupSelect={handleGroupSelect}
            onOptionSelect={handleOptionSelect}
          />
          <div css={S.contentList}>
            {selectedGroup === OptionKeys.TALK_PICK ? (
              <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />
            ) : (
              <MypageCardSkeleton />
            )}
          </div>
          <div ref={ref} css={S.loader} />
        </div>
      </div>
    );
  }

  const handleBookmarkClick = <TData, TError>(
    item: MyContentItem | MyBalanceGameItem,
    mutate: (
      id: number,
      options?: UseMutationOptions<TData, TError, number, unknown>,
    ) => void,
  ) => {
    const id = 'gameSetId' in item ? item.gameSetId : item.id;
    const isBookmarked = item.bookmarked;

    if (isBookmarked) {
      mutate(id, {
        onSuccess: () => {
          showToastModal(SUCCESS.BOOKMARK.DELETE_MUTATE_SUCCESS);
        },
        onError: () => {
          showToastModal(ERROR.BOOKMARK.DELETE_MUTATE_FAIL);
        },
      });
    } else {
      mutate(id, {
        onSuccess: () => {
          showToastModal(SUCCESS.BOOKMARK.POST_MUTATE_SUCCESS);
        },
        onError: () => {
          showToastModal(ERROR.BOOKMARK.POST_MUTATE_FAIL);
        },
      });
    }
  };

  const renderContent = () => {
    if (selectedGroup === OptionKeys.TALK_PICK) {
      switch (selectedOption) {
        case 'bookmarks': {
          const infiniteData = myBookmarksQuery.myBookmarks;
          if (!infiniteData) return null;

          const allContent = infiniteData.pages.flatMap((page) => page.content);
          return (
            <MyContentList
              items={allContent}
              onBookmarkClick={(item) =>
                handleBookmarkClick(
                  item,
                  item.bookmarked
                    ? talkPickDeleteBookmark.mutate
                    : talkPickCreateBookmark.mutate,
                )
              }
            />
          );
        }
        case 'written': {
          const data = myWrittensQuery.myWritten;
          if (!data) return null;
          return <MyContentList items={data.content} />;
        }
        case 'votes': {
          const data = myVotesQuery.myVote;
          if (!data) return null;
          return <InfoList items={data.content} />;
        }
        case 'comments': {
          const data = myCommentsQuery.myComments;
          if (!data) return null;
          return <InfoList items={data.content} />;
        }
        default:
          return null;
      }
    } else if (selectedGroup === OptionKeys.BALANCE_GAME) {
      switch (selectedOption) {
        case 'bookmarks': {
          const infiniteData = gameBookmarksQuery.gameBookmark;
          if (!infiniteData) return null;

          const allContent = infiniteData.pages.flatMap((page) => page.content);
          return (
            <MyBalanceGameList
              items={allContent}
              onBookmarkClick={(item) =>
                handleBookmarkClick(
                  item,
                  item.bookmarked
                    ? balanceDeleteBookmark.mutate
                    : balanceCreateBookmark.mutate,
                )
              }
            />
          );
        }
        case 'votes': {
          const infiniteData = gameVotesQuery.gameVote;
          if (!infiniteData) return null;

          const allContent = infiniteData.pages.flatMap((page) => page.content);
          return (
            <MyBalanceGameList
              items={allContent}
              onBookmarkClick={(item) =>
                handleBookmarkClick(
                  item,
                  item.bookmarked
                    ? balanceDeleteBookmark.mutate
                    : balanceCreateBookmark.mutate,
                )
              }
            />
          );
        }
        case 'written': {
          const data = gameWrittensQuery.gameWritten;
          if (!data) return null;
          return <MyBalanceGameList items={data.content} />;
        }
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <div css={S.pageContainer}>
      {isVisible && (
        <div css={S.toastModalStyle}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <SideBar
        isLoading={false}
        nickname={member?.nickname ?? ''}
        postsCount={member?.postsCount ?? 0}
        bookmarkedPostsCount={member?.bookmarkedPostsCount ?? 0}
        profileImageUrl={member?.profileImgUrl ?? ''}
      />
      <div css={S.contentWrapper}>
        <OptionBar
          selectedGroup={selectedGroup}
          selectedOption={selectedOption}
          options={options}
          onGroupSelect={handleGroupSelect}
          onOptionSelect={handleOptionSelect}
        />
        <div css={S.contentList}>{renderContent()}</div>
        <div ref={ref} css={S.loader} />
      </div>
    </div>
  );
};

export default MyPage;

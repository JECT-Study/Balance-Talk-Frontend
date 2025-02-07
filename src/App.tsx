/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MyPage from '@/pages/MyPage/MyPage';
import SearchGamePage from '@/pages/SearchResultsPage/SearchGamePage';
import SearchTalkPickPage from '@/pages/SearchResultsPage/SearchTalkPickPage';
import NotificationPage from '@/pages/mobile/NotificationPage/NotificationPage';
import BalanceGameCategoriesPage from '@/pages/mobile/BalanceGameCategoriesPage/BalanceGameCategoriesPage';
import BalanceGameLayout from '@/pages/MyPage/BalanceGameLayout';
import TalkPickLayout from '@/pages/MyPage/TalkPickLayout';
import TalkPickBookmarks from '@/pages/MyPage/TalkPick/TalkPickBookmarks';
import TalkPickWritten from '@/pages/MyPage/TalkPick/TalkPickWritten';
import BalanceGameVotes from '@/pages/MyPage/BalanceGame/BalanceGameVotes';
import BalanceGameBookmarks from '@/pages/MyPage/BalanceGame/BalanceGameBookmarks';
import TalkPickVotes from '@/pages/MyPage/TalkPick/TalkPickVotes';
import TalkPickComments from '@/pages/MyPage/TalkPick/TalkPickComments';
import BalanceGameWritten from '@/pages/MyPage/BalanceGame/BalanceGameWritten';
import BalanceGameEditPage from '@/pages/BalanceGameEditPage/BalanceGameEditPage';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import { PATH } from './constants/path';
import { useTokenRefresh } from './hooks/common/useTokenRefresh';
import { Layout, LayoutNoFooter } from './layout/layout';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import ChangeUserInfoPage from './pages/ChangeUserInfoPage/ChangeUserInfoPage';
import TalkPickPage from './pages/TalkPickPage/TalkPickPage';
import TalkPickPlacePage from './pages/TalkPickPlacePage/TalkPickPlacePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignUpMobilePage from './pages/mobile/SignUpMobilePage/SignUpMobilePage';
import BalanceGamePage from './pages/BalanceGamePage/BalanceGamePage';
import BalanceGameMobilePage from './pages/mobile/BalanceGameMobilePage/BalanceGameMobilePage';
import BalanceGameCreationPage from './pages/BalanceGameCreationPage/BalanceGameCreationPage';
import BalanceGameCreationMobilePage from './pages/mobile/BalanceGameCreationMobilePage/BalanceGameCreationMobilePage';
import { useNewSelector } from './store';
import { selectAccessToken, selectIsRefreshing } from './store/auth';
import useIsMobile from './hooks/common/useIsMobile';
// import NotAuthRoutes from './components/Routes/NotAuthRoutes';
// import { useMemberQuery } from './hooks/api/member/useMemberQuery';
// import { useParseJwt } from './hooks/common/useParseJwt';
// import FindPasswordPage from './pages/FindPasswordPage/FindPasswordPage';
// import TodayTalkPickPage from './pages/TodayTalkPickPage/TodayTalkPickPage';
// import DeletePage from './pages/MyPage/DeletePage/DeletePage';
// import HistoryPage from './pages/MyPage/HistoryPage/HistoryPage';
// import BookmarksPage from './pages/MyPage/HistoryPage/TabPage/BookmarksPage/BookmarksPage';
// import CommentsPage from './pages/MyPage/HistoryPage/TabPage/CommentsPage';
// import PostsPage from './pages/MyPage/HistoryPage/TabPage/PostsPage';
// import VotedPostsPage from './pages/MyPage/HistoryPage/TabPage/VotedPostsPage';
// import UpdatePage from './pages/MyPage/UpdatePage/UpdatePage';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// import PostList from './pages/PostListPage/PostListPage';
// import PostPage from './pages/PostPage/PostPage';
// import SearchResultPage from './pages/SearchResultPage/SearchResultPage';
// import SignUpPage from './pages/SignUpPage/SignUpPage';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useIsMobile();
  const accessToken = useNewSelector(selectAccessToken);
  const isTokenRefreshing = useNewSelector(selectIsRefreshing);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');

    if (status === 'already_registered') {
      navigate(`/${PATH.LOGIN}`, { state: { status } });
    }
  }, [location.search, navigate]);
  useTokenRefresh();

  if (isTokenRefreshing) return <LoadingPage />;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route
            path={PATH.SIGN_UP}
            element={isMobile ? <SignUpMobilePage /> : <SignUpPage />}
          />
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.CHANGE.PASSWORD} element={<ChangePasswordPage />} />
          <Route path={PATH.TODAY_TALKPICK} element={<TalkPickPage />} />
          <Route path={PATH.TALKPICK_PLACE} element={<TalkPickPlacePage />} />
          <Route path={PATH.TALKPICK()} element={<TalkPickPage />} />
          <Route
            path={PATH.BALANCEGAME.VIEW()}
            element={isMobile ? <BalanceGameMobilePage /> : <BalanceGamePage />}
          />
          <Route
            path={PATH.BALANCEGAMECATEGORIES}
            element={<BalanceGameCategoriesPage />}
          />
          {/* <Route path="/search" element={<SearchResultsPage />} /> */}
          {/* <Route path="posts" element={<PostList />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="searchResult" element={<SearchResultPage />} />
          <Route element={<ProtectedRoutes member={member} />}>
            <Route path="post/create" element={<CreatePostPage />} />
          </Route> */}
        </Route>

        <Route path={`/${PATH.RESULT}`} element={<LayoutNoFooter />}>
          <Route index element={<SearchResultsPage />} />
          <Route path={PATH.SEARCH.ALL} element={<SearchResultsPage />} />
          <Route path={PATH.SEARCH.TALKPICK} element={<SearchTalkPickPage />} />
          <Route path={PATH.SEARCH.GAME} element={<SearchGamePage />} />
        </Route>

        <Route element={<ProtectedRoutes token={accessToken} />}>
          <Route path={PATH.MYPAGE} element={<LayoutNoFooter />}>
            <Route element={<MyPage />}>
              <Route path="talkpick" element={<TalkPickLayout />}>
                <Route path="bookmarks" element={<TalkPickBookmarks />} />
                <Route path="written" element={<TalkPickWritten />} />
                <Route path="votes" element={<TalkPickVotes />} />
                <Route path="comments" element={<TalkPickComments />} />
              </Route>
              <Route path="balancegame" element={<BalanceGameLayout />}>
                <Route path="bookmarks" element={<BalanceGameBookmarks />} />
                <Route path="votes" element={<BalanceGameVotes />} />
                <Route path="written" element={<BalanceGameWritten />} />
              </Route>
              <Route index element={<TalkPickBookmarks />} />
            </Route>
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path={PATH.CREATE.TALK_PICK} element={<CreatePostPage />} />
            <Route
              path={PATH.CREATE.GAME}
              element={
                isMobile ? (
                  <BalanceGameCreationMobilePage />
                ) : (
                  <BalanceGameCreationPage />
                )
              }
            />
            <Route
              path={PATH.BALANCEGAME.EDIT()}
              element={<BalanceGameEditPage />}
            />
            <Route
              path={PATH.CHANGE.PROFILE}
              element={<ChangeUserInfoPage />}
            />
            {isMobile ?? ( // TODO: 404페이지 생성시 조건부로 수정
              <Route path={PATH.NOTIFICATION} element={<NotificationPage />} />
            )}
          </Route>
        </Route>

        {/* <Route element={<NotAuthRoutes member={member} />}>
          <Route element={<LayoutNoSearch />}>
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route path={PATH.PW} element={<FindPasswordPage />} />
            <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes member={member} />}>
          <Route path={PATH.MYPAGE} element={<LayoutMypage />}>
            <Route path={PATH.HISTORY.MAIN} element={<HistoryPage />}>
              <Route path={PATH.HISTORY.POSTS} element={<PostsPage />} />
              <Route path={PATH.HISTORY.COMMENTS} element={<CommentsPage />} />
              <Route
                path={PATH.HISTORY.VOTED_POSTS}
                element={<VotedPostsPage />}
              />
              <Route
                path={PATH.HISTORY.BOOKMARKS}
                element={<BookmarksPage />}
              />
            </Route>
            <Route path={PATH.UPDATE} element={<UpdatePage />} />
            <Route path={PATH.DELETE} element={<DeletePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </LocalizationProvider>
  );
};

export default App;

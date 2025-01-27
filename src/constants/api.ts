import { Id } from '@/types/api';

export const HTTP_STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const END_POINT = {
  // member API
  SIGN_UP: '/members/join',
  LOGIN: '/members/login',
  LOGOUT: '/members/logout',
  REFRESH: '/members/reissue',
  ALL_MEMBERS: '/members',
  EDIT_MEMBERS: '/members',
  MEMBER: '/members/info',
  MEMBER_PROFILE: (id: number) => `/members/${id}/profile`,
  MEMBER_IMAGE: '/members/image',
  MEMBER_NICKNAME: '/members/nickname',
  MEMBER_PASSWORD: '/members/password',
  NICKNAME_VERIFY: '/members/duplicate',
  PASSWORD_VERIFY: '/members/verify-password',

  // email API
  EMAIL_SIGNUP_CODE: '/email/signup/code',
  EMAIL_RESET_CODE: '/email/reset/code',
  EMAIL_VERIFY: '/email/verify',
  EMAIL_RESET: '/email/reset',
  EMAIL_REQUEST: '/email/request',
  FIND_PW: '/email/password',

  // mypage API
  MYPAGE_POSTS: '/myPage/history/posts',
  MYPAGE_COMMENTS: '/myPage/history/comments',
  MYPAGE_VOTEDPOSTS: '/myPage/history/votedPosts',
  MYPAGE_BOOKMARKS: '/myPage/history/bookmarks',

  // mypages API
  MYPAGES_TALKS_WRITTEN: (page: number, size: number) =>
    `/my/talks/written?page=${page}&size=${size}`,
  MYPAGES_TALKS_VOTES: (page: number, size: number) =>
    `/my/talks/votes?page=${page}&size=${size}`,
  MYPAGES_TALKS_COMMENTS: (page: number, size: number) =>
    `/my/talks/comments?page=${page}&size=${size}`,
  MYPAGES_TALKS_BOOKMARKS: (page: number, size: number) =>
    `/my/talks/bookmarks?page=${page}&size=${size}`,
  MYPAGES_GAMES_WRITTEN: (page: number, size: number) =>
    `/my/game-sets/written?page=${page}&size=${size}`,
  MYPAGES_GAMES_VOTES: (page: number, size: number) =>
    `/my/game-sets/votes?page=${page}&size=${size}`,
  MYPAGES_GAMES_BOOKMARKS: (page: number, size: number) =>
    `/my/game-sets/bookmarks?page=${page}&size=${size}`,

  // search API
  SEARCH_GAME: (query: string, page: number, size: number, sort: string) =>
    `/search/game-sets?query=${query}&page=${page}&size=${size}&sort=${sort}`,
  SEARCH_TALKPICK: (query: string, page: number, size: number, sort: string) =>
    `/talks/search?query=${query}&page=${page}&size=${size}&sort=${sort}`,

  // file API
  FILE_UPLOAD: '/images',
  FILE_DELETE: (fileId: number) => `/images/${fileId}`,

  // talk pick API
  TALKPICK: (talkPickId: Id) => `/talks/${talkPickId}`,
  CREATE_TALKPICK: '/talks',
  TALKPICK_LIST: '/talks',
  TALKPICK_SUMMARY: (talkPickId: Id) => `/talks/${talkPickId}/summary`,
  TODAY_TALKPICK: '/talks/today',
  TEMP_TALKPICK: '/talks/temp',
  BEST_TALKPICK: '/talks/best',

  // vote API
  VOTE_TALK: (talkPickId: Id) => `/votes/talks/${talkPickId}`,
  VOTE_GAME: (gameId: Id) => `/votes/games/${gameId}`,

  // comment API
  COMMENTS: (talkPickId: Id) => `/talks/${talkPickId}/comments`,
  BEST_COMMENT: (talkPickId: Id) => `talks/${talkPickId}/comments/best`,
  CREATE_COMMENT: (talkPickId: Id) => `/talks/${talkPickId}/comments`,
  EDIT_COMMENT: (talkPickId: Id, commentId: Id) =>
    `talks/${talkPickId}/comments/${commentId}`,
  DELETE_COMMENT: (talkPickId: Id, commentId: Id) =>
    `talks/${talkPickId}/comments/${commentId}`,
  LIKE_COMMENT: (talkPickId: Id, commentId: Id) =>
    `/likes/talks/${talkPickId}/comments/${commentId}`,
  DELETE_LIKE_COMMENT: (talkPickId: Id, commentId: Id) =>
    `/likes/talks/${talkPickId}/comments/${commentId}`,
  REPLIES: (talkPickId: Id, commentId: Id) =>
    `talks/${talkPickId}/comments/${commentId}/replies`,
  CREATE_REPLY: (talkPickId: Id, commentId: Id) =>
    `talks/${talkPickId}/comments/${commentId}/replies`,

  // bookmark API
  BOOKMARK_TALKPICK: (talkPickId: Id) => `/bookmarks/talks/${talkPickId}`,
  BOOKMARK_GAME_DONE: (gameSetId: Id) => `/bookmarks/game-sets/${gameSetId}`,
  BOOKMARK_GAME: (gameSetId: Id, gameId: Id) =>
    `/bookmarks/game-sets/${gameSetId}/games/${gameId}`,
  DELETE_BOOKMARK_GAME: (gameSetId: Id) => `/bookmarks/game-sets/${gameSetId}`,

  // game API
  CREATE_GAME: '/games',
  TEMP_GAME: '/games/temp',
  NEW_GAME: '/games/new',
  BEST_GAME: '/games/popular',
  LATEST_GAME: '/games/latest',
  GAME_SET: (gameSetId: Id) => `/games/${gameSetId}`,
  EDIT_GAME: (gameId: Id) => `/games/${gameId}`,
  DELETE_GAME: (gameId: Id) => `/games/${gameId}`,

  // report API
  REPORT_COMMENT: (talkPickId: Id, commentId: Id) =>
    `/reports/talks/${talkPickId}/comments/${commentId}`,

  // notification API
  NOTIFICATON: 'notifications',
  READ_NOTIFICATION: (msgId: Id) => `/notifications/${msgId}/read`,

  // friends API
  FRIENDS: '/friends',
  FRIENDS_LIST: '/friends/images',
};

export const AXIOS = {
  TIMEOUT: 5000,
};

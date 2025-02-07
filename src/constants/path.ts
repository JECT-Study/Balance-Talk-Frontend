export const PATH = {
  LOGIN: 'login',
  SIGN_UP: 'signup',
  MYPAGE: 'mypage',
  RESULT: 'result',
  SEARCH: {
    MAIN: 'search/all',
    ALL: 'search/all',
    TALKPICK: 'search/talkpick',
    GAME: 'search/game',
  },
  CREATE: {
    TALK_PICK: 'create/talkpick',
    GAME: 'create/balancegame',
  },
  CHANGE: {
    PASSWORD: 'change/password',
    PROFILE: 'change/profile',
  },
  TODAY_TALKPICK: 'todaytalkpick',
  TALKPICK_PLACE: 'talkpickplace',
  BALANCEGAME: {
    VIEW: (setId: number | string = ':setId') => `balancegame/${setId}`,
    EDIT: (gameSetId: number | string = ':gameSetId') =>
      `balancegame/edit/${gameSetId}`,
  },
  TALKPICK: (talkPickId: number | string = ':talkPickId') =>
    `talkpick/${talkPickId}`,
  NOTIFICATION: 'notifications',
  BALANCEGAMECATEGORIES: 'balancegame',
  // PW: 'findPassword',
  // HISTORY: {
  //   MAIN: 'history',
  //   POSTS: 'posts',
  //   COMMENTS: 'comments',
  //   VOTED_POSTS: 'votedPosts',
  //   BOOKMARKS: 'bookMarks',
  // },
  // UPDATE: 'update',
  // DELETE: 'delete',
} as const;

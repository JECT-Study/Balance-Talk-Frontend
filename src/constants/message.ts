export const ERROR = {
  EMAIL: {
    NOT_EXIST: '존재하지 않는 이메일입니다.',
    EXIST: '이미 가입한 이메일입니다.',
    FORM: '이메일 형식이 올바르지 않습니다.',
    EMPTY: '이메일을 입력해주세요.',
  },
  PW: {
    NOT_MATCH: '비밀번호가 일치하지 않습니다.',
    FORM: '영문+숫자+특수문자 10자 이상 20자 이하로 입력해주세요.',
    EMPTY: '비밀번호를 입력해주세요.',
  },
  CODE: {
    NOT_MATCH: '인증번호가 일치하지 않습니다.',
    EMPTY: '인증번호를 입력해주세요.',
  },
  NICKNAME: {
    NOT_EXIST: '존재하지 않는 닉네임입니다.',
    EXIST: '이미 존재하는 닉네임입니다.',
    FORM: '닉네임은 2자 이상 10자 이하로 입력해주세요.',
    EMPTY: '닉네임을 입력해주세요.',
  },
  LOGIN: {
    FAIL: '이메일 또는 비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
  },
  CREATE: {
    OPTION_FORM: '글자 수는 최대 10자까지 입력해주세요.',
    EMPTY_TITLE: '제목을 작성해주세요!',
    EMPTY_OPTION: '선택지 2개를 모두 작성해주세요!',
    EMPTY_CONTENT: '내용을 작성해주세요!',
    IMAGE_UPLOAD: '이미지를 업로드하고 있어요!',
    FAIL: '게시글 작성에 실패했습니다. 다시 시도해주세요.',
  },
  SAVE: {
    FAIL: '게시글 임시 저장에 실패했습니다. 다시 시도해주세요.',
  },
  COMMENT: {
    MY_COMMENT_LIKE: `본인의 댓글에는 '좋아요' 할 수 없습니다.`,
    REPORT_AGAIN: '이미 신고한 댓글입니다.',
  },
  BOOKMARK: {
    MY_TALKPICK: '본인이 작성한 톡픽은 저장할 수 없습니다.',
    MY_GAME: '본인이 만든 밸런스게임은 저장할 수 없습니다.',
    GAME_FAIL: '게임 북마크에 실패했습니다.',
    GAME_DELETE_FAIL: '게임 북마크 삭제에 실패했습니다.',
    POST_MUTATE_FAIL: '컨텐츠가 벌써 떠나 버렸어요ㅠㅠ',
    DELETE_MUTATE_FAIL: '저장 해제에 실패했어요.',
  },
  TEMPGAME: {
    LOAD: '임시 저장 데이터를 불러오는 데 실패했습니다.',
    SAVE: '임시 저장에 실패했습니다. 다시 시도해주세요.',
  },
  IMAGE: {
    UPLOAD: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
    DELETE: '이미지가 삭제에 실패했습니다. 다시 시도해주세요.',
  },
  CREATEGAME: {
    EMPTY_DATA: '게임 데이터가 없습니다.',
    FAIL: '게임 생성에 실패했습니다.',
  },
  VALIDATE: {
    GAME_IMAGE: 'A와 B의 이미지가 모두 없거나 모두 있어야 합니다!',
    OPTION: '모든 옵션의 설명을 입력해주세요!',
  },
  GAME: {
    NOT_EXIST: '유효하지 않은 게임입니다.',
  },
} as const;

export const SUCCESS = {
  EMAIL: {
    AVAILABLE: '인증되었습니다. 해당 이메일로 인증번호가 발송되었습니다.',
  },
  CODE: {
    MATCH: '인증번호가 일치합니다.',
  },
  NICKNAME: {
    AVAILABLE: '사용 가능한 닉네임입니다.',
  },
  SIGN_UP: '회원가입 완료!',
  LOGIN: '로그인 완료!',
  LOGOUT: '로그아웃되었습니다.',
  COPY: {
    LINK: '복사 완료!',
  },
  COMMENT: {
    REPORT: '신고 완료되었습니다.',
  },
  BOOKMARK: {
    POST_MUTATE_SUCCESS: '다시 저장했어요.',
    DELETE_MUTATE_SUCCESS: '저장을 해제했어요.',
  },
  EDIT_PROFILE: '수정 완료 되었습니다!',
  POST: {
    CREATE: '등록 완료!',
    EDIT: '수정 완료!',
    SAVE: '임시저장 완료!',
  },
  TEMPGAME: {
    LOAD: '임시 저장 데이터를 불러왔습니다!',
    SAVE: ' 임시 저장이 완료되었습니다!',
  },
  IMAGE: {
    UPLOAD: '이미지가 업로드 되었습니다!',
    DELETE: '이미지가 삭제되었습니다!',
  },
  CREATEGAME: {
    CREATE: '등록되었습니다!',
  },
} as const;

export const NOTICE = {
  REQUIRED: {
    LOGIN: '투표 결과와 댓글은 로그인 후 확인할 수 있습니다.',
    VOTE: '투표 후에 확인할 수 있습니다.',
  },
  STATUS: {
    NOT_READY: '아직 준비 중인 서비스입니다!',
  },
  LOGIN: {
    EXPIRED: '로그인 시간이 만료되었습니다. 다시 로그인해주세요.',
  },
} as const;

export const NULL = {
  POSTS: '작성한 게시글이 없습니다.',
  COMMENTS: '작성한 댓글이 없습니다.',
  VOTES: '투표한 게시글이 없습니다.',
  BOOKMARKS: '북마크한 게시글이 없습니다.',
} as const;

export const PLACE_HOLDER = {
  POST: {
    TITLE: '게시글 제목을 입력해 주세요.',
    CHOICE_TITLE: '선택지 제목을 입력해 주세요.',
    CHOICE_DESCRIPTION: '선택지 설명을 입력해 주세요.',
    CONTENT: '다른 토커들에게 내 이야기를 공유하고 의견을 들어보세요!',
  },
};

export const PRIVACY_POLICY = `[[PICK-O]]는 사용자의 개인정보를 중요하게 생각하며, '개인정보 보호법' 및 관련 법령을 준수하고 있습니다. 본 개인정보처리방침은 [[PICK-O]]의 서비스 이용과 관련하여 사용자의 개인정보가 어떻게 수집, 이용, 공유되는지 설명합니다.

-사용자가 소셜 사이트의 API를 통해 로그인할 때 연령대, 성별, 아이디, 비밀번호, 프로필 정보(예: 프로필 사진, 이름 등)를 수집합니다. 
-사용자의 개인정보의 수집 및 이용 목적은 다음과 같습니다. 사용자의 로그인 및 인증 / 사용자가 좋아하는 밸런스 게임과 글의 저장 및 관리 / 서비스 품질 향상을 위한 사용자 분석
맞춤형 콘텐츠 제공
-개인정보의 보관 및 파기사용자의 개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다. 단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.
-사용자의 개인정보를 외부에 제공하거나 공유하지 않습니다. 다만, 법령에 의거하거나 사용자의 동의를 받은 경우에는 예외로 합니다.
-사용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 수집 및 이용에 대한 동의를 철회할 수 있습니다. 다만, 소셜 로그인 이용 시 관련 사항은 소셜 로그인 계정 정보 제공사로 문의 가능합니다.
-해당 개인정보처리방침은 시행일로부터 적용되며, 법령이나 회사 정책에 따라 변경될 수 있습니다. 변경사항이 있을 경우, 변경된 방침은 즉시 웹사이트에 게시됩니다.

시행일: 2024.07.15
[[PICK-O]]는 사용자의 개인정보를 소중히 다루며, 개인정보 보호를 위해 최선을 다하겠습니다.`;

export const TAG_CONTENT = [
  '#_몰입하는 즐거움',
  '#_함께하는 즐거움',
  '#취지직 스터디',
  '',
  '프로젝트 3팀',
];

export const BOLD_CONTENT = {
  emailLabel: '개발 이슈 관련 이메일',
  email: 'picko12300@gmail.com',
};

export const RIGHT_CONTAINER_LINKS = [
  '오늘의 톡픽',
  '톡픽 쓰기',
  '톡&픽 플레이스',
  '낼톡픽 투표하기',
  '랜덤 밸런스 게임',
  '주제별 밸런스게임',
  '개인정보처리방침',
];

export const NO_RESULT_MESSAGE = {
  TITLE_PREFIX: {
    DEFAULT: '',
    BALANCE_GAME: '밸런스게임 게시물에는',
    TALK_PICK: '톡픽 게시물에는',
  },
  TITLE_SUFFIX: '에 대한 검색 결과가 없습니다.',
  BODY1: '단어의 철자가 정확한지 확인해 보세요.',
  BODY2: '검색 옵션을 변경해 다시 검색해 보세요.',
};

export const SUMMARY = {
  TITLE: '세 줄 요약',
  PENDING: 'AI가 세 줄 요약을 하고 있어요!',
  FAIL: {
    UNKNOWN: '알 수 없는 오류가 발생했어요.',
    REFRESH: '새로고침을 눌러주세요!',
  },
  NOT_REQUIRED: {
    TEXT_VALIDATION: '본문이 너무 짧아 요약할 수 없어요.',
    TEXT_CHECK: '전체 글을 확인해 주세요!',
  },
};

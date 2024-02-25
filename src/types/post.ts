export type ImageInfo = {
  optionImg: string;
  optionTitle: string;
  // 게시물 Description 필요
  optionDescription?: string;
};

export type Post = {
  id: number;
  title: string;
  views: number;
  commentCount: number;
  likeCount: number;
  myBookmark: boolean;
  myLike: boolean;
  deadline: string;
  tags: string[];
  balanceOptions: ImageInfo[];
  // 게시물을 생성한 사람의 id도 필요
  creator?: number;
};

export type VoteInfo = {
  optionTitle: string;
  voteCount: number;
};

export type CreatePost = {
  title: string;
  postCategory: string;
  deadline: string;
  tags: string[];
  balanceOptions: CreatePostImage[];
};

export type CreatePostImage = {
  title: string;
  description: string;
  file: CreatePostImageFile;
};

export type CreatePostImageFile = {
  uploadName: string;
  path: string;
  type: string;
  size: string;
};

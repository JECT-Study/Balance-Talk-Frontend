import { PaginationType } from '@/types/pagination';

export interface TalkPickBaseInfoItem {
  id: number;
  title: string;
  bookmarks: number;
  commentCount: number;
  editedAt: string;
  bookmarked: boolean;
}

export interface MyContentItem {
  id: number;
  editedAt: string;
  title: string;
  commentCount: number;
  bookmarks: number;
  showBookmark: boolean;
  bookmarked: boolean;
}

export interface InfoItem {
  id: number;
  editedAt: string;
  title: string;
  prefix: string;
  content: string;
  commentCount: number;
  bookmarks: number;
}

export interface MyBalanceGameItem {
  writerId: number;
  gameId: number;
  gameSetId: number;
  editedAt: string;
  optionAImg: string;
  optionBImg: string;
  title: string;
  mainTagName: string;
  subTag: string;
  bookmarked?: boolean;
  showBookmark?: boolean;
  size?: 'large' | 'medium' | 'small';
}

export interface BookmarkInfoItemResponse extends TalkPickBaseInfoItem {}

export interface WrittenInfoItemResponse extends TalkPickBaseInfoItem {}

export interface VoteInfoItemResponse extends TalkPickBaseInfoItem {
  voteOption: string;
}

export interface CommentInfoItemResponse extends TalkPickBaseInfoItem {
  commentContent: string;
}

export interface MyWritten extends PaginationType {
  content: WrittenInfoItemResponse[];
}

export interface MyVote extends PaginationType {
  content: VoteInfoItemResponse[];
}

export interface MyComment extends PaginationType {
  content: CommentInfoItemResponse[];
}

export interface MyBookmark extends PaginationType {
  content: BookmarkInfoItemResponse[];
}

export interface GameWritten extends PaginationType {
  content: MyBalanceGameItem[];
}

export interface GameVote extends PaginationType {
  content: MyBalanceGameItem[];
}

export interface GameBookmark extends PaginationType {
  content: MyBalanceGameItem[];
}

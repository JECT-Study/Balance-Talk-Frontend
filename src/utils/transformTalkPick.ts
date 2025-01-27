import {
  BookmarkInfoItemResponse,
  CommentInfoItemResponse,
  InfoItem,
  MyContentItem,
  VoteInfoItemResponse,
  WrittenInfoItemResponse,
} from '@/types/mypages';

export const transformBookmarkItem = (
  item: BookmarkInfoItemResponse,
): MyContentItem => {
  return {
    id: item.id,
    title: item.title,
    bookmarks: item.bookmarks,
    commentCount: item.commentCount,
    editedAt: item.editedAt,
    bookmarked: item.bookmarked,
    showBookmark: true,
  };
};

export const transformWrittenItem = (
  item: WrittenInfoItemResponse,
): MyContentItem => {
  return {
    id: item.id,
    title: item.title,
    bookmarks: item.bookmarks,
    commentCount: item.commentCount,
    editedAt: item.editedAt,
    bookmarked: item.bookmarked,
    showBookmark: false,
  };
};

export const transformVoteItem = (item: VoteInfoItemResponse): InfoItem => {
  return {
    id: item.id,
    editedAt: item.editedAt,
    title: item.title,
    prefix: '내 선택',
    content: item.voteOption,
    commentCount: item.commentCount,
    bookmarks: item.bookmarks,
  };
};

export const transformCommentItem = (
  item: CommentInfoItemResponse,
): InfoItem => {
  return {
    id: item.id,
    editedAt: item.editedAt,
    title: item.title,
    prefix: '내 댓글',
    content: item.commentContent,
    commentCount: item.commentCount,
    bookmarks: item.bookmarks,
  };
};

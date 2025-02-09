import { PaginationType } from './pagination';

export type TalkPickField = {
  title: string;
  content: string;
  optionA: string;
  optionB: string;
  sourceUrl: string;
};

export type TalkPickDetail = {
  id: number;
  baseFields: TalkPickField;
  summary: TalkPickSummary;
  summaryStatus: 'PENDING' | 'SUCCESS' | 'FAIL' | 'NOT_REQUIRED';
  imgUrls: string[];
  fileIds: number[];
  votesCountOfOptionA: number;
  votesCountOfOptionB: number;
  views: number;
  bookmarks: number;
  myBookmark: boolean;
  votedOption: 'A' | 'B' | null;
  writer: string;
  createdAt: string;
  isEdited: boolean;
};

export type TalkPickSummary = {
  summaryFirstLine: string | null;
  summarySecondLine: string | null;
  summaryThirdLine: string | null;
};

export type TalkPickListItem = {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  views: number | string;
  bookmarks: number | string;
};

export interface TalkPickListPagination extends PaginationType {
  content: TalkPickListItem[];
}

export type NewTalkPick = {
  baseFields: TalkPickField;
  fileIds: number[];
};

export type EditTalkPick = {
  baseFields: TalkPickField;
  newFileIds: number[];
  deleteFileIds: number[];
};

export interface TempTalkPick extends NewTalkPick {
  imgUrls: string[];
}

export interface NewTempTalkPick extends EditTalkPick {
  isLoaded: boolean;
}

export type TodayTalkPick = {
  id: number;
  title: string;
  optionA: string;
  optionB: string;
};

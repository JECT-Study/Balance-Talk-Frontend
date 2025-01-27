import { PaginationType } from './pagination';

export interface GameOption {
  id: number;
  name: string;
  imgUrl: string | null;
  description: string;
  optionType: 'A' | 'B';
}

export interface GameDetail {
  id: number;
  description?: string;
  gameOptions: GameOption[];
  votesCountOfOptionA: number;
  votesCountOfOptionB: number;
  myBookmark: boolean;
  votedOption: 'A' | 'B' | null;
}

export interface GameSet {
  member: string;
  title: string;
  createdAt: string;
  mainTag: string;
  subTag: string;
  gameDetailResponses: GameDetail[];
  isEndGameSet: boolean;
  isEndBookmarked: boolean;
}

export interface Game {
  title: string;
  mainTag: string;
  subTag: string;
  images: string[];
  showBookmark?: boolean;
  bookmarked?: boolean;
}

export interface GameContent extends Game {
  writerId: number;
  id: number;
}

export interface GameItem extends GameContent {
  myBookMark: boolean;
  myVote: boolean;
}

export interface GamesPagination extends PaginationType {
  content: GameContent[];
}

export interface GameParams {
  page: number;
  size: number;
  tagName?: string;
}

export interface BalanceGameOption {
  id: number;
  name: string;
  imgUrl: string;
  fileId: number | null;
  description: string;
  optionType: 'A' | 'B';
  imageFile?: File | null;
}

export interface BalanceGameSet {
  description: string;
  gameOptions: BalanceGameOption[];
}

export interface BalanceGame {
  title: string;
  mainTag: string;
  subTag: string;
  games: BalanceGameSet[];
}

export interface TempGameOption {
  name: string;
  description: string;
  fileId?: number | null;
  imgUrl?: string;
  optionType: 'A' | 'B';
}

export interface TempGameSet {
  description: string;
  tempGameOptions: TempGameOption[];
}

export interface TempGame {
  title: string;
  isLoaded?: boolean;
  tempGames: TempGameSet[];
}

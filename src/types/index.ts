export interface Tweet {
  id: string;
  userlogo: string;
  username: string;
  userNickname: string;
  tweetText: string;
  tweetDate: string;
  lelekaLink?: string;
  retweetCount: number;
  tweetQuoteCount: number;
  likeCount: number;
  commentCount?: number;
  isVerified?: boolean;
}

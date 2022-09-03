export interface MongoArtifacts {
  _id: string;
}

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

export interface Tweet2 extends MongoArtifacts {
  authorId: string;
  content: string;
  createdAt: string;
  repliedTo?: string;
  updatedAt: string;
  stats: {
    likes: number;
    retweets: number;
    comments: number;
  };
}

export interface MongoArtifacts {
  _id: string;
}

// L - loading; E - error
export type LE<T> = T & {
  isLoading?: boolean;
  error?: string | Error;
};

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
  author: Partial<User>;
  content: string;
  createdAt: string;
  repliedTo?: string;
  updatedAt: string;
  stats: {
    likes: number;
    retweets: number;
    comments?: number;
  };
}

export interface User extends MongoArtifacts {
  password?: string;
  username: string;
  name?: string;
  location?: string;
  url?: string;
  description?: string;
  verified?: boolean;
  followersCount?: number;
  friendsCount?: number;
  listedCount?: number;
  favouritesCount?: number;
  statusesCount?: number;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  profile: {
    firstName?: string;
    lastName?: string;
    avatar: string;
    banner?: string;
    bio?: string;
    birthDate?: string;
    phone?: string;
    gender?: string;
  };
  auth?: {
    local?: {
      accessToken?: string;
      refreshToken?: string;
    };
    twitter?: {
      accessToken?: string;
      refreshToken?: string;
    };
  };
}

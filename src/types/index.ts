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
  repliedTo?: Tweet2;
  updatedAt: string;
  stats: {
    likes: number;
    retweets: number;
    comments?: number;
  };
}

export interface Like extends MongoArtifacts {
  tweet: Tweet2;
  user: {
    profile: { avatar: string };
    username: string;
  };
}

export interface Tag extends MongoArtifacts {
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User extends MongoArtifacts {
  password?: string;
  username: string;
  name?: string;
  location?: string;
  url?: string;
  description?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  stats: {
    listedCount?: number;
    favouritesCount?: number;
    statusesCount?: number;
    followersCount?: number;
    followingCount?: number;
  };
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

export interface Bookmark extends MongoArtifacts {
  tweet: Tweet2;
  owner: User;
  createdAt: string;
  updatedAt?: string;
}

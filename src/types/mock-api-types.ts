import { FollowStatus } from "./constants";

export interface DbEntity {
  id?: string;
}
export interface MockUser extends DbEntity {
  userName: string;
  userUrl: string;
  userFirstName: string;
  userLastName: string;
  userCaption?: string;
  userPhotoUrl?: string;
  followStatus: FollowStatus; //future users
  following?: number;
  followers?: number;
  _id?: string; //poxyi
}

export interface PaginationParamsResult<T = object> {
  docs: Array<T>;
  limit: number;
  hasNextPage: boolean;
  page: number;
}

export interface MockTrend extends DbEntity {
  categoryName: string;
  categoryValue: string;
  contentRefName: string;

  tweetsCount: number;
}

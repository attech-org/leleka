import { FollowStatus } from "./constants";

export interface DbEntity {
  id: string;
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
}

export interface PaginationParamsResult {
  // eslint-disable-next-line
  docs: Array<any>;
  limit: number;
  hasNextPage: boolean;
  page: number;
}
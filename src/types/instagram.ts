export interface StringListData {
  href?: string;
  value: string;
  timestamp?: number;
}

export interface FollowerData {
  title?: string;
  string_list_data: StringListData[];
}

export interface FollowingData {
  title: string;
  string_list_data: StringListData[];
}

export interface InstagramFollowingResponse {
  relationships_following: FollowingData[];
}

export interface Unfollower {
  username: string;
  profileUrl: string;
}

export interface Stats {
  totalFollowing: number;
  totalFollowers: number;
  unfollowersCount: number;
}
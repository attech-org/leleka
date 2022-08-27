import React, { useEffect, useState } from "react";

import SingleTweet from "../components/SingleTweet";
import { FeedPostData } from "../MOCKS/homeFeedPage";
// import { FollowStatus } from "../types/constants";
import { PaginationParamsResult } from "../types/mock-api-types";
import { TweetPost } from "./FeedPosts";
import InfiniteList from "./InfiniteList";
// import Layout from "./Layout";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ProfileTweetsPage: React.FunctionComponent = () => {
  const [mockUsers, setMockUsers] = useState<PaginationParamsResult>();
  const [firstArg, setFirstArg] = useState(0);
  const [secondArg, setSecondArg] = useState(10);

  const fetchAndProcessData = async (page = 0) => {
    const mockData: Array<TweetPost> = FeedPostData.slice(firstArg, secondArg);

    await sleep(2000);
    setMockUsers({
      docs: [...(mockUsers?.docs || []), ...mockData],
      hasNextPage: true,
      limit: 10,
      page: page + 1,
    });

    setFirstArg((prevState) => prevState + 10);
    setSecondArg((prevState) => prevState + 10);
  };

  useEffect(() => {
    fetchAndProcessData();
  }, []);

  return (
    <>
      {mockUsers && (
        <InfiniteList
          showMore={fetchAndProcessData}
          data={mockUsers}
          itemComponent={(itemData) => (
            <SingleTweet key={itemData.id} {...itemData} />
          )}
        />
      )}
    </>
  );
};

export default ProfileTweetsPage;

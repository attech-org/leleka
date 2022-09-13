import React, { useEffect, useState } from "react";

// import SingleTweet from "../components/SingleTweet";
import MOCKTweets from "../MOCKS/tweets";
import { Tweet } from "../types";
import { Pagination } from "../types/mock-api-types";
// import InfiniteList from "./InfiniteList";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ProfileTweets: React.FunctionComponent = () => {
  const [mockUsers, setMockUsers] = useState<Pagination<Tweet>>();

  const fetchData = async (page = 0) => {
    let firstArg = 0;
    if (mockUsers?.docs.length) {
      firstArg = mockUsers?.docs.length + 1;
    }
    const mockData: Array<Tweet> = MOCKTweets.slice(firstArg, firstArg + 10);

    await sleep(2000);
    setMockUsers({
      docs: [...(mockUsers?.docs || []), ...mockData],
      hasNextPage: true,
      limit: 10,
      page: page + 1,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* {mockUsers && (
        <InfiniteList<Tweet>
          showMore={fetchData}
          data={mockUsers}
          itemComponent={(itemData) => (
            <SingleTweet key={itemData.id} {...itemData} />
          )}
        />
      )} */}
    </>
  );
};

export default ProfileTweets;

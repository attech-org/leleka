import { useEffect, useState } from "react";

import FeedSingleTweet from "../components/FeedSingleTweet";
import MOCKTweets from "../MOCKS/tweets";
import { Tweet } from "../types";
import { PaginationParamsResult } from "../types/mock-api-types";
import InfiniteList from "./InfiniteList";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const FeedPostsContainer = () => {
  const [posts, setPosts] = useState<PaginationParamsResult<Tweet>>();

  const fetchData = async (page = 0) => {
    let firstArg = 0;
    if (posts?.docs.length) {
      firstArg = posts?.docs.length + 1;
    }
    const mockData: Array<Tweet> = MOCKTweets.slice(firstArg, firstArg + 5);
    await sleep(1000);
    setPosts({
      docs: [...(posts?.docs || []), ...mockData],
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
      {posts && (
        <InfiniteList<Tweet>
          showMore={fetchData}
          data={posts}
          itemComponent={(postData) => (
            <FeedSingleTweet key={postData.id} {...postData} />
          )}
        />
      )}
    </>
  );
};

export default FeedPostsContainer;

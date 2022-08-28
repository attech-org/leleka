import { useEffect, useState } from "react";

import SingleTweet, { SingleTweetInterface } from "../components/SingleTweet";
import { FeedPostData } from "../MOCKS/homeFeedPage";
import { PaginationParamsResult } from "../types/mock-api-types";
import InfiniteList from "./InfiniteList";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TweetsWithReplies = () => {
  const [mockTweetsReplies, setmockTweetsReplies] =
    useState<PaginationParamsResult>();
  const [firstArg, setFirstArg] = useState(0);
  const [secondArg, setSecondArg] = useState(10);

  const postData = async (page = 0) => {
    const mockData: Array<SingleTweetInterface> = [];
    const pageData = FeedPostData.slice(firstArg, secondArg);
    pageData.forEach((item) => mockData.push(item));

    await sleep(2000);
    setmockTweetsReplies({
      docs: [...(mockTweetsReplies?.docs || []), ...mockData],
      hasNextPage: true,
      limit: 10,
      page: page + 1,
    });

    setFirstArg((prevState) => prevState + 10);
    setSecondArg((prevState) => prevState + 10);
  };

  useEffect(() => {
    postData();
  }, []);

  return (
    <InfiniteList
      data={mockTweetsReplies}
      showMore={postData}
      itemComponent={(itemData) => (
        <SingleTweet key={itemData.id} {...itemData} />
      )}
    />
  );
};

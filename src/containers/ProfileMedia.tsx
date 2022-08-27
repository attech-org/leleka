import { useEffect, useState } from "react";

import SingleTweet, { SingleTweetInterface } from "../components/SingleTweet";
import dataProfileMediaContainer from "../MOCKS/dataProfileMediaContainer.json";
import { PaginationParamsResult } from "../types/mock-api-types";
import InfiniteList from "./InfiniteList";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Media = () => {
  const [mockMediaPosts, setMockMediaPosts] =
    useState<PaginationParamsResult>();
  const fetchData = async (page = 1) => {
    const mockData: Array<SingleTweetInterface> = [];
    const pageData = dataProfileMediaContainer.slice(page * 5 - 5, page * 5);
    pageData.forEach((item) => mockData.push(item));

    await sleep(2000);
    setMockMediaPosts({
      docs: [...(mockMediaPosts?.docs || []), ...mockData],
      hasNextPage: true,
      limit: 5,
      page: page + 1,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {mockMediaPosts && (
        <InfiniteList
          showMore={fetchData}
          data={mockMediaPosts}
          itemComponent={(itemData) => <SingleTweet {...itemData} />}
        />
      )}
    </>
  );
};

export default Media;

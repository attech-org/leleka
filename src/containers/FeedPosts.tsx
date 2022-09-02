import { useEffect, useState } from "react";

import FeedSingleTweet from "../components/FeedSingleTweet";
import instance from "../services/api";
import { Tweet2 } from "../types";
import InfiniteList from "./InfiniteList";

// create reducer for tweet instance

// define action getFeedTweets, that will fetch all tweets from "GET:/api/tweets" and save it to redux store
// in useEffect call dispatch(getFeedTweets());

// in FeedPosts replace all logic with redux store manipultaions, like:
// const posts = useSelector((store) => store.tweets.feedPosts);

const FeedPostsContainer = () => {
  const [posts, setPosts] = useState<Tweet2[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await instance.get("api/tweets");
      setPosts(response.data);
    };

    getData();
  }, []);

  const mockPagination = {
    docs: posts,
    page: 1,
    limit: 10,
    hasNextPage: false,
  };

  return (
    <>
      <InfiniteList<Tweet2>
        showMore={() => {}}
        data={mockPagination}
        // eslint-disable-next-line
        // @ts-ignore
        itemComponent={(itemData) => <FeedSingleTweet {...itemData} />}
      />
    </>
  );
};

export default FeedPostsContainer;

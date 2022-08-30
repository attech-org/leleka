import SingleTweet from "../components/SingleTweet";
import MOCKTweets from "../MOCKS/tweets";
import { Tweet } from "../types";
import InfiniteList from "./InfiniteList";

const mockPagination = {
  docs: MOCKTweets,
  page: 1,
  limit: 10,
  hasNextPage: false,
};

const FeedPostsContainer = () => {
  return (
    <>
      <InfiniteList<Tweet>
        showMore={() => {}}
        data={mockPagination}
        itemComponent={(itemData) => <SingleTweet {...itemData} />}
      />
    </>
  );
};

export default FeedPostsContainer;

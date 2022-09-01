import SingleTweet from "../components/SingleTweet";
import tweets from "../MOCKS/tweets";
import InfiniteList from "./InfiniteList";

const mockPagination = {
  docs: tweets,
  page: 1,
  limit: 10,
  hasNextPage: false,
};

export const TweetsWithReplies: React.FunctionComponent = () => {
  return (
    <InfiniteList
      data={mockPagination}
      showMore={() => {}}
      itemComponent={(itemData) => <SingleTweet {...itemData} />}
    />
  );
};

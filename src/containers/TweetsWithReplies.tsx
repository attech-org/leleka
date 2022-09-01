import SingleTweet from "../components/SingleTweet";
import tweets from "../MOCKS/tweets";
import InfiniteList from "./InfiniteList";

export const TweetsWithReplies: React.FunctionComponent = () => {
  return (
    <InfiniteList
      data={tweets}
      showMore={() => {}}
      itemComponent={(itemData) => <SingleTweet {...itemData} />}
    />
  );
};

import SingleTweet from "../components/SingleTweet";
import tweets from "../MOCKS/tweets";
import InfiniteList from "./InfiniteList";

export const TweetsWithReplies: React.FunctionComponent = () => {
  return (
    <InfiniteList
      data={tweets}
      showMore={() => {}}
      itemComponent={(itemData) => (
        <SingleTweet
          id={""}
          userlogo={""}
          username={""}
          userNickname={""}
          tweetText={""}
          tweetDate={""}
          retweetCount={0}
          tweetQuoteCount={0}
          likeCount={0}
          {...itemData}
        />
      )}
    />
  );
};

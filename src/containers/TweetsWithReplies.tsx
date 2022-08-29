import SingleTweet from "../components/SingleTweet";
import { FeedPostData } from "../MOCKS/homeFeedPage";
import InfiniteList from "./InfiniteList";

export const TweetsWithReplies = () => {
  return (
    <InfiniteList
      data={FeedPostData}
      showMore={() => {}}
      itemComponent={(itemData) => (
        <SingleTweet
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

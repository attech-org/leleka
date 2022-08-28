import SingleTweet from "../components/SingleTweet";
import { FeedPostData } from "../MOCKS/homeFeedPage";
import InfiniteList from "./InfiniteList";

export const TweetsWithReplies = () => {
  return (
    <InfiniteList
      data={FeedPostData}
      showMore={() => {}}
      itemComponent={(itemData) => (
        <SingleTweet key={itemData.id} {...itemData} />
      )}
    />
  );
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import FeedSingleTweet from "../components/FeedSingleTweet";
import SingleTweet from "../components/SingleTweet";
import InfiniteList from "../containers/InfiniteList";
import Layout from "../containers/Layout";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";

const Tweet = () => {
  const match = useParams();
  const tweetId = match.id || "";

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(tweetsActions.fetchTweetById(tweetId));
  }, []);

  const { data } = useSelector<RootState, RootState["tweets"]["currentTweet"]>(
    (store) => store.tweets.currentTweet
  );

  const posts = useSelector<
    RootState,
    RootState["tweets"]["currentTweetReplies"]
  >((store) => store.tweets.currentTweetReplies);

  const handleShowMore = () => {
    return (
      !posts.isLoading &&
      posts.hasNextPage &&
      dispatch(tweetsActions.fetchTweetReplies({ ...posts, tweetId }))
    );
  };

  return (
    <Layout>
      {data && <SingleTweet {...data} />}
      <InfiniteList<Tweet2>
        showMore={handleShowMore}
        data={posts}
        itemComponent={(itemData) => <FeedSingleTweet {...itemData} />}
      />
    </Layout>
  );
};

export default Tweet;

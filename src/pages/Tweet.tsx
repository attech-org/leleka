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
  const tweetId = match.id!;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(tweetsActions.fetchTweetById(tweetId));
  }, []);

  // dispatch(tweetsActions.fetchTweetById(tweetId));

  const { data } = useSelector<RootState, RootState["tweets"]["currentTweet"]>(
    (store) => store.tweets.currentTweet
  );

  console.log(tweetId);
  console.log(data);

  const posts = useSelector<RootState, RootState["tweets"]["feedReplies"]>(
    (store) => store.tweets.feedReplies
  );

  const handleShowMore = () => {
    return !posts.isLoading && dispatch(tweetsActions.fetchTweetReplies(posts));
  };

  return (
    <Layout>
      {/* <div>{tweetId}</div>
      <div>{JSON.stringify(data)}</div> */}
      {data && <SingleTweet {...data} />}
      <InfiniteList<Tweet2>
        showMore={handleShowMore}
        data={posts}
        itemComponent={(itemData) => <FeedSingleTweet {...itemData} />}
      />
      <div>Comments</div>
    </Layout>
  );
};

export default Tweet;

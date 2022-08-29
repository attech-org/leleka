import { useEffect, useState } from "react";

import FeedSingleTweet from "../components/FeedSingleTweet";
import MOCKTweets from "../MOCKS/tweets";
import { Tweet } from "../types";

const FeedPostsContainer = () => {
  const [posts, setPosts] = useState<Tweet[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [firstArg, setFirstArg] = useState(0);
  const [secondArg, setSecondArg] = useState(10);
  const [isFetching, setIsFetching] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollHandler = (e: any) => {
    const containerHeight = e.target.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    if (containerHeight - (windowHeight + scrollTop) < 100) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (isFetching) {
      // axios
      //   .get(
      //     `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
      //   )
      //   .then((response) => {
      //     setPhotos([...photos, ...response.data]);
      //     setCurrentPage((prevState) => prevState + 1);
      //   })
      //   .finally(() => setIsFetching(false));

      // Comments will be useful to work with GET-requests!

      setFirstArg((prevState) => prevState + 5);
      setSecondArg((prevState) => prevState + 5);
      setPosts([...posts, ...MOCKTweets.slice(firstArg, secondArg)]);
      setIsFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      {posts.map((postData) => (
        <FeedSingleTweet key={postData.id} {...postData} />
      ))}
    </>
  );
};

export default FeedPostsContainer;

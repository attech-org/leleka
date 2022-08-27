// import axios from "axios";
import { useEffect, useState } from "react";
// import { ArrowRepeat, Chat, FileCheck, Upload } from "react-bootstrap-icons";
// import styled from "styled-components";

import SingleTweet from "../components/SingleTweet";
import { FeedPostData } from "../MOCKS/homeFeedPage";

// const Logo = styled.img`
//   height: 48px;
//   width: 48px;
//   object-fit: cover;
// `;

// const UnderlineHover = styled.span`
//   transition-duration: 0.2s;

//   :hover {
//     text-decoration: underline;
//   }
// `;

// const StatisticOfTweet = styled.div`
//   transition-duration: 0.2s;
//   :hover {
//     color: rgb(0, 153, 255);
//   }
// `;

// const StatisticOfRetweets = styled.div`
//   :hover {
//     color: rgb(41, 228, 166);
//   }
// `;

// const HoverBackgroundBlue = styled.div`
//   :hover {
//     background: rgb(230, 241, 248);
//     transition-duration: 0.2s;
//   }
// `;

// const HoverBackgroundGreen = styled.div`
//   :hover {
//     background: rgb(222, 241, 235);
//     transition-duration: 0.2s;
//   }
// `;

// const StyledFaRetweet = styled(ArrowRepeat)`
//   width: 20px;
//   height: 20px;
// `;

// const StyledFiShare = styled(Upload)`
//   width: 20px;
//   height: 20px;
// `;

// const StyledBiMessageRounded = styled(Chat)`
//   width: 20px;
//   height: 20px;
// `;

// const StyledMdVerified = styled(FileCheck)`
//   color: rgb(29, 155, 240);
//   width: 20px;
//   height: 24px;
// `;

// const PostWrapper = styled.section`
//   transition-duration: 0.2s;
//   :hover {
//     background: rgba(0, 0, 0, 0.03);
//   }
// `;

export interface TweetPost {
  id: number;
  fullName: string;
  username: string;
  userNickname: string;
  messageText: string;
  messageDate: string;
  isVerified: boolean;
  picture: string;
  userlogo: string;
  commentCount: number;
  retweetCount: number;
  likeCount: number;
}

const FeedPost = () => {
  const [posts, setPosts] = useState<TweetPost[]>([]);
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
      setPosts([...posts, ...FeedPostData.slice(firstArg, secondArg)]);
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
      {posts.map(
        ({
          id,
          likeCount,
          retweetCount,
          userNickname,
          userlogo,
          // isVerified,
          // fullName,
          username,
          messageText,
          messageDate,
          // commentCount,
          // picture,
        }) => (
          <SingleTweet
            key={id}
            likeCount={likeCount}
            retweetCount={retweetCount}
            lelekaLink={"http://localhost:3000"}
            tweetDate={messageDate}
            tweetQuoteCount={0}
            tweetText={messageText}
            userNickname={userNickname}
            userlogo={userlogo}
            username={username}
          />
        )
      )}
    </>
  );
};

export default FeedPost;

import React from "react";

import SingleTweetComment from "../components/SingleTweetComment";
import { tweetCommentsData } from "../MOCKS/singleTweetPage";

export const CommentsList: React.FC = () => {
  return (
    <div>
      {tweetCommentsData.map((obj) => (
        <SingleTweetComment
          key={obj.id}
          userlogo={obj.userlogo}
          username={obj.username}
          userNickname={obj.userNickname}
          responserUserNickname={obj.responserUserNickname}
          messegeText={obj.messegeText}
          messegeDate={obj.messegeDate}
          answerCount={obj.answerCount}
          retweetCount={obj.retweetCount}
          likeCount={obj.likeCount}
        />
      ))}
    </div>
  );
};

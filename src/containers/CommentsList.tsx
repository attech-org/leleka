import React from "react";

import SingleTweetComment from "../components/SingleTweetComment";

export const CommentsList: React.FC = () => {
  return (
    <div>
      <SingleTweetComment
        userlogo={""}
        username={""}
        userNickname={""}
        responserUserNickname={""}
        messegeText={""}
        messegeDate={""}
        answerCount={0}
        retweetCount={0}
        likeCount={0}
      />
    </div>
  );
};

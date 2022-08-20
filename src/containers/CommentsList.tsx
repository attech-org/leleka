import React from "react";

import SingleTweetComment from "../components/SingleTweetComment";
import { tweetCommentsData } from "../MOCKS/singleTweetPage";

export const CommentsList: React.FC = () => {
  return (
    <div>
      <SingleTweetComment {...tweetCommentsData} />
    </div>
  );
};

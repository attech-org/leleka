import React from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import styled from "styled-components";

import SingleTweet from "../components/SingleTweet";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 100%;
  margin-left: 1em;
`;

export const TweetPage: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Wrap>
        <ArrowLeft />
        <Wrap>Твітнути</Wrap>
      </Wrap>
      <div>
        Тут буде твіт (компонент)
        <SingleTweet
          userlogo={""}
          username={""}
          userNickname={""}
          tweetText={""}
          tweetDate={""}
          lelekaLink={""}
          retweetCount={0}
          tweetQuoteCount={0}
          likeCount={0}
        />
      </div>
    </div>
  );
};

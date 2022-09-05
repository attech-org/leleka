import React from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import styled from "styled-components";

import SingleTweet from "../components/SingleTweet";
import { singleTweetData } from "../MOCKS/singleTweetPage";

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
        <SingleTweet {...singleTweetData} />
      </div>
    </div>
  );
};

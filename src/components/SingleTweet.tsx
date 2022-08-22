import React from "react";
import { Dropdown } from "react-bootstrap";
import {
  ThreeDots,
  Chat,
  ArrowRepeat,
  Heart,
  Upload,
} from "react-bootstrap-icons";
import styled from "styled-components";

import AttachedContent from "./AttachedContent";

const Wrapper = styled.div`
  text-align: left;
`;
const Author = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
`;
const Logo = styled.img``;
const NameSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const NameWrapper = styled.div``;
const StyledUsername = styled.div`
  font-size: 16px;
  height: 20px;
  display: flex;
  align-items: center;
`;
const StyledNickname = styled.div`
  font-size: 16px;
  height: 20px;
  display: flex;
  align-items: center;
`;
const SDropdownToggle = styled(Dropdown.Toggle)`
  border-radius: 50%;
  background-color: white;
  width: 18.75px;
  height: 18.75px;
  border: none;
  &:hover {
    background-color: white;
  }
`;
const Text = styled.div`
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  line-height: 1.6rem;
`;
const Date = styled.div``;
const Statistic = styled.div``;
const IconsBar = styled.div``;

interface IIconBg {
  iconBgColor: string;
  iconColor: string;
}
const IconBg = styled.div<IIconBg>`
  height: 38.5px;
  width: 38.5px;
  &:hover {
    background-color: ${(props) => props.iconBgColor};
    color: ${(props) => props.iconColor};
  }
`;

interface SingleTweetInterface {
  userlogo: string;
  username: string;
  userNickname: string;
  tweetText: string;
  tweetDate: string;
  lelekaLink: string;
  retweetCount: number;
  tweetQuoteCount: number;
  likeCount: number;
}

const SingleTweet: React.FC<SingleTweetInterface> = ({
  userlogo,
  username,
  userNickname,
  tweetText,
  tweetDate,
  lelekaLink,
  retweetCount,
  tweetQuoteCount,
  likeCount,
}) => {
  const bgBlue = "rgb(29, 155, 240, 0.1)";
  const bgGreen = "rgb(0, 186, 124, 0.1)";
  const bgRed = "rgb(249, 24, 128, 0.1)";
  const Blue = "rgb(29, 155, 240)";
  const Green = "rgb(0, 186, 124)";
  const Red = "rgb(249, 24, 128)";

  return (
    <div>
      <Wrapper className="px-3">
        <Author className="my-2">
          <Logo className="rounded-circle" src={userlogo} />
          <NameSection>
            <NameWrapper>
              <StyledUsername className="pl-2 fw-bold">
                {username}
              </StyledUsername>
              <StyledNickname>{userNickname}</StyledNickname>
            </NameWrapper>
            <Dropdown>
              <SDropdownToggle
                variant="success"
                id="dropdown-basic"
                className="p-0 border-0"
              >
                <ThreeDots color="black" />
              </SDropdownToggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Почати читати</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Додати/Видалити</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Ігнорувати</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </NameSection>
        </Author>
        <Text className="py-2">{tweetText}</Text>
        <AttachedContent />
        <Date className="border-bottom py-3 fw-bold">
          {tweetDate} - {lelekaLink}
        </Date>
        <Statistic className="border-bottom py-3">
          <span className="fw-bold text-dark pe-1">{retweetCount}</span>
          <span className="text-dark pe-3">ретвітів</span>
          <span className="fw-bold text-dark pe-1">{tweetQuoteCount}</span>
          <span className="text-dark pe-3">твітів с цитатами</span>
          <span className="fw-bold text-dark pe-1">{likeCount}</span>
          <span className="text-dark pe-3">відміток «Подобається»</span>
        </Statistic>
        <IconsBar className="border-bottom py-1 mx-0 row justify-content-around">
          <IconBg
            iconBgColor={bgBlue}
            iconColor={Blue}
            className="m-0 p-0 rounded-circle row align-items-center justify-content-center"
          >
            <Chat className="p-0 m-0" />
          </IconBg>
          <IconBg
            iconBgColor={bgGreen}
            iconColor={Green}
            className="m-0 p-0 rounded-circle row align-items-center justify-content-center"
          >
            <ArrowRepeat className="p-0 m-0" />
          </IconBg>
          <IconBg
            iconBgColor={bgRed}
            iconColor={Red}
            className="m-0 p-0 rounded-circle row align-items-center justify-content-center"
          >
            <Heart className="p-0 m-0" />
          </IconBg>
          <IconBg
            iconBgColor={bgBlue}
            iconColor={Blue}
            className="m-0 p-0 rounded-circle row align-items-center justify-content-center"
          >
            <Upload className="p-0 m-0" />
          </IconBg>
        </IconsBar>
      </Wrapper>
    </div>
  );
};

export default SingleTweet;

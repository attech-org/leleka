import React from "react";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import {
  ThreeDots,
  Upload,
  PersonX,
  ClipboardPlus,
  Flag,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Tweet } from "../types";
import AttachedContent from "./AttachedContent";
import LikeButton from "./LikeButton";
import RetweetButton from "./RetweetButton";
import TweetReplyForm from "./TweetReplyForm";

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const StyledPopover = styled(Popover)`
  --bs-popover-max-width: 300px;
  inset: 45px -45px auto auto !important;
  .popover-arrow {
    display: none;
  }
  .popover-body {
    padding: 0;
  }
`;

const StyledButton = styled(Button)`
  height: 40px;
  width: 40px;
  :focus:not(:focus-visible) {
    box-shadow: none;
  }
  :hover {
    color: rgb(29, 155, 240) !important;
    background-color: rgba(29, 155, 240, 0.1) !important;
  }
`;

const Wrapper = styled.div`
  text-align: left;
`;
const Author = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
`;
const Logo = styled.img`
  height: 3rem;
  width: 3rem;
`;
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

const SingleTweet: React.FC<Tweet> = ({
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
  // const bgGreen = "rgb(0, 186, 124, 0.1)";
  // const bgRed = "rgb(249, 24, 128, 0.1)";
  const Blue = "rgb(29, 155, 240)";
  // const Green = "rgb(0, 186, 124)";
  // const Red = "rgb(249, 24, 128)";
  const { t } = useTranslation();

  // const handleReplyClick = () => {
  //   return <ReplyTweet />;
  // };

  return (
    <div>
      <Wrapper className="px-3">
        <Author className="my-2">
          <Logo className="rounded-circle flex-shrink-0" src={userlogo} />
          <NameSection>
            <NameWrapper className="ps-2">
              <StyledUsername className="fw-bold">{username}</StyledUsername>
              <StyledNickname>{userNickname}</StyledNickname>
            </NameWrapper>
            <div className="align-items-start align-top">
              <OverlayTrigger
                transition
                rootClose
                trigger="click"
                key="left"
                placement="left"
                overlay={
                  <StyledPopover id="popover-positioned-left">
                    <Popover.Body>
                      <p>
                        <StyledLink
                          className="text-decoration-none text-reset d-flex flex-row p-1 pe-2 fs-6"
                          href="#"
                        >
                          <span className="px-2">
                            <PersonX />
                          </span>
                          {`${t("singleTweetMenu.stopFollow")} ${userNickname}`}
                        </StyledLink>
                      </p>
                      <p>
                        <StyledLink
                          className="text-decoration-none text-reset d-flex flex-row p-1 pe-2 fs-6"
                          href="#"
                        >
                          <span className="px-2">
                            <ClipboardPlus />
                          </span>
                          {`${t("singleTweetMenu.add")} ${userNickname} ${t(
                            "singleTweetMenu.toList"
                          )}`}
                        </StyledLink>
                      </p>
                      <p>
                        <StyledLink
                          className="text-decoration-none text-reset d-flex flex-row p-1 pe-2 fs-6"
                          href="#"
                        >
                          <span className="px-2">
                            <Flag />
                          </span>
                          {t("singleTweetMenu.report")}
                        </StyledLink>
                      </p>
                    </Popover.Body>
                  </StyledPopover>
                }
              >
                <StyledButton
                  className="text-secondary me-3 p-0 rounded-circle"
                  variant="link"
                >
                  <ThreeDots size={16} />
                </StyledButton>
              </OverlayTrigger>
            </div>
          </NameSection>
        </Author>
        <Text className="py-2">{tweetText}</Text>
        <AttachedContent />
        <Date className="border-bottom py-3 fw-bold">
          {tweetDate} - {lelekaLink}
        </Date>
        <Statistic className="border-bottom py-3">
          <span className="fw-bold text-dark pe-1">{retweetCount}</span>
          <span className="text-dark pe-3">{t("common.retweets")}</span>
          <span className="fw-bold text-dark pe-1">{tweetQuoteCount}</span>
          <span className="text-dark pe-3">{t("common.quoteTweets")}</span>
          <span className="fw-bold text-dark pe-1">{likeCount}</span>
          <span className="text-dark pe-1">{t("common.likes")}</span>
        </Statistic>
        <IconsBar className="border-bottom py-1 mx-0 row justify-content-around">
          <IconBg
            iconBgColor={bgBlue}
            iconColor={Blue}
            className="m-0 p-0 rounded-circle row align-items-center justify-content-center"
          >
            <TweetReplyForm />
          </IconBg>
          <IconBg
            iconBgColor={""}
            iconColor={""}
            className="m-0 p-0 rounded-circle row align-items-center justify-content-center"
          >
            <RetweetButton retweetCount={retweetCount} />
          </IconBg>
          <IconBg
            iconBgColor={""}
            iconColor={""}
            className="m-0 p-0 rounded-circle row align-items-center justify-content-center"
          >
            <LikeButton likesCount={likeCount} />
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

import Avatar from "react-avatar";
import { Popover, OverlayTrigger, Button, Nav } from "react-bootstrap";
import {
  // PatchCheckFill,
  Upload,
  PersonX,
  ClipboardPlus,
  Flag,
  ThreeDots,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { LinkWithLanguageQueryParam } from "../containers/LinkWithLanguageQueryParam";
import localDateTime from "../services/localDateTime";
import { Tweet2 } from "../types";
import LikeButton from "./LikeButton";
import LinkPreview from "./LinkPreview";
import RetweetButton from "./RetweetButton";
import TweetReplyForm from "./TweetReplyForm";

const PostWrapper = styled.section`
  transition-duration: 0.2s;
  :hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;

const UnderlineHover = styled(Nav.Link)<{ eventKey: string }>`
  transition-duration: 0.2s;
  text-decoration: none;
  :hover {
    text-decoration: underline !important;
  }
`;

const StatisticOfTweet = styled.div`
  transition-duration: 0.2s;
  :hover {
    color: rgb(0, 153, 255);
  }
`;

const HoverBackgroundBlue = styled.div`
  :hover {
    background: rgb(230, 241, 248);
    transition-duration: 0.2s;
  }
`;

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
  height: 2rem;
  width: 2rem;
  :focus:not(:focus-visible) {
    box-shadow: none;
  }
  :hover {
    color: rgb(29, 155, 240) !important;
    background-color: rgba(29, 155, 240, 0.1) !important;
  }
`;

const FeedSingleTweet = ({
  _id,
  createdAt,
  author,
  content,
  repliedTo,
  // updatedAt,
  stats: { likes, retweets, comments },
}: Tweet2) => {
  const { t } = useTranslation();

  // const handleReplyClick = () => {
  //   return <ReplyTweet />;
  // };
  const urlSearch = new RegExp(
    /https?:\/\/(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^\s<]{2,}|https?:\/\/(?:www.|(?!www))[a-zA-Z0-9]+.[^\s<]{2,}/,
    "g"
  );

  const url = content.match(urlSearch) || [];

  return (
    <>
      <PostWrapper
        className="border border-bottom-0 border-grey px-3 py-3 text-start d-flex fs-6"
        role="button"
        key={_id}
      >
        <Avatar
          size="48"
          round="50%"
          twitterHandle="sitebase"
          name={author.username}
          src={author.profile?.avatar}
        />

        <div className="w-100">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center px-3 flex-wrap">
              <UnderlineHover className="fw-600 pe-1 fw-bold text-dark">
                {author.name}
              </UnderlineHover>

              {/* {isVerified && (
                <PatchCheckFill size={20} className="text-info pe-1" />
              )} */}
              <a className="text-muted text-decoration-none">
                @{author.username}
              </a>
              <div className="mx-1 text-secondary d-flex justify-content-center align-items-center">
                ·
              </div>
              <UnderlineHover
                as={LinkWithLanguageQueryParam}
                to={`/tweet/${_id}`}
                eventKey={_id}
                className="text-secondary"
              >
                {localDateTime(createdAt)}
              </UnderlineHover>
            </div>

            <div className="d-flex justify-content-end">
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
                          {`${t("SingleTweetMenu.stopFollow")} ${
                            author.username
                          }`}
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
                          {`${t("SingleTweetMenu.add")} ${author.username} ${t(
                            "SingleTweetMenu.toList"
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
                          {t("SingleTweetMenu.report")}
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
          </div>
          <div className="px-3 py-2">
            {repliedTo ? (
              <div className="mb-3">
                {t("reply.replyContent")}
                <a href={repliedTo.author.url}>@{repliedTo.author.username}</a>
              </div>
            ) : (
              ""
            )}
            {url[0] ? (
              <div>
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: content.replace(url[0], ""),
                  }}
                />
                <LinkPreview url={url[0]} />
              </div>
            ) : (
              <div className="" dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
          <div className="px-3 d-flex justify-content-between align-items-center">
            <TweetReplyForm
              author={author}
              content={content}
              id={_id}
              commentsCount={comments}
            />
            <RetweetButton retweetCount={retweets} />
            <LikeButton likesCount={likes} />
            <StatisticOfTweet className="d-flex align-items-center">
              <HoverBackgroundBlue className="p-2 rounded-circle d-flex justify-content-center align-items-center">
                <Upload size="16" />
              </HoverBackgroundBlue>
            </StatisticOfTweet>
          </div>
        </div>
      </PostWrapper>
    </>
  );
};

export default FeedSingleTweet;

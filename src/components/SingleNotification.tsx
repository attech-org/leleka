import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { HeartFill, ArrowRepeat } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { LinkWithLanguageQueryParam } from "../containers/LinkWithLanguageQueryParam";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";
import UserAvatar from "./Avatar";

const StyledSection = styled.section`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03) !important;
  }
`;

const UnderlineHover = styled(Nav.Link)<{ eventkey: string }>`
  transition-duration: 0.2s;
  text-decoration: none;
`;

const retweet = false;

export const Usernames = ({ username }: { username: string }) => {
  return (
    <>
      <span className="fw-bold"> </span>
      <UnderlineHover
        as={LinkWithLanguageQueryParam}
        to={`/${username}`}
        className="fw-600 pe-1 fw-bold text-dark"
        eventkey={username}
      >
        {`${username}, `}
      </UnderlineHover>
    </>
  );
};

const SingleNotification = ({ _id, content }: Tweet2) => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const likes = useSelector<RootState, RootState["tweets"]["tweetLikes"]>(
    (store) => store.tweets.tweetLikes
  );

  const tweetId = _id;

  useEffect(() => {
    dispatch(tweetsActions.fetchTweetLikes({ ...likes, tweetId }));
  }, [_id]);

  return (
    <div>
      <StyledSection
        role="button"
        className="px-3 pt-3 text-decoration-none text-reset text-danger border-bottom"
      >
        <div className="d-flex align-items-top">
          <div className="pt-1 px-3">
            {retweet ? (
              <ArrowRepeat size="35" className="text-success" />
            ) : (
              <HeartFill size="35" className="text-danger" />
            )}
          </div>
          <div>
            <div className="d-flex justify-content-start">
              <div className="pb-3 pe-1">
                {likes.docs.map((item) => (
                  <span className="me-1" key={item._id}>
                    <UserAvatar user={item.user} key={item._id} />
                  </span>
                ))}
              </div>
            </div>
            <div className="pb-3 text-start" id={_id}>
              {likes.docs.map((item) =>
                item.tweet._id === _id ? (
                  <Usernames username={item.user.username} key={item._id} />
                ) : null
              )}
              <span>
                {retweet
                  ? t("notifications.fields.retweeted")
                  : t("notifications.fields.liked")}{" "}
                {t("notifications.fields.yourTweets")}
              </span>{" "}
            </div>
            <div className="pb-3 text-start text-secondary">
              <Nav.Link as={LinkWithLanguageQueryParam} to={`/tweet/${_id}`}>
                <div dangerouslySetInnerHTML={{ __html: content || "" }} />
              </Nav.Link>
            </div>
          </div>
        </div>
      </StyledSection>
    </div>
  );
};

export default SingleNotification;

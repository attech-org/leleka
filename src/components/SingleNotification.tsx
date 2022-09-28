import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { HeartFill, ArrowRepeat } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";

const StyledSection = styled.section`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03) !important;
  }
`;

const StyledImage = styled(Image)`
  width: 2.5rem;
  height: 2.5rem;
`;

const retweet = false;

export const Usernames = ({ username }: { username: string }) => {
  return (
    <>
      <span className="fw-bold">{username} </span>
    </>
  );
};

const SingleNotification = ({ _id, content, stats }: Tweet2) => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const likes = useSelector<RootState, RootState["tweets"]["tweetLikes"]>(
    (store) => store.tweets.tweetLikes
  );

  console.log("likes");
  console.log(likes);

  const tweetId = _id;

  useEffect(() => {
    dispatch(tweetsActions.fetchTweetLikes({ ...likes, tweetId, init: true }));
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
                  <span key={item._id}>
                    <StyledImage
                      roundedCircle
                      fluid
                      src={item.user.profile.avatar}
                      key={item._id}
                    />
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
              <span>{stats.likes}</span>
            </div>
            <div className="pb-3 text-start text-secondary">
              <span dangerouslySetInnerHTML={{ __html: content || "" }} />
            </div>
            <div className="pb-3 text-start text-secondary">
              <a href="#" className="text-decoration-none py-1 link-info">
                {t("notifications.links.showAll")}
              </a>
            </div>
          </div>
        </div>
      </StyledSection>
    </div>
  );
};

export default SingleNotification;

import { Image } from "react-bootstrap";
import { HeartFill, ArrowRepeat } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

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

export interface SingleNotificationInterface {
  id?: string;
  username: string;
  userlogo: string;
  content: string;
  mentionedTweets: number;
  retweet?: boolean;
}

const SingleNotification = ({
  id,
  username,
  userlogo,
  content,
  mentionedTweets,
  retweet,
}: SingleNotificationInterface) => {
  const { t } = useTranslation();

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
                <StyledImage roundedCircle fluid src={userlogo} />
              </div>
            </div>
            <div className="pb-3 text-start" id={id}>
              <span className="fw-bold">{username}</span>{" "}
              <span>
                {retweet
                  ? t("notifications.fields.retweeted")
                  : t("notifications.fields.liked")}{" "}
                {t("notifications.fields.yourTweets")}
              </span>{" "}
              <span>{mentionedTweets}</span>
            </div>
            <div className="pb-3 text-start text-secondary">
              <span>{content}</span>
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

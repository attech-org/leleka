import { Image } from "react-bootstrap";
import { HeartFill, ArrowRepeat } from "react-bootstrap-icons";
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

const liked = "вподобав(ла)";
const retweeted = "ретвітнув(ла)";

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
            <div className="fs-5 d-flex justify-content-start">
              <div className="pb-3 pe-1">
                <StyledImage roundedCircle fluid src={userlogo} />
              </div>
            </div>
            <div className="pb-3 text-start" id={id}>
              <span className="fs-5 fw-bold">{username}</span>{" "}
              <span className="fs-5">
                {retweet ? retweeted : liked} ваших твітів:
              </span>{" "}
              <span className="fs-5">{mentionedTweets}</span>
            </div>
            <div className="pb-3 text-start text-secondary">
              <span className="fs-5">{content}</span>
            </div>
            <div className="pb-3 text-start text-secondary">
              <a href="#" className="text-decoration-none py-1 fs-5 link-info">
                Показати всі
              </a>
            </div>
          </div>
        </div>
      </StyledSection>
    </div>
  );
};

export default SingleNotification;

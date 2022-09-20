import styled from "styled-components";

import ModalUniversal from "../containers/ModalUniversal";
import { User } from "../types";
import ReplyButton from "./ReplyButton";
import TweetCreationForm from "./TweetCreationForm";

const StyledDiv = styled.div`
  width: 100%;
`;
const StyledName = styled.div`
  font-weight: bold;
`;

const Logo = styled.img`
  height: 3rem;
  width: 3rem;
`;

const TweetReplyForm: React.FC<{
  author: Partial<User>;
  content: string;
  id: string;
  commentsCount?: number;
}> = ({ author, content, id, commentsCount = 0 }) => {
  const ReplyFormContainer = (
    <div>
      <div className="border-0 p-3 d-flex text-start justify-content-start">
        <div className="">
          <Logo
            className="rounded-circle"
            src={author.profile?.avatar}
            alt=""
          />
        </div>
        <div className="flex-grow-1 ms-2">
          <StyledName>{author.name}</StyledName>
          <StyledDiv>@{author.username}</StyledDiv>
          <br />
          <div className="" dangerouslySetInnerHTML={{ __html: content }} />
          <br />
          <TweetCreationForm repliedId={id} />
        </div>
      </div>
    </div>
  );

  return (
    <ModalUniversal
      button={<ReplyButton replyCount={commentsCount} />}
      title=""
      content={ReplyFormContainer}
    />
  );
};

export default TweetReplyForm;

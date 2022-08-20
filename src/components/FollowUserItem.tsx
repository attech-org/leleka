import {
  Image,
  Anchor,
  ListGroupItem,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import styled from "styled-components";

import { MockUser } from "../types/mock-api-types";
import FollowCard from "./FollowUserCard";
import FollowButton from "./FollowUserDialogueButton";

const LiWrapper = styled(ListGroupItem)`
  width: 100%;
  text-align: start;
  &:hover {
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
`;
const UserItemHeader = styled.div`
  height: 25%;
  display: flex;
`;
const LeftSectionWrapper = styled.div`
  flex: 1;
  order: 1;
`;
const MiddleSectionWrapper = styled.div`
  flex: 6;
  order: 2;
`;
const RightSectionWrapper = styled.div`
  flex: 1;
  order: 3;
`;
const UserItemContent = styled.p`
  height: 75%;
  display: flex;
`;

const ListItemWoFooter = (props: { user: MockUser }) => {
  const user = props.user;
  const popover = (
    <Popover>
      <FollowCard user={user} />
    </Popover>
  );
  return (
    <LiWrapper>
      <UserItemHeader>
        <LeftSectionWrapper>
          <OverlayTrigger
            trigger="hover"
            delay={{ show: 1000, hide: 6000 }}
            placement="auto"
            overlay={popover}
          >
            <Image
              width={50}
              height={50}
              roundedCircle
              src={user.userPhotoUrl}
            />
          </OverlayTrigger>
        </LeftSectionWrapper>
        <MiddleSectionWrapper>
          <Anchor className="link-dark" href={user.userUrl}>
            {user.userFirstName + " " + user.userLastName}
          </Anchor>
          <p style={{ color: "#A6AEB5", textDecoration: "none" }}>
            @{user.userName}
          </p>
        </MiddleSectionWrapper>
        <RightSectionWrapper>
          <FollowButton
            followStatus={user.followStatus}
            followerName={user.userName}
          />
        </RightSectionWrapper>
      </UserItemHeader>

      <UserItemContent>
        <LeftSectionWrapper />
        <MiddleSectionWrapper>{user.userCaption}</MiddleSectionWrapper>
        <RightSectionWrapper />
      </UserItemContent>
    </LiWrapper>
  );
};
export default ListItemWoFooter;

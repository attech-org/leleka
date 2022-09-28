import { Anchor, Popover, OverlayTrigger } from "react-bootstrap";
import styled from "styled-components";

import { User } from "../types";
import { FollowStatus } from "../types/constants";
import UserAvatar from "./Avatar";
import FollowButton from "./FollowUserDialogueButton";
import FollowCard from "./UserCard";

const UserItemHeader = styled.div`
  height: 25%;
  display: flex;
`;
const UserFollowerItemContent = styled.p`
  height: 75%;
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

const FollowerUserItem = ({ user }: { user: User }) => {
  const popover = (
    <Popover>
      <FollowCard user={user} />
    </Popover>
  );
  return (
    <>
      <UserItemHeader>
        <LeftSectionWrapper>
          <OverlayTrigger
            trigger={["hover", "focus"]}
            delay={{ show: 1000, hide: 6000 }}
            placement="auto"
            overlay={popover}
          >
            <UserAvatar user={user} />
          </OverlayTrigger>
        </LeftSectionWrapper>
        <MiddleSectionWrapper>
          <Anchor className="link-dark" href={user.url}>
            {user.name}
          </Anchor>
          <p style={{ color: "#A6AEB5", textDecoration: "none" }}>
            @{user.username}
          </p>
        </MiddleSectionWrapper>
        <RightSectionWrapper>
          <FollowButton
            followStatus={FollowStatus.FOLLOWED}
            followerName={user.username}
          />
        </RightSectionWrapper>
      </UserItemHeader>

      <UserFollowerItemContent>
        <LeftSectionWrapper />
        <MiddleSectionWrapper>{user.description}</MiddleSectionWrapper>
        <RightSectionWrapper />
      </UserFollowerItemContent>
    </>
  );
};
export default FollowerUserItem;

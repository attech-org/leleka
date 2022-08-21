import { Nav } from "react-bootstrap";
import {
  Bell,
  Bookmark,
  CardText,
  ChatDots,
  House,
  Person,
  Hash,
  Envelope,
} from "react-bootstrap-icons";
import styled from "styled-components";

import { LinkWithLanguageQueryParam } from "../containers/LinkWithLanguageQueryParam";

const StyledNav = styled(Nav)`
  background-color: white;
  color: black;
  .nav-link,
  a {
    color: black;
    text-decoration: none;
    padding-left: 15px;
  }
`;

const NavigationBar = () => {
  return (
    <StyledNav className="flex-column" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link as={LinkWithLanguageQueryParam} to="/">
          <House />
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={LinkWithLanguageQueryParam} to="/explore">
          <Hash />
          Explore
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={LinkWithLanguageQueryParam} to="/notifications">
          <Bell />
          Notifications
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={LinkWithLanguageQueryParam} to="/messages">
          <Envelope />
          Messages
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={LinkWithLanguageQueryParam} to="/bookmarks">
          <Bookmark />
          Bookmarks
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={LinkWithLanguageQueryParam} to="/lists">
          <CardText />
          Lists
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={LinkWithLanguageQueryParam} to="/profile">
          <Person />
          Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={LinkWithLanguageQueryParam} to="/more">
          <ChatDots />
          More
        </Nav.Link>
      </Nav.Item>
    </StyledNav>
  );
};

export default NavigationBar;

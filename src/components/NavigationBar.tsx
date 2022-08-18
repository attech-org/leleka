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
        <Nav.Link>
          <House />
          <LinkWithLanguageQueryParam to="/">Home</LinkWithLanguageQueryParam>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Hash />
          <LinkWithLanguageQueryParam to="/explore">
            Explore
          </LinkWithLanguageQueryParam>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Bell />
          <LinkWithLanguageQueryParam to="/notifications">
            Notifications
          </LinkWithLanguageQueryParam>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Envelope />
          <LinkWithLanguageQueryParam to="/messages">
            Messages
          </LinkWithLanguageQueryParam>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Bookmark />
          <LinkWithLanguageQueryParam to="/bookmarks">
            Bookmarks
          </LinkWithLanguageQueryParam>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <CardText />
          <LinkWithLanguageQueryParam to="/lists">
            Lists
          </LinkWithLanguageQueryParam>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Person />
          <LinkWithLanguageQueryParam to="/profile">
            Profile
          </LinkWithLanguageQueryParam>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <ChatDots />
          <LinkWithLanguageQueryParam to="/more">
            More
          </LinkWithLanguageQueryParam>
        </Nav.Link>
      </Nav.Item>
    </StyledNav>
  );
};

export default NavigationBar;

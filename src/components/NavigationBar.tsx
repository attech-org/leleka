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
      <Nav.Navbar.Text>
        <Nav.Navbar.Text>
          <House />
          <LinkWithLanguageQueryParam to="/">Home</LinkWithLanguageQueryParam>
        </Nav.Navbar.Text>
      </Nav.Navbar.Text>
      <Nav.Navbar.Text>
        <Nav.Navbar.Text>
          <Hash />
          <LinkWithLanguageQueryParam to="/explore">
            Explore
          </LinkWithLanguageQueryParam>
        </Nav.Navbar.Text>
      </Nav.Navbar.Text>
      <Nav.Navbar.Text>
        <Nav.Navbar.Text>
          <Bell />
          <LinkWithLanguageQueryParam to="/notifications">
            Notifications
          </LinkWithLanguageQueryParam>
        </Nav.Navbar.Text>
      </Nav.Navbar.Text>
      <Nav.Navbar.Text>
        <Nav.Navbar.Text>
          <Envelope />
          <LinkWithLanguageQueryParam to="/messages">
            Messages
          </LinkWithLanguageQueryParam>
        </Nav.Navbar.Text>
      </Nav.Navbar.Text>
      <Nav.Navbar.Text>
        <Nav.Navbar.Text>
          <Bookmark />
          <LinkWithLanguageQueryParam to="/bookmarks">
            Bookmarks
          </LinkWithLanguageQueryParam>
        </Nav.Navbar.Text>
      </Nav.Navbar.Text>
      <Nav.Navbar.Text>
        <Nav.Navbar.Text>
          <CardText />
          <LinkWithLanguageQueryParam to="/lists">
            Lists
          </LinkWithLanguageQueryParam>
        </Nav.Navbar.Text>
      </Nav.Navbar.Text>
      <Nav.Navbar.Text>
        <Nav.Navbar.Text>
          <Person />
          <LinkWithLanguageQueryParam to="/profile">
            Profile
          </LinkWithLanguageQueryParam>
        </Nav.Navbar.Text>
      </Nav.Navbar.Text>
      <Nav.Navbar.Text>
        <Nav.Navbar.Text>
          <ChatDots />
          <LinkWithLanguageQueryParam to="/more">
            More
          </LinkWithLanguageQueryParam>
        </Nav.Navbar.Text>
      </Nav.Navbar.Text>
    </StyledNav>
  );
};

export default NavigationBar;

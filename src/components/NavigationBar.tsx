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
import { Link } from "react-router-dom";
import styled from "styled-components";

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
          <Link to="/">Home</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Hash />
          <Link to="/explore">Explore</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Bell />
          <Link to="/notifications">Notifications</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Envelope />
          <Link to="/messages">Messages</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Bookmark />
          <Link to="/bookmarks">Bookmarks</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <CardText />
          <Link to="/lists">Lists</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Person />
          <Link to="/profile">Profile</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <ChatDots />
          <Link to="/more">More</Link>
        </Nav.Link>
      </Nav.Item>
    </StyledNav>
  );
};

export default NavigationBar;

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
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { LinkWithLanguageQueryParam } from "../containers/LinkWithLanguageQueryParam";

const StyledNav = styled(Nav)`
  background-color: white;
  color: black;
  .nav-link,
  a {
    color: black;
    text-decoration: none;
  }
`;

const StyledSpan = styled.span`
  @media (max-width: 992px) {
    display: none;
  }
`;

const NavigationBar = () => {
  const { t } = useTranslation();
  return (
    <StyledNav className="" defaultActiveKey="/">
      <Nav.Item className="d-flex align-items-center ps-2 pb-2 pt-3">
        <House size={20} className="my-2" />
        <Nav.Link as={LinkWithLanguageQueryParam} to="/">
          <StyledSpan className="fs-5">{t("navigationBar.home")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <Hash size={20} className="my-2" />
        <Nav.Link as={LinkWithLanguageQueryParam} to="/explore">
          <StyledSpan className="fs-5">{t("navigationBar.explore")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <Bell size={20} className="my-2" />
        <Nav.Link as={LinkWithLanguageQueryParam} to="/notifications">
          <StyledSpan className="fs-5">
            {t("navigationBar.notifications")}
          </StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <Envelope size={20} className="my-2" />
        <Nav.Link as={LinkWithLanguageQueryParam} to="/messages">
          <StyledSpan className="fs-5">
            {t("navigationBar.messages")}
          </StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <Bookmark size={20} className="my-2" />
        <Nav.Link as={LinkWithLanguageQueryParam} to="/bookmarks">
          <StyledSpan className="fs-5">
            {t("navigationBar.bookmarks")}
          </StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <CardText size={20} className="my-2" />
        <Nav.Link as={LinkWithLanguageQueryParam} to="/lists">
          <StyledSpan className="fs-5">{t("navigationBar.lists")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <Person size={20} className="my-2" />
        <Nav.Link as={LinkWithLanguageQueryParam} to="/profile">
          <StyledSpan className="fs-5">{t("navigationBar.profile")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 pt-2 pb-3">
        <ChatDots size={20} className="my-2" />
        <Nav.Link as={LinkWithLanguageQueryParam} to="/more">
          <StyledSpan className="fs-5">{t("navigationBar.more")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
    </StyledNav>
  );
};

export default NavigationBar;

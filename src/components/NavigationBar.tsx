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
import { useSelector } from "react-redux";
import styled from "styled-components";

import { LinkWithLanguageQueryParam } from "../containers/LinkWithLanguageQueryParam";
import ModalTweetCreationForm from "../containers/ModalTweetCreationForm";
import { UserStore } from "../redux/reducers/user";
import { RootState } from "../redux/store";

const StyledNav = styled(Nav)`
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
  const user = useSelector<RootState>((store) => store.user) as UserStore;
  const { t } = useTranslation();
  return (
    <StyledNav className="d-flex flex-column " defaultActiveKey="/">
      <Nav.Item className="d-flex align-items-center ps-2 pb-2 pt-3">
        <House size={20} className="my-2" />
        <Nav.Link
          data-testId="HomePageLink"
          as={LinkWithLanguageQueryParam}
          to="/"
        >
          <StyledSpan className="fs-5">{t("navigationBar.home")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <Hash size={20} className="my-2" />
        <Nav.Link
          data-testId="ExplorePageLink"
          as={LinkWithLanguageQueryParam}
          to="/explore"
        >
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
        <Nav.Link
          data-testId="MessagesPageLink"
          as={LinkWithLanguageQueryParam}
          to="/messages"
        >
          <StyledSpan className="fs-5">
            {t("navigationBar.messages")}
          </StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <Bookmark size={20} className="my-2" />
        <Nav.Link
          data-testId="BookmarksPageLink"
          as={LinkWithLanguageQueryParam}
          to="/bookmarks"
        >
          <StyledSpan className="fs-5">
            {t("navigationBar.bookmarks")}
          </StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <CardText size={20} className="my-2" />
        <Nav.Link
          data-testId="ListsPageLink"
          as={LinkWithLanguageQueryParam}
          to="/lists"
        >
          <StyledSpan className="fs-5">{t("navigationBar.lists")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 py-2">
        <Person size={20} className="my-2" />
        <Nav.Link
          data-testId="ProfilePageLink"
          as={LinkWithLanguageQueryParam}
          to={`/${user.authUser.username}`}
        >
          <StyledSpan className="fs-5">{t("navigationBar.profile")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center ps-2 pt-2 pb-3">
        <ChatDots size={20} className="my-2" />
        <Nav.Link
          data-testId="MorePageLink"
          as={LinkWithLanguageQueryParam}
          to="/more"
        >
          <StyledSpan className="fs-5">{t("navigationBar.more")}</StyledSpan>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <ModalTweetCreationForm />
      </Nav.Item>
    </StyledNav>
  );
};

export default NavigationBar;

import { Nav } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { LinkWithLanguageQueryParam } from "../containers/LinkWithLanguageQueryParam";

const StyledTabs = styled(Tabs)`
  .nav-link:hover {
    background-color: rgba(15, 20, 25, 0.1) !important;
  }
  .active {
    color: black !important;
    border-color: rgb(29, 155, 240) !important;
  }
`;
interface TabsDataProps {
  label: string;
  content?: JSX.Element | string;
  key: string;
  route: string;
}

interface TabsProps {
  tabsData: TabsDataProps[];
  defaultActiveKey: string;
}

const TabsContainer = ({ tabsData, defaultActiveKey }: TabsProps) => {
  const navigate = useNavigate();

  return (
    <StyledTabs
      defaultActiveKey={defaultActiveKey}
      id="justify-tab-example"
      fill
      variant="flat"
      onSelect={(e) => {
        console.log(e);
        switch (e) {
          case "Tweets":
            navigate("/profile");
            break;
          case "Tweets & replies":
            navigate("/profile/with_replies");
            break;
          case "Media":
            navigate("/profile/media");
            break;
          case "Likes":
            navigate("/profile/likes");
            break;

          default:
            break;
        }
      }}
    >
      {tabsData.map(({ label, content, key, route }: TabsDataProps) => {
        return (
          <Tab
            eventKey={key}
            title={label}
            key={key}
            tabClassName="border-0 border-bottom bg-white text-secondary fw-bold p-4"
          >
            <Nav.Link key={key} as={LinkWithLanguageQueryParam} to={route}>
              {content}
            </Nav.Link>
          </Tab>
        );
      })}
    </StyledTabs>
  );
};
export default TabsContainer;

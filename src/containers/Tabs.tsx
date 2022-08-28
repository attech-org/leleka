import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
        tabsData.map(({ key, route }: TabsDataProps) => {
          if (key === e) {
            navigate(route);
          }
        });
      }}
    >
      {tabsData.map(({ label, content, key }: TabsDataProps) => {
        return (
          <Tab
            eventKey={key}
            title={label}
            key={key}
            tabClassName="border-0 border-bottom bg-white text-secondary fw-bold p-4"
          >
            {content}
          </Tab>
        );
      })}
    </StyledTabs>
  );
};
export default TabsContainer;

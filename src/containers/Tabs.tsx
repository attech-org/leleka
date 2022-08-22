import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
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
  content: JSX.Element | string | null | JSX.Element[];
  key: string;
}

interface TabsProps {
  tabsData: TabsDataProps[];
  defaultActiveKey: string;
}

const TabsContainer = ({ tabsData, defaultActiveKey }: TabsProps) => {
  return (
    <StyledTabs
      defaultActiveKey={defaultActiveKey}
      id="justify-tab-example"
      fill
      variant="flat"
    >
      {tabsData.map(({ label, content, key }: TabsDataProps) => {
        return (
          <Tab
            eventKey={key}
            title={label}
            key={key}
            tabClassName="border-0 border-bottom bg-white text-secondary fw-bold fs-5 p-4"
          >
            {content}
          </Tab>
        );
      })}
    </StyledTabs>
  );
};
export default TabsContainer;

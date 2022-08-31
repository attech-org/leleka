import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";
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
}

interface LinkTabsDataProps {
  label: string;
  key: string;
}

interface TabsProps {
  tabsData: TabsDataProps[];
  defaultActiveKey: string;
}

interface LinkTabsProps {
  tabsData: LinkTabsDataProps[];
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
            tabClassName="border-0 border-bottom bg-white text-secondary fw-bold p-4"
          >
            {content}
          </Tab>
        );
      })}
    </StyledTabs>
  );
};

export const LinkTabsContainer = ({
  tabsData,
  defaultActiveKey,
}: LinkTabsProps) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const onTabSelect = (eventKey: unknown) => {
    navigate(eventKey + "?lang=" + i18n.resolvedLanguage);
  };

  return (
    <StyledTabs
      defaultActiveKey={defaultActiveKey}
      id="justify-tab-example"
      fill
      variant="flat"
      onSelect={onTabSelect}
    >
      {tabsData.map(({ label, key }: LinkTabsDataProps) => {
        return (
          <Tab
            eventKey={key}
            title={label}
            key={key}
            tabClassName="border-0 border-bottom bg-white text-secondary fw-bold p-4"
          />
        );
      })}
    </StyledTabs>
  );
};

export default TabsContainer;

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
interface TabsDataProps {
  label: string;
  content: string | null;
  key: string;
}

interface TabsProps {
  tabsData: TabsDataProps[];
  defaultActiveKey: string;
}

const TabsContainer = ({ tabsData, defaultActiveKey }: TabsProps) => {
  return (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      id="justify-tab-example"
      className="mb-3"
      fill
      variant="flat"
    >
      {tabsData.map(({ label, content, key }: TabsDataProps) => {
        return (
          <Tab eventKey={key} title={label} key={key}>
            {content}
          </Tab>
        );
      })}

      {/* <Tab eventKey="Tweets" title="Tweets" />
      <Tab eventKey="Tweets & replies" title="Tweets & replies" />
      <Tab eventKey="Media" title="Media" />
      <Tab eventKey="Likes" title="Likes" /> */}
    </Tabs>
  );
};
export default TabsContainer;

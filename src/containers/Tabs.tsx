import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
interface TabsDataProps {
  label: string;
  content: string | null;
  key: string;
}
const tabsData = [
  {
    label: "Tweets",
    content: null,
    key: "Tweets",
  },

  {
    label: "Tweets & replies",
    content: null,
    key: "Tweets & replies",
  },

  {
    label: "Media",
    content: null,
    key: "Media",
  },
  {
    label: "Likes",
    content: null,
    key: "Likes",
  },
];

const TabsContainer: React.FunctionComponent = () => {
  return (
    <Tabs
      defaultActiveKey="profile"
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

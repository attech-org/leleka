import Layout from "../containers/Layout";
import TabsContainer from "../containers/Tabs";

interface TabKeyProps {
  tabKey: string;
}

const ProfilePage: React.FunctionComponent<TabKeyProps> = ({ tabKey }) => {
  const tabsData = [
    {
      label: "Tweets",
      content: "Tweets",
      key: "Tweets",
      route: "/profile",
    },

    {
      label: "Tweets & replies",
      content: "Tweets & replies",
      key: "Tweets & replies",
      route: "/profile/with_replies",
    },

    {
      label: "Media",
      content: "Media",
      key: "Media",
      route: "/profile/media",
    },
    {
      label: "Likes",
      content: "Likes",
      key: "Likes",
      route: "/profile/likes",
    },
  ];

  return (
    <Layout>
      Profile
      <TabsContainer tabsData={tabsData} defaultActiveKey={tabKey} />
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile/likes">
            Link
          </a>
        </li>
      </ul>
    </Layout>
  );
};

export default ProfilePage;

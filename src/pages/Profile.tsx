import Layout from "../containers/Layout";
import TabsContainer from "../containers/Tabs";

interface TabKeyProps {
  tabKey: string;
}

export const switchTabRoutes = (e: string) => {
  switch (e) {
    case "Tweets":
      return "/profile";
    case "Tweets & replies":
      return "/profile/with_replies";
    case "Media":
      return "/profile/media";
    case "Likes":
      return "/profile/likes";
  }
};
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
    </Layout>
  );
};

export default ProfilePage;

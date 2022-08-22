import Layout from "../containers/Layout";
import TabsContainer from "../containers/Tabs";

const ProfilePage: React.FunctionComponent = () => {
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

  return (
    <Layout>
      Profile
      <TabsContainer tabsData={tabsData} defaultActiveKey={"Tweets"} />
    </Layout>
  );
};

export default ProfilePage;

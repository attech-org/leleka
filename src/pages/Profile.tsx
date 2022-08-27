import Layout from "../containers/Layout";
import ProfileTweetsPage from "../containers/ProfileTweets";
import TabsContainer from "../containers/Tabs";

const ProfilePage: React.FunctionComponent = () => {
  const tabsData = [
    {
      label: "Tweets",
      content: <ProfileTweetsPage />,
      key: "Tweets",
    },

    {
      label: "Tweets & replies",
      content: "Tweets & replies",
      key: "Tweets & replies",
    },

    {
      label: "Media",
      content: "Media",
      key: "Media",
    },
    {
      label: "Likes",
      content: "Likes",
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

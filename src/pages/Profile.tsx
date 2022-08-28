import Layout from "../containers/Layout";
import TabsContainer from "../containers/Tabs";
import { TweetsWithReplies } from "../containers/TweetsWithReplies";

const ProfilePage: React.FunctionComponent = () => {
  const tabsData = [
    {
      label: "Tweets",
      content: "Tweets",
      key: "Tweets",
    },

    {
      label: "Tweets & replies",
      content: { TweetsWithReplies },
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

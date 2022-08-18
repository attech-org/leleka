import HomeContainer from "../containers/Home";
import Layout from "../containers/Layout";
import UserInfo from "../containers/UserInfo";

const HomePage: React.FunctionComponent = () => {
  return (
    <>
      <Layout>
        <HomeContainer />
        <UserInfo />
      </Layout>
    </>
  );
};

export default HomePage;

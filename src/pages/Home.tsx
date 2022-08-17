import SingleTweet from "../components/SingleTweet";
import SingleTweetComment from "../components/SingleTweetComment";
import HomeContainer from "../containers/Home";
import Layout from "../containers/Layout";

const HomePage: React.FunctionComponent = () => {
  return (
    <>
      <Layout>
        <HomeContainer />
        <SingleTweet
          userlogo="https://pbs.twimg.com/profile_images/2204738923/justlviv_normal.jpg"
          username="Ярослав Львівський"
          userNickname="@justlviv"
          tweetText="Все, бля, я поняв, як блокування дальності знімати - Андрій, мобілізований it-спеціаліст, член екіпажу HIMARS. 9 серпня 2022."
          tweetDate="10:00 AM · 10 сер. 2022 р."
          lelekaLink="Leleka Web App"
          retweetCount={23}
          tweetQuoteCount={65}
          likeCount={100}
        />
        <SingleTweetComment
          userlogo="https://pbs.twimg.com/profile_images/2204738923/justlviv_normal.jpg"
          username="Ярослав Львівський"
          userNickname="@justlviv"
          responserUserNickname="@justlviv"
          messegeText="Фігасє ви тут налайкали 😮"
          messegeDate="10 сер."
          answerCount={23}
          retweetCount={23}
          likeCount={100}
        />
      </Layout>
    </>
  );
};

export default HomePage;

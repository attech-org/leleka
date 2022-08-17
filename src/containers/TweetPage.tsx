import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, Paper, IconButton } from "@mui/material";

import SingleTweet from "../pages/SingleTweet";
// import { useHistory } from "react-router-dom";

import "./TweetPage.css";

export const TweetPage: React.FC = (): React.ReactElement => {
  // const history = useHistory();

  // const handleClickButton = () => {
  //   history.goBack();
  // };

  return (
    <Grid>
      <Paper className="tweetHeader">
        <IconButton
          // onClick={handleClickButton}
          className="btn"
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        <div>Твітнути</div>
      </Paper>
      <Paper>
        Тут буде твіт (компонент)
        <SingleTweet />
      </Paper>
    </Grid>
  );
};
// function useHistory() {
//   throw new Error("Function not implemented.");
// }

// import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";

const ErrorsToaster = () => {
  const tweetsFetch = useSelector<RootState, RootState["tweets"]["feedTweets"]>(
    (store) => store.tweets.feedTweets
  );
  return (
    <>
      <ToastContainer position="top-center">
        {tweetsFetch.isLoading && tweetsFetch.error ? (
          <Toast bg="danger">
            <Toast.Body>{`${tweetsFetch.error}`}</Toast.Body>
          </Toast>
        ) : null}
      </ToastContainer>
    </>
  );
};

export default ErrorsToaster;

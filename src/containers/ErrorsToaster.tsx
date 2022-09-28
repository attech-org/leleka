// import { useState } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { pwaActions } from "../redux/reducers/pwa";
import { RootState, AppDispatch } from "../redux/store";
const ErrorsToaster = ({ errorMsg }: { errorMsg: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tweetsFetch = useSelector<RootState, RootState["tweets"]["feedTweets"]>(
    (store) => store.tweets.feedTweets
  );
  const broadcastChannel = new BroadcastChannel("serviceWorker-messages");
  broadcastChannel.addEventListener("message", (event) => {
    if (!event.data.msg) {
      dispatch(pwaActions.cleanPWAMessage());
    } else {
      dispatch(pwaActions.setPWAMessage(event.data.msg));
    }
    console.warn("Received", event.data);
  });
  const pwaMessage = useSelector<RootState, RootState["pwaInfo"]>((store) => ({
    message: store.pwaInfo.message,
  }));
  const [showPwaMessage, setShowPwaMessage] = useState(true);
  const [showTweetsMessage, setShowTweetsMessage] = useState(true);

  const toggleShowPwaMessage = () => {
    setShowPwaMessage(!showPwaMessage);
    dispatch(pwaActions.cleanPWAMessage());
  };
  const toggleShowTweetsMessage = () =>
    setShowTweetsMessage(!showTweetsMessage);
  return (
    <ToastContainer position="top-center">
      {pwaMessage.message ? (
        <Toast bg="danger" onClose={toggleShowPwaMessage} show={showPwaMessage}>
          <Toast.Header>
            <strong className="me-auto" />
          </Toast.Header>
          <Toast.Body>{`${pwaMessage.message}`}</Toast.Body>
        </Toast>
      ) : null}
      {tweetsFetch.isLoading && tweetsFetch.error ? (
        <Toast
          bg="danger"
          onClose={toggleShowTweetsMessage}
          show={showTweetsMessage}
          delay={3000}
          autohide
        >
          <Toast.Body>
            <div className="flex">
              <p style={{ color: "white" }}>{errorMsg}</p>
              <div>
                <button>x</button>
              </div>
            </div>
          </Toast.Body>
        </Toast>
      ) : null}
    </ToastContainer>
  );
};

export default ErrorsToaster;

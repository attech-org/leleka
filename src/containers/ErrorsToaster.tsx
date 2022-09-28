// import { useState } from "react";
import { useState } from "react";
import { Toast, ToastContainer, CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { pwaActions } from "../redux/reducers/pwa";
import { RootState, AppDispatch } from "../redux/store";

const ErrorsToaster = ({ errorMsg }: { errorMsg: string }) => {
  const dispatch = useDispatch<AppDispatch>();

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
  const [showMessage, setShowMessage] = useState(true);

  const toggleShowPwaMessage = () => {
    setShowPwaMessage(!showPwaMessage);
    dispatch(pwaActions.cleanPWAMessage());
  };
  const toggleShowMessage = () => setShowMessage(!showMessage);
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
      {errorMsg ? (
        <Toast
          bg="danger"
          onClose={toggleShowMessage}
          show={showMessage}
          delay={3000}
          autohide
        >
          <Toast.Body>
            <div className="d-flex">
              <p style={{ color: "white" }}>{errorMsg}</p>
              <div className="ms-auto">
                <CloseButton onClick={toggleShowMessage} variant="white" />
              </div>
            </div>
          </Toast.Body>
        </Toast>
      ) : null}
    </ToastContainer>
  );
};

export default ErrorsToaster;

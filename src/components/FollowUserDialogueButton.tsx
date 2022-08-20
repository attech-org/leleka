import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { FollowStatus } from "../types/constants";

const VerticallyCenteredModal = (props: {
  followerName: string;
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
}) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2>Unfollow @{props.followerName}?</h2>
        <p>
          Their Tweets will no longer show up in your home timeline. You can
          still view their profile, unless their Tweets are protected.
        </p>

        <div>
          <Button
            className="rounded-pill"
            variant="dark"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={props.onSubmit}
          >
            Unfollow
          </Button>
        </div>
        <div>
          <Button
            className="rounded-pill"
            variant="outline-dark"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={props.onHide}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
const FollowButton = (props: {
  followStatus: FollowStatus;
  followerName: string;
}) => {
  const [status, setStatus] = useState<FollowStatus>(props.followStatus);
  const [modalDialogueShow, setModalWarningShow] = useState<boolean>(false);
  const setFollowStatus = (st: FollowStatus) => {
    switch (st) {
      case FollowStatus.FOLLOWED: {
        setModalWarningShow(true);
        break;
      }
      case FollowStatus.UNFOLLOWED: {
        setStatus(FollowStatus.FOLLOWED);
        break;
      }
    }
  };
  return status === FollowStatus.UNFOLLOWED ? (
    <Button
      className="rounded-pill"
      variant="dark"
      onClick={() => {
        setFollowStatus(FollowStatus.UNFOLLOWED);
      }}
    >
      Follow
    </Button>
  ) : status === FollowStatus.FOLLOWED ? (
    <>
      <Button
        className="rounded-pill"
        variant="outline-danger"
        onClick={() => setFollowStatus(FollowStatus.FOLLOWED)}
      >
        Unfollow
      </Button>
      <VerticallyCenteredModal
        followerName={props.followerName}
        show={modalDialogueShow}
        onHide={() => setModalWarningShow(false)}
        onSubmit={() => {
          setStatus(FollowStatus.UNFOLLOWED);
          setModalWarningShow(false);
        }}
      />
    </>
  ) : (
    <Button variant="outline-danger">xer</Button>
  );
};
export default FollowButton;

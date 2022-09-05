import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { FollowStatus } from "../types/constants";

const VerticallyCenteredModal = (props: {
  followerName: string;
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2>{`${t("common.unfollow")} @${props.followerName}?`}</h2>
        <p>{t("followUser.description")}</p>

        <div>
          <Button
            className="rounded-pill text-nowrap"
            variant="dark"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={props.onSubmit}
          >
            {t("common.unfollow")}
          </Button>
        </div>
        <div>
          <Button
            className="rounded-pill text-nowrap"
            variant="outline-dark"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={props.onHide}
          >
            {t("common.close")}
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

  const { t } = useTranslation();

  return status === FollowStatus.UNFOLLOWED ? (
    <Button
      className="rounded-pill text-nowrap"
      variant="dark"
      onClick={() => {
        setFollowStatus(FollowStatus.UNFOLLOWED);
      }}
    >
      {t("common.follow")}
    </Button>
  ) : status === FollowStatus.FOLLOWED ? (
    <>
      <Button
        className="rounded-pill text-nowrap"
        variant="outline-danger"
        onClick={() => setFollowStatus(FollowStatus.FOLLOWED)}
      >
        {t("common.unfollow")}
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

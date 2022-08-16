import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

import Registration, { windowTitle } from "./Registration";

const StyledModalTitle = styled(Modal.Title)`
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
`;

const ModalAuthorization = () => {
  const [show, setShow] = useState(false);

  const toggleShowState = () => setShow(!show);
  return (
    <>
      <Button variant="primary" onClick={toggleShowState}>
        Зареєструватися
      </Button>

      <Modal size="lg" centered show={show} onHide={toggleShowState}>
        <Modal.Header closeButton> </Modal.Header>
        <StyledModalTitle>{windowTitle}</StyledModalTitle>
        <Modal.Body>
          <Registration />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAuthorization;

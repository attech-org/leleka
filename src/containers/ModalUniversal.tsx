import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const TransparentButton = styled.button`
  all: unset;
`;

interface ModalProps {
  button: string | JSX.Element;
  title?: string;
  content?: JSX.Element | null;
}

const ModalUniversal = ({ button, content, title }: ModalProps) => {
  const [show, setShow] = useState(false);

  const toggleShowState = () => setShow(!show);

  return (
    <>
      {typeof button === "string" ? (
        <Button variant="primary" onClick={toggleShowState}>
          {button}
        </Button>
      ) : (
        // React.createComponent(button, { onClick: toggleShowState })
        <TransparentButton onClick={toggleShowState}>
          {button}
        </TransparentButton>
      )}

      <Modal size="lg" centered show={show} onHide={toggleShowState}>
        <Modal.Header closeButton> </Modal.Header>
        <Modal.Title className="fw-bold fs-2 text-center">{title}</Modal.Title>
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    </>
  );
};

export default ModalUniversal;

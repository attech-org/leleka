import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface ModalProps {
  buttonName: string;
  title: string;
  content?: JSX.Element | null;
}

const ModalUniversal = ({ buttonName, content, title }: ModalProps) => {
  const [show, setShow] = useState(false);

  const toggleShowState = () => setShow(!show);
  return (
    <>
      <Button variant="primary" onClick={toggleShowState}>
        {buttonName}
      </Button>

      <Modal size="lg" centered show={show} onHide={toggleShowState}>
        <Modal.Header closeButton> </Modal.Header>
        <Modal.Title className="fw-bold fs-2 text-center">{title}</Modal.Title>
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    </>
  );
};

export default ModalUniversal;

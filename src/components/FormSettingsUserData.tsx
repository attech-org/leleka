import React, { useState, useEffect, useRef } from "react";
import { Form, Modal, ModalBody, ModalTitle, Button, Figure, Row } from "react-bootstrap";

interface IFormInput {
  name: string;
  bio: string;
  location: string;
  website: string;
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export default function FormSettingsUserData<IFormInput>() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //------------------------------ avatar image ------------------------
  const [fileAvatar, setFileAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const fileRefAvatar = useRef<any>();

  useEffect(() => {
    let objectUrlAvatar: any;
    if (fileAvatar) {
      objectUrlAvatar = URL.createObjectURL(fileAvatar);
      setPreviewAvatar(objectUrlAvatar);
    }

    return () => URL.revokeObjectURL(objectUrlAvatar);
  }, [fileAvatar]);

  // const handleResetAvatar = () => {
  //   setPreviewAvatar(null);
  //   fileRefAvatar.current.value = null;
  // };

  //------------------------------ userImage ------------------------
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileRefImage = useRef<any>();

  useEffect(() => {
    let objectUrlImage: any;
    if (fileImage) {
      objectUrlImage = URL.createObjectURL(fileImage);
      setPreviewImage(objectUrlImage);
    }

    return () => URL.revokeObjectURL(objectUrlImage);
  }, [fileImage]);

  // const handleResetImage = () => {
  //   setPreviewImage(null);
  //   fileRefImage.current.value = null;
  // };
  //-----------------------------------------------------------------------

  return (
    <>
      {/*----button modal window -------*/}
      {/* <Button variant="primary" onClick={handleShow}>
        test modal window
      </Button> */}
      {/*----modal window -------*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <ModalTitle>Edit profile</ModalTitle>
        </Modal.Header>
        <ModalBody>
          <Form>
            {/*----avatar -------*/}
            <Figure>
              {previewAvatar && (
                <>
                  <Figure.Image roundedCircle src={previewAvatar} alt="preview" />
                </>
              )}
            </Figure>
            <Figure>
              {/*----button userPicture added -------*/}
              {/* <Button variant="secondary" onClick={handleShowImage}>
                  User photo
                </Button> */}
              {/*----added userPicture modal window -------*/}
              {/* <Modal show={showImage} onHide={handleCloseimage}>
                  <Modal.Header closeButton /> */}
              <Form.Group as={Row} controlId="avatarFile" className="mb-3">
                <div className="d-grid gap-2">
                  <Form.Label>Upload user avatar</Form.Label>
                  <Form.Control type="file" size="sm" ref={fileRefAvatar} onChange={(e: any) => setFileAvatar(e.currentTarget.files[0])} />
                  {/* <Button variant="danger" onClick={handleResetAvatar}>
                      Clear photo
                    </Button> */}
                </div>
              </Form.Group>
              {/* </Modal> */}
            </Figure>

            {/*----user image -------*/}
            <Figure>
              {previewImage && (
                <>
                  <Figure.Image fluid rounded src={previewImage} alt="preview" />
                </>
              )}
            </Figure>
            <Figure>
              {/*----button userPicture added -------*/}
              {/* <Button variant="secondary" onClick={() => setShowBgImage(true)}>
                  User image
                </Button> */}
              {/*----added userPicture modal window -------*/}
              {/* <Modal show={showBgImage} onHide={() => setShowBgImage(false)}>
                  <Modal.Header closeButton /> */}
              <Form.Group controlId="bgFile" className="mb-3">
                <div className="d-grid gap-2">
                  <Form.Label>Upload user picture</Form.Label>
                  <Form.Control type="file" size="sm" ref={fileRefImage} onChange={(e: any) => setFileImage(e.target.files[0])} />
                  {/* <Button variant="danger" onClick={handleResetImage}>
                        Clear photo
                      </Button> */}
                </div>
              </Form.Group>
              {/* </Modal> */}
            </Figure>

            {/*----NameUser input -------*/}
            <Form.Group className="mb-3" controlId="inputNameUser">
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            {/*----BioUser field -------*/}
            <Form.Group className="mb-3" controlId="inputBioUser">
              <Form.Control as="textarea" rows={2} placeholder="Bio" />
            </Form.Group>
            {/*----LocationUser input -------*/}
            <Form.Group className="mb-3" controlId="inputLocationUser">
              <Form.Control type="text" placeholder="Location" />
            </Form.Group>
            {/*----WebsiteUser input -------*/}
            <Form.Group className="mb-3" controlId="inputWebsiteUser">
              <Form.Control type="text" placeholder="Website" />
            </Form.Group>
            {/*----BirthDateUser input -------*/}
            <Form.Group className="mb-3" controlId="inputBirthDateUser">
              <Form.Control type="date" placeholder="Date" data-date-format="YYYY/MM/DD" />
            </Form.Group>
            {/*----advanced settings button -------*/}
            <div className="d-grid gap-2">
              <Button variant="light">Switch to professional</Button>
            </div>
            <br />
            <div className="d-grid gap-2">
              <Button variant="primary">Save</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

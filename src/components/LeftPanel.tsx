import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Modal,
  ModalBody,
  ModalTitle,
  Button,
  Figure,
  FormControlProps,
} from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

const Div = styled.div`
  position: fixed;

  height: 100vh;

  background-color: yellowgreen;

  width: 25%;
  @media (max-width: 1280px) {
    width: 14%;
  }
  @media (max-width: 1000px) {
    width: 19%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  @media (max-width: 500px) {
    width: 100%;
    order: 1;
  }
`;
//----------------------------------------------my component ---------------------------------------------------------------
interface IFormInput {
  name: string;
  bio: string;
  location: string;
  website: string;
}
//------------------------------------------------------------------------------------------------------------------------------
export const LeftPanel = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { control, handleSubmit } = useForm<IFormInput>();

  const [showImage, setShowImage] = useState(false);
  const [showBgImage, setShowBgImage] = useState(false);
  const handleCloseimage = () => setShowImage(false);
  const handleShowImage = () => setShowImage(true);

  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
  //   console.log(data);
  // };

  //------------------------------ avatar image ------------------------
  const [fileAvatar, setFileAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();
  const fileRefAvatar = useRef();

  useEffect(() => {
    let objectUrlAvatar: any;
    if (fileAvatar) {
      objectUrlAvatar = URL.createObjectURL(fileAvatar);
      setPreviewAvatar(objectUrlAvatar);
    }

    return () => URL.revokeObjectURL(objectUrlAvatar);
  }, [fileAvatar]);

  const handleResetAvatar = () => {
    setPreviewAvatar(null);
    fileRefAvatar.current.value = null;
  };

  //------------------------------ userImage ------------------------
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileRefImage = useRef();

  useEffect(() => {
    let objectUrlImage: any;
    if (fileImage) {
      objectUrlImage = URL.createObjectURL(fileImage);
      setPreviewImage(objectUrlImage);
    }

    return () => URL.revokeObjectURL(objectUrlImage);
  }, [fileImage]);

  const handleResetImage = () => {
    setPreviewImage(null);
    fileRefImage.current.value = null;
  };
  //-----------------------------------------------------------------------

  return (
    <Wrapper>
      <Div>
        left side
        {/*----button modal window -------*/}
        <Button variant="primary" onClick={handleShow}>
          test modal window
        </Button>
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
                    <Figure.Image
                      roundedCircle
                      src={previewAvatar}
                      alt="preview"
                    />
                  </>
                )}
              </Figure>
              <Figure>
                {/*----button userPicture added -------*/}
                <Button variant="secondary" onClick={handleShowImage}>
                  User photo
                </Button>
                {/*----added userPicture modal window -------*/}
                <Modal show={showImage} onHide={handleCloseimage}>
                  <Modal.Header closeButton />
                  <Form.Group controlId="avatarFile" className="mb-3">
                    <Form.Label>Upload user avatar</Form.Label>
                    <Form.Control
                      type="file"
                      ref={fileRefAvatar}
                      onChange={(e) => setFileAvatar(e.target.files[0])}
                    />
                    <div className="d-grid gap-2">
                      <Button variant="danger" onClick={handleResetAvatar}>
                        Clear photo
                      </Button>
                    </div>
                  </Form.Group>
                </Modal>
              </Figure>

              {/*----user image -------*/}
              <Figure>
                {previewImage && (
                  <>
                    <Figure.Image
                      fluid
                      rounded
                      src={previewImage}
                      alt="preview"
                    />
                  </>
                )}
              </Figure>
              <Figure>
                {/*----button userPicture added -------*/}
                <Button
                  variant="secondary"
                  onClick={() => setShowBgImage(true)}
                >
                  User image
                </Button>
                {/*----added userPicture modal window -------*/}
                <Modal show={showBgImage} onHide={() => setShowBgImage(false)}>
                  <Modal.Header closeButton />
                  <Form.Group controlId="bgFile" className="mb-3">
                    <Form.Label>Upload user picture</Form.Label>
                    <Form.Control
                      type="file"
                      ref={fileRefImage}
                      onChange={(e) => setFileImage(e.target.files[0])}
                    />
                    <div className="d-grid gap-2">
                      <Button variant="danger" onClick={handleResetImage}>
                        Clear photo
                      </Button>
                    </div>
                  </Form.Group>
                </Modal>
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
                <Form.Control type="date" placeholder="Date" />
              </Form.Group>
              {/*----advanced settings button -------*/}
              <div className="d-grid gap-2">
                <Button variant="light">Switch to professional</Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Div>
    </Wrapper>
  );
};

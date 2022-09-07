import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Modal,
  ModalBody,
  ModalTitle,
  Button,
  Figure,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface IFormInput {
  userName: string;
  bio: string;
  location: string;
  website: string;
  dateOfBirth: Date;
}

const FormSettingsUserData = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { t } = useTranslation();

  //------------------------------ validation ------------------------

  const schema = yup.object().shape({
    username: yup.string().required("validation:errors.fullname.required"),
    dateOfBirth: yup
      .date()
      .typeError("validation:errors.dateOfBirth.required")
      .required("validation:errors.dateOfBirth.required"),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: IFormInput) => {
    // eslint-disable-next-line no-console
    console.log(data);
    reset();
  };

  //------------------------------ avatar image ------------------------

  const [fileAvatar, setFileAvatar] = useState<File>();
  const [previewAvatar, setPreviewAvatar] = useState("");
  const fileRefAvatar = useRef(null);

  useEffect(() => {
    let objectUrlAvatar: string;
    if (fileAvatar) {
      objectUrlAvatar = URL.createObjectURL(fileAvatar);
      setPreviewAvatar(objectUrlAvatar);
    }

    return () => URL.revokeObjectURL(objectUrlAvatar);
  }, [fileAvatar]);

  //------------------------------ userImage ------------------------
  const [fileImage, setFileImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const fileRefImage = useRef(null);

  useEffect(() => {
    let objectUrlImage: string;
    if (fileImage) {
      objectUrlImage = URL.createObjectURL(fileImage);
      setPreviewImage(objectUrlImage);
    }

    return () => URL.revokeObjectURL(objectUrlImage);
  }, [fileImage]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files) {
      setFileAvatar(e.currentTarget.files[0]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files) {
      setFileImage(e.currentTarget.files[0]);
    }
  };
  //-----------------------------------------------------------------------

  return (
    <>
      {/*----modal window -------*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <ModalTitle>{t(`userSettings.editProfile`)}</ModalTitle>
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
              <Form.Group as={Row} controlId="avatarFile" className="mb-3">
                <div className="d-grid gap-2">
                  <Form.Label>{t(`userSettings.uploadUserAvatar`)}</Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    ref={fileRefAvatar}
                    onChange={handleAvatarUpload}
                  />
                </div>
              </Form.Group>
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
              <Form.Group controlId="bgFile" className="mb-3">
                <div className="d-grid gap-2">
                  <Form.Label>{t(`userSettings.uploadUserPicture`)}</Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    ref={fileRefImage}
                    onChange={handleImageUpload}
                  />
                </div>
              </Form.Group>
            </Figure>

            {/*----NameUser input -------*/}
            <Form.Group className="mb-3" controlId="inputNameUser">
              <Form.Control type="text" placeholder={t(`userSettings.name`)} />
              <p className="text-danger mt-1">
                {errors.userName &&
                  errors.userName.message &&
                  t(`${errors.userName.message}`)}
              </p>
            </Form.Group>
            {/*----BioUser field -------*/}
            <Form.Group className="mb-3" controlId="inputBioUser">
              <Form.Control
                as="textarea"
                rows={2}
                placeholder={t(`userSettings.bio`)}
              />
            </Form.Group>
            {/*----LocationUser input -------*/}
            <Form.Group className="mb-3" controlId="inputLocationUser">
              <Form.Control
                type="text"
                placeholder={t(`userSettings.location`)}
              />
            </Form.Group>
            {/*----WebsiteUser input -------*/}
            <Form.Group className="mb-3" controlId="inputWebsiteUser">
              <Form.Control
                type="text"
                placeholder={t(`userSettings.website`)}
              />
            </Form.Group>
            {/*----BirthDateUser input -------*/}
            <Form.Group className="mb-3" controlId="inputBirthDateUser">
              <Form.Control
                type="date"
                placeholder={t(`userSettings.dateOfBirth`)}
                data-date-format="YYYY/MM/DD"
              />
              <p className="text-danger">
                {errors.dateOfBirth &&
                  errors.dateOfBirth.message &&
                  t(`${errors.dateOfBirth.message}`)}
              </p>
            </Form.Group>
            {/*----advanced settings button -------*/}
            <div className="d-grid gap-2">
              <Button variant="light">
                {t(`userSettings.professionalButton`)}
              </Button>
            </div>
            <br />
            <div className="d-grid gap-2">
              <Button variant="primary" onSubmit={handleSubmit(submitForm)}>
                {t(`userSettings.saveButton`)}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default FormSettingsUserData;

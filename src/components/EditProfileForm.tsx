import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import * as yup from "yup";

import { Banner } from "../containers/Banner";
import ModalUniversal from "../containers/ModalUniversal";
import { userActions } from "../redux/reducers/user";
import { AppDispatch, RootState } from "../redux/store";

interface Label {
  counter?: boolean;
}

const StyledLabel = styled.label<Label>`
  padding-top: 2rem !important;
  ${(props) =>
    props.counter &&
    css`
      transform: scale(1) translateY(-1.5rem) translateX(0) !important;
      font-size: 0.85rem;
      opacity: 0;
    `}
`;

interface IFormInput {
  username: string;
  bio: string;
  location: string;
  website: string;
  birthDate: string;
}

const EditProfileForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  //-----------------------------------------------------------------------
  const username = useSelector<RootState, RootState["user"]["name"]>(
    (store) => store.user.name
  );

  const bio = useSelector<
    RootState,
    Partial<RootState["user"]["profile"]["bio"]>
  >((store) => store.user.profile.bio);

  const location = useSelector<RootState, RootState["user"]["location"]>(
    (store) => store.user.location
  );

  const website = useSelector<RootState, RootState["user"]["url"]>(
    (store) => store.user.url
  );

  const birthDate = useSelector<
    RootState,
    RootState["user"]["profile"]["birthDate"]
  >((store) => store.user.profile.birthDate);
  //-----------------------------------------------------------------------

  //------------------------------ validation ------------------------

  const schema = yup.object().shape({
    username: yup.string().required("validation:errors.fullname.required"),
    dateOfBirth: yup
      .date()
      .typeError("validation:errors.dateOfBirth.required")
      .required("validation:errors.dateOfBirth.required"),
  });

  const preloadedValues = {
    username: username,
    bio: bio,
    location: location,
    website: website,
    birthDate: birthDate,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: preloadedValues,
  });

  const watchUsername = watch("username");
  const watchBio = watch("bio");
  const watchLocation = watch("location");
  const watchWebsite = watch("website");

  const submitForm = (data: IFormInput) => {
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch(userActions.setUserData(data));
  };
  const [show, setShow] = useState(false);

  const toggleShowState = () => setShow(!show);

  const ProfileForm = (
    <Container
      // style={{
      //   width: "600px",
      //   height: "650px",
      //   overflow: "auto",
      // }}
      className="p-0"
    >
      <Banner isEditBanner />

      <Form>
        {/*----NameUser input -------*/}
        <FloatingLabel
          label={t(`validation:userSettings.name`)}
          className="mb-3"
          controlId="inputNameUser"
        >
          <Form.Control
            {...register("username", { required: true, maxLength: 30 })}
            type="text"
            placeholder={t(`validation:userSettings.name`)}
            maxLength={50}
          />
          <StyledLabel
            counter
            className="pt-4 text-end"
            htmlFor="floatingInputCustom"
          >
            {watchUsername ? watchUsername.length : 0} / 50
          </StyledLabel>
          <p className="text-danger mt-1">
            {errors.username &&
              errors.username.message &&
              t(`${errors.username.message}`)}
          </p>
        </FloatingLabel>
        {/*----BioUser field -------*/}
        <FloatingLabel
          label={t(`validation:userSettings.bio`)}
          className="mb-3 flex-wrap"
          controlId="inputBioUser"
        >
          <Form.Control
            {...register("bio")}
            style={{ height: "100px" }}
            placeholder={t(`validation:userSettings.bio`)}
            maxLength={160}
          />
          <StyledLabel
            counter
            className="pt-4 text-end"
            htmlFor="floatingInputCustom"
          >
            {watchBio ? watchBio.length : 0} / 160
          </StyledLabel>
        </FloatingLabel>
        {/*----LocationUser input -------*/}
        <FloatingLabel
          label={t(`validation:userSettings.location`)}
          className="mb-3"
          controlId="inputLocationUser"
        >
          <Form.Control
            {...register("location")}
            type="text"
            placeholder={t(`validation:userSettings.location`)}
            maxLength={30}
          />
          <StyledLabel
            counter
            className="pt-3 text-end"
            htmlFor="floatingInputCustom"
          >
            {watchLocation ? watchLocation.length : 0} / 30
          </StyledLabel>
        </FloatingLabel>
        {/*----WebsiteUser input -------*/}
        <FloatingLabel
          label={t(`validation:userSettings.website`)}
          className="mb-3"
          controlId="inputWebsiteUser"
        >
          <Form.Control
            {...register("website")}
            type="text"
            placeholder={t(`validation:userSettings.website`)}
            maxLength={100}
          />
          <StyledLabel
            counter
            className="pt-4 text-end"
            htmlFor="floatingInputCustom"
          >
            {watchWebsite ? watchWebsite.length : 0} / 100
          </StyledLabel>
        </FloatingLabel>
        {/*----birthDate input -------*/}
        <Form.Group className="mb-3" controlId="inputBirthDateUser">
          <Form.Control
            type="date"
            placeholder={t(`validation:userSettings.dateOfBirth`)}
            data-date-format="YYYY/MM/DD"
          />
          <p className="text-danger">
            {errors.birthDate &&
              errors.birthDate.message &&
              t(`${errors.birthDate.message}`)}
          </p>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button
            variant="light"
            className="rounded-1 px-3 mb-5 d-flex justify-content-between align-items-center"
          >
            <span className="fs-5">
              {t(`validation:userSettings.professionalButton`)}
            </span>
            <ChevronRight size={20} />
          </Button>
        </div>

        <Button
          type="submit"
          variant="dark"
          className="rounded-5 py-1 px-3"
          onSubmit={handleSubmit(submitForm)}
        >
          {t(`validation:userSettings.saveButton`)}
        </Button>
      </Form>
    </Container>
  );

  const EditProfileButton = (
    <Button
      onClick={toggleShowState}
      variant="light"
      className="rounded-5 fw-semibold border-secondary border-opacity-25"
    >
      {t(`validation:userSettings.editProfile`)}
    </Button>
  );

  return <ModalUniversal button={EditProfileButton} content={ProfileForm} />;
};

export default EditProfileForm;

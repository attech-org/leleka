import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import * as yup from "yup";

import Banner from "../containers/Banner";
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

const StyledInput = styled.input`
  width: 28px;
  height: 28px;
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
  });

  const preloadedValues = {
    username,
    bio,
    location,
    website,
    birthDate,
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

  const ProfileForm = (
    <Container className="p-0">
      <Banner isEditBanner />

      <Form>
        {/*----NameUser input -------*/}
        <FloatingLabel
          label={t(`validation:userSettings.name`)}
          className="mb-3"
          controlId="inputNameUser"
        >
          <Form.Control
            {...register("username")}
            type="text"
            placeholder={t(`validation:userSettings.name`)}
            maxLength={50}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
          <StyledLabel
            counter
            className="pt-4 text-end"
            htmlFor="floatingInputCustom"
          >
            {watchUsername ? watchUsername.length : 0} / 50
          </StyledLabel>
        </FloatingLabel>
        <p className="text-danger mt-1">
          {errors.username &&
            errors.username.message &&
            t(`${errors.username.message}`)}
        </p>
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
        <div className="mb-4">
          <div className="text-secondary mb-1 mt-3 d-flex align-items-center">
            <p>{t(`validation:userSettings.birthDate`)}</p>{" "}
            <span className="mb-1 mx-1">.</span>
            <div className="text-primary p-0 text-decoration-none">
              <StyledInput
                className="position-absolute opacity-0"
                type="date"
                placeholder={t(`validation:userSettings.birthDate`)}
                data-date-format="YYYY/MM/DD"
              />
              {t(`validation:userSettings.editBirthDate`)}
            </div>
          </div>

          {birthDate ? (
            <div className="fs-5">{birthDate}</div>
          ) : (
            <div className="fs-5">
              {t(`validation:userSettings.addBirthDate`)}
            </div>
          )}
        </div>

        <div className="d-grid gap-2">
          <Button
            variant="light"
            className="rounded-1 px-3 mb-4 d-flex justify-content-between align-items-center"
          >
            <span className="fs-5">
              {t(`validation:userSettings.professionalButton`)}
            </span>
            <ChevronRight size={20} />
          </Button>
        </div>

        <div className="d-grid gap-2">
          <Button
            type="submit"
            variant="dark"
            className="rounded-5 py-1 px-3"
            onSubmit={handleSubmit(submitForm)}
          >
            {t(`validation:userSettings.saveButton`)}
          </Button>
        </div>
      </Form>
    </Container>
  );

  const EditProfileButton = (
    <Button
      variant="light"
      className="me-3 mt-2 rounded-5 fw-semibold border-secondary border-opacity-25"
    >
      {t(`validation:userSettings.editProfile`)}
    </Button>
  );

  return <ModalUniversal button={EditProfileButton} content={ProfileForm} />;
};

export default EditProfileForm;

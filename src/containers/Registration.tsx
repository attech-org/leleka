import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import * as yup from "yup";

import icon_1 from "../images/icon_1.png";
import { userActions } from "../redux/reducers/user";
import { AppDispatch, RootState } from "../redux/store";
// import { LinkWithLanguageQueryParam } from "./LinkWithLanguageQueryParam";
import ModalUniversal from "./ModalUniversal";

// export const windowTitle = "Створіть свій профіль";

interface RegistrationForm {
  username: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

interface Label {
  counter?: boolean;
}

const StyledFormFloating = styled(Form.Floating)`
  .form-control:focus ~ label,
  .form-control:not(:placeholder-shown) ~ label {
    transform: scale(0.85) translateY(-1rem) translateX(0.15rem);
  }
`;

const StyledLabel = styled.label<Label>`
  padding-top: 1rem !important;
  ${(props) =>
    props.counter &&
    css`
      transform: scale(1) translateY(-1.5rem) translateX(0) !important;
      font-size: calc(1.5rem * 0.85);
      opacity: 0;
    `}
`;

const schema = yup.object().shape({
  username: yup.string().required("validation:errors.fullname.required"),
  email: yup
    .string()
    .email("validation:errors.email.invalidFormat")
    .required("validation:errors.email.required"),
  dateOfBirth: yup
    .date()
    .typeError("validation:errors.dateOfBirth.required")
    .required("validation:errors.dateOfBirth.required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "validation:errors.password.invalidFormat"
    )
    .required("validation:errors.email.required"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "validation:errors.confirmPassword.match"
    ),
});

const logo = (
  <header className="d-flex justify-content-center align-items-center w-100">
    <img src={icon_1} width="50px" alt="Logo" />
  </header>
);

const Registration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const currentUserId = useSelector<RootState>(
    (store) => store.user.authUser._id
  );
  const currentUserName = useSelector<RootState>(
    (store) => store.user.authUser.username
  );

  const registrationTitle = t("validation:fields.createProfile");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: RegistrationForm) => {
    dispatch(userActions.registerUser(data));
    reset();
  };

  const watchusername = watch("username");

  const registerForm = (
    <section className="w-50 mt-4 m-auto d-grid gap-4">
      <Form className="d-grid" onSubmit={handleSubmit(submitForm)}>
        <StyledFormFloating className="form-floating">
          <Form.Control
            {...register("username")}
            className="form-control"
            type="text"
            name="username"
            placeholder={t("validation:fields.fullname")}
            maxLength={50}
          />
          <StyledLabel
            className="pt-1 text-muted"
            htmlFor="floatingInputCustom"
          >
            {t("validation:fields.fullname")}
          </StyledLabel>
          <StyledLabel
            counter
            className="fs-6 mt-2 text-end"
            htmlFor="floatingInputCustom"
          >
            {watchusername ? watchusername.length : 0} / 50
          </StyledLabel>
        </StyledFormFloating>
        {errors.username && (
          <p className="text-danger fst-italic fs-6 mt-1">
            {t(`${errors?.username?.message}`)}
          </p>
        )}
        <StyledFormFloating className="form-floating mt-3">
          <Form.Control
            className="form-control"
            {...register("email")}
            type="text"
            name="email"
            placeholder={t("validation:fields.email")}
          />
          <StyledLabel
            className="pt-1 text-muted"
            htmlFor="floatingInputCustom"
          >
            {t("validation:fields.email")}
          </StyledLabel>
        </StyledFormFloating>
        {errors.email && (
          <p className="text-danger fst-italic fs-6 mt-1">
            {t(`${errors?.email?.message}`)}
          </p>
        )}

        <StyledFormFloating className="form-floating mt-3">
          <Form.Control
            className="fs-6"
            {...register("dateOfBirth")}
            type="date"
            name="dateOfBirth"
          />
          <StyledLabel
            className="pt-1 text-muted"
            htmlFor="floatingInputCustom"
          >
            {t("validation:fields.dateOfBirth")}
          </StyledLabel>
        </StyledFormFloating>
        {errors.dateOfBirth && (
          <p className="text-danger fst-italic fs-6 mt-1">
            {t(`${errors?.dateOfBirth?.message}`)}
          </p>
        )}

        <StyledFormFloating className="form-floating mt-3">
          <Form.Control
            className="form-control"
            {...register("password")}
            type="password"
            name="password"
            placeholder={t("validation:fields.password")}
            autoComplete="on"
          />
          <StyledLabel
            className="pt-1 text-muted"
            htmlFor="floatingInputCustom"
          >
            {t("validation:fields.password")}
          </StyledLabel>
        </StyledFormFloating>
        {errors.password && (
          <p className="text-danger fst-italic fs-6 mt-1">
            {t(`${errors?.password?.message}`)}
          </p>
        )}

        <StyledFormFloating className="form-floating mt-3">
          <Form.Control
            className="form-control"
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            placeholder={t("validation:fields.confirmPassword")}
            autoComplete="on"
          />
          <StyledLabel
            className="pt-1 text-muted"
            htmlFor="floatingInputCustom"
          >
            {t("validation:fields.confirmPassword")}
          </StyledLabel>
        </StyledFormFloating>
        {errors.confirmPassword && (
          <p className="text-danger fst-italic fs-6 mt-1">
            {t(`${errors?.confirmPassword?.message}`)}
          </p>
        )}

        <div className="d-grid gap-2">
          <Button
            className="fw-700 w-100 d-block my-4 rounded-5 py-2 border border-gray-400"
            type="submit"
            variant="secondary"
          >
            {t("validation:fields.register")}
          </Button>

          {/* <div>
            <span className="text-secondary">{t("login.haveAccount")}</span>
            <LinkWithLanguageQueryParam
              className="ms-1 text-decoration-none"
              to="/authorization"
            >
              {t("login.signIn")}
            </LinkWithLanguageQueryParam>
          </div> */}
        </div>
      </Form>
    </section>
  );

  const registrationButton = (
    <div className="d-grid w-100">
      <div className="rounded-5 p-3 fw-semibold text-center bg-primary text-white">
        {t("validation:fields.buttonName")}
      </div>
    </div>
  );

  return (
    <ModalUniversal
      button={registrationButton}
      header={logo}
      title={currentUserId ? `Welcome, ${currentUserName}` : registrationTitle}
      content={currentUserId ? null : registerForm}
    />
  );
};

export default Registration;

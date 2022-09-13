import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import * as yup from "yup";

import { userActions } from "../redux/reducers/user";
import { AppDispatch, RootState } from "../redux/store";
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
    transform: scale(0.85) translateY(-1.3rem) translateX(0.15rem);
  }
`;

const StyledLabel = styled.label<Label>`
  padding-top: 2rem !important;
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

const Registration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const currentUserId = useSelector<RootState>((store) => store.user._id);
  const currentUserName = useSelector<RootState>(
    (store) => store.user.username
  );

  const registrationButtonName = t("validation:fields.buttonName");
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
    <Form className="px-4" onSubmit={handleSubmit(submitForm)}>
      <StyledFormFloating className="fs-4">
        <Form.Control
          {...register("username")}
          className="fs-4 py-5"
          type="text"
          name="username"
          placeholder="Ім'я"
          maxLength={50}
        />
        <StyledLabel className="pt-4 text-muted" htmlFor="floatingInputCustom">
          {t("validation:fields.fullname")}
        </StyledLabel>
        <StyledLabel
          counter
          className="pt-4 text-end"
          htmlFor="floatingInputCustom"
        >
          {watchusername ? watchusername.length : 0} / 50
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger mt-1">
        {errors.username &&
          errors.username.message &&
          t(`${errors.username.message}`)}
      </p>
      <StyledFormFloating className="fs-4">
        <Form.Control
          className="mt-3 fs-4 py-5"
          {...register("email")}
          type="text"
          name="email"
          placeholder="Ел. пошта"
        />
        <StyledLabel className="pt-4 text-muted" htmlFor="floatingInputCustom">
          {t("validation:fields.email")}
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger mt-1">
        {errors.email && errors.email.message && t(`${errors.email.message}`)}
      </p>
      <StyledFormFloating className="fs-4">
        <Form.Control
          className="mt-3 fs-4 py-5"
          {...register("dateOfBirth")}
          type="date"
          name="dateOfBirth"
        />
        <StyledLabel className="pt-4 text-muted" htmlFor="floatingInputCustom">
          {t("validation:fields.dateOfBirth")}
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger">
        {errors.dateOfBirth &&
          errors.dateOfBirth.message &&
          t(`${errors.dateOfBirth.message}`)}
      </p>
      <StyledFormFloating className="fs-4">
        <Form.Control
          className="mt-3 fs-4 py-5"
          {...register("password")}
          type="password"
          name="password"
          placeholder="Пароль"
          autoComplete="on"
        />
        <StyledLabel className="pt-4 text-muted" htmlFor="floatingInputCustom">
          {t("validation:fields.password")}
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger">
        {errors.password &&
          errors.password.message &&
          t(`${errors.password.message}`)}
      </p>
      <StyledFormFloating className="fs-4">
        <Form.Control
          className="mt-3 fs-4 py-5"
          {...register("confirmPassword")}
          type="password"
          name="confirmPassword"
          placeholder="Підтвердіть пароль"
          autoComplete="on"
        />
        <StyledLabel className="pt-4 text-muted" htmlFor="floatingInputCustom">
          {t("validation:fields.confirmPassword")}
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger">
        {errors.confirmPassword &&
          errors.confirmPassword.message &&
          t(`${errors.confirmPassword.message}`)}
      </p>
      <div className="d-grid gap-2">
        <Button
          className="mt-3 p-4 square rounded-pill"
          type="submit"
          variant="secondary"
          size="lg"
        >
          {t("validation:fields.register")}
        </Button>
      </div>
    </Form>
  );

  return (
    <ModalUniversal
      button={registrationButtonName}
      title={currentUserId ? `Welcome, ${currentUserName}` : registrationTitle}
      content={currentUserId ? null : registerForm}
    />
  );
};

export default Registration;

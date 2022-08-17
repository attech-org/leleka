import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import * as yup from "yup";

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
  username: yup.string().required("Як вас звати?"),
  email: yup
    .string()
    .email("Будь ласка, використовуйте формат електронної адреси")
    .required("Введіть адресу електронної пошти"),
  dateOfBirth: yup
    .date()
    .typeError("Вкажіть вашу дату народження")
    .required("Вкажіть вашу дату народження"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Пароль має складатися не менше ніж з 8 символів з яких як мінімум: один великий, один маленький, одна цифра, один спеціальний символ"
    )
    .required("Введіть ваш пароль"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароль має співпадати"),
});

const Registration = () => {
  const [show, setShow] = useState(false);

  const registrationButtonName = "Зарегистрироваться";
  const registrationTitle = "Створіть свій профіль";

  const toggleShowState = () => setShow(!show);

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
    console.log(data);
    toggleShowState();
    reset();
  };

  const watchUserName = watch("username");

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
          Ім'я
        </StyledLabel>
        <StyledLabel
          counter
          className="pt-4 text-end"
          htmlFor="floatingInputCustom"
        >
          {watchUserName ? watchUserName.length : 0} / 50
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger mt-1">{errors?.username?.message}</p>
      <StyledFormFloating className="fs-4">
        <Form.Control
          className="mt-3 fs-4 py-5"
          {...register("email")}
          type="text"
          name="email"
          placeholder="Ел. пошта"
        />
        <StyledLabel className="pt-4 text-muted" htmlFor="floatingInputCustom">
          Ел. пошта
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger mt-1">{errors?.email?.message}</p>
      <StyledFormFloating className="fs-4">
        <Form.Control
          className="mt-3 fs-4 py-5"
          {...register("dateOfBirth")}
          type="date"
          name="dateOfBirth"
        />
        <StyledLabel className="pt-4 text-muted" htmlFor="floatingInputCustom">
          Дата народження
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger">{errors?.dateOfBirth?.message}</p>
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
          Пароль
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger">{errors?.password?.message}</p>
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
          Підтвердіть пароль
        </StyledLabel>
      </StyledFormFloating>
      <p className="text-danger">{errors?.confirmPassword?.message}</p>
      <div className="d-grid gap-2">
        <Button
          className="mt-3 p-4 square rounded-pill"
          type="submit"
          variant="secondary"
          size="lg"
        >
          Зареєструватися
        </Button>
      </div>
    </Form>
  );

  return (
    <>
      <ModalUniversal
        buttonName={registrationButtonName}
        title={registrationTitle}
        content={registerForm}
      />
    </>
  );
};

export default Registration;

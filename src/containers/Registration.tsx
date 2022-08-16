import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import * as yup from "yup";

export const windowTitle = "Створіть свій профіль";

const StyledForm = styled(Form)`
  padding: 0 2rem;
`;

const StyledFormControl = styled(Form.Control)`
  margin-top: 1rem;
  padding: 2rem 0.75rem 2rem 1.7rem !important;
  height: 5.5rem !important;
  font-size: 1.5rem;

  ${(props) =>
    props.top &&
    css`
      margin-top: 0rem;
    `}
`;

const StyledFloatingLabel = styled(FloatingLabel)`
  font-size: 1.5rem;
  label {
    padding: 2rem 1.7rem;
  }
  .form-floating > .form-control:focus ~ label,
  .form-control:not(:placeholder-shown) ~ label,
  .form-control:focus ~ label {
    transform: scale(0.8) translateY(-1.5rem) translateX(0);
    opacity: 0.65 !important;
  }
`;

const StyledCounterLabel = styled.label`
  text-align: right;
  opacity: 0;
  padding-right: 0;
  margin-right: 0;
  min-width: 125%;
  transform-origin: 0 0;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
  border-radius: 9999px;
  padding: 1rem;
`;

interface MyForm {
  userName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  userName: yup.string().required("Як вас звати?"),
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

  const toggleShowState = () => setShow(!show);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<MyForm>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: MyForm) => {
    console.log(data);
    toggleShowState();
    reset();
  };

  const watchUserName = watch("userName");

  return (
    <>
      <StyledForm onSubmit={handleSubmit(submitForm)}>
        <StyledFloatingLabel controlId="userNameInput" label="Ім'я">
          <StyledFormControl
            top="true"
            {...register("userName")}
            type="text"
            name="userName"
            placeholder="Ім'я"
            maxLength={50}
          />
          <StyledCounterLabel>
            {watchUserName ? watchUserName.length : 0} / 50
          </StyledCounterLabel>
        </StyledFloatingLabel>
        <p className="text-danger">
          {errors.userName && errors?.userName?.message}
        </p>
        <StyledFloatingLabel controlId="emailInput" label="Ел. пошта">
          <StyledFormControl
            {...register("email")}
            type="text"
            name="email"
            placeholder="Ел. пошта"
          />
        </StyledFloatingLabel>
        <p className="text-danger">{errors.email && errors?.email?.message}</p>
        <StyledFloatingLabel
          controlId="dateOfBirthInput"
          label="Дата народження"
        >
          <StyledFormControl
            {...register("dateOfBirth")}
            type="date"
            name="dateOfBirth"
          />
        </StyledFloatingLabel>
        <p className="text-danger">
          {errors.dateOfBirth && errors?.dateOfBirth?.message}
        </p>
        <StyledFloatingLabel controlId="passwordInput" label="Пароль">
          <StyledFormControl
            {...register("password")}
            type="password"
            name="password"
            placeholder="Пароль"
            autoComplete="on"
          />
        </StyledFloatingLabel>
        <p className="text-danger">
          {errors.password && errors?.password?.message}
        </p>
        <StyledFloatingLabel
          controlId="confirmPasswordInput"
          label="Підтвердіть пароль"
        >
          <StyledFormControl
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            placeholder="Підтвердіть пароль"
            autoComplete="on"
          />
        </StyledFloatingLabel>
        <p className="text-danger">
          {errors.confirmPassword && errors?.confirmPassword?.message}
        </p>
        <div className="d-grid gap-2">
          <StyledButton type="submit" variant="secondary" size="lg">
            Зареєструватися
          </StyledButton>
        </div>
      </StyledForm>
    </>
  );
};

export default Registration;

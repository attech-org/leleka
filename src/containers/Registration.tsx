import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

const WrapperDiv = styled.div`
  > * {
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Helvetica, Arial, sans-serif;
  }
`;

const StyledModalTitle = styled(Modal.Title)`
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
`;

const StyledFormControl = styled(Form.Control)`
  margin-top: 1rem;
  padding: 2rem 0.75rem 2rem 1.7rem !important;
  height: 5.5rem !important;
  font-size: 1.5rem;
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
  min-width: 124%;
  transform-origin: 0 0;
`;

interface MyForm {
  userName: string;
  email: string;
  dateOfBirth: Date;
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    handleClose();
    reset();
  };

  return (
    <WrapperDiv>
      <Button variant="primary" onClick={handleShow}>
        Зареєструватися
      </Button>

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ margin: "0px" }}>
          {" "}
        </Modal.Header>
        <StyledModalTitle>Створіть свій профіль</StyledModalTitle>
        <Modal.Body>
          <Form
            style={{
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
            onSubmit={handleSubmit(submitForm)}
          >
            <StyledFloatingLabel controlId="floatingInput" label="Ім'я">
              <StyledFormControl
                {...register("userName")}
                type="text"
                name="userName"
                placeholder="Ім'я"
                maxLength={50}
              />
              <StyledCounterLabel>
                {watch("userName") ? watch("userName").length : 0} / 50
              </StyledCounterLabel>
            </StyledFloatingLabel>
            <p className="text-danger">
              {errors.userName && errors?.userName?.message}
            </p>
            <StyledFloatingLabel controlId="floatingInput" label="Ел. пошта">
              <StyledFormControl
                {...register("email")}
                type="text"
                name="email"
                placeholder="Ел. пошта"
              />
            </StyledFloatingLabel>
            <p className="text-danger">
              {errors.email && errors?.email?.message}
            </p>
            <StyledFloatingLabel
              controlId="floatingInput"
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
            <StyledFloatingLabel controlId="floatingInput" label="Пароль">
              <StyledFormControl
                {...register("password")}
                type="password"
                name="password"
                placeholder="Пароль"
              />
            </StyledFloatingLabel>
            <p className="text-danger">
              {errors.password && errors?.password?.message}
            </p>
            <StyledFloatingLabel
              controlId="floatingInput"
              label="Підтвердіть пароль"
            >
              <StyledFormControl
                {...register("confirmPassword")}
                type="password"
                name="confirmPassword"
                placeholder="Підтвердіть пароль"
              />
            </StyledFloatingLabel>
            <p className="text-danger">
              {errors.confirmPassword && errors?.confirmPassword?.message}
            </p>
            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                style={{
                  marginTop: "1rem",
                  borderRadius: "9999px",
                  padding: "1rem",
                }}
              >
                Зареєструватися
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </WrapperDiv>
  );
};

export default Registration;

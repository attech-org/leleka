import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Form,
  Button,
  // ToastContainer,
  // Toast,
} from "react-bootstrap";
import { Apple, Google } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";

import icon_1 from "../images/icon_1.png";
import { userActions } from "../redux/reducers/user";
import { AppDispatch, RootState } from "../redux/store";
import ModalUniversal from "./ModalUniversal";

interface MyForm {
  username: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loginError = useSelector<RootState, RootState["user"]["error"]>(
    (store) => store.user.error
  );

  const clearLoginError = () => {
    dispatch(userActions.clearError());
  };
  const { t } = useTranslation();
  const sampleSchema = yup.object().shape({
    username: yup.string().required(t("login.requiredName")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MyForm>({
    resolver: yupResolver(sampleSchema),
  });

  const currentUserId = useSelector<RootState>((store) => store.user._id);
  const currentUserName = useSelector<RootState>(
    (store) => store.user.username
  );

  const submitForm = (data: MyForm) => {
    dispatch(userActions.clearError());
    dispatch(userActions.loginUser(data));
    reset();
  };

  const logo = (
    <header className="d-flex justify-content-center align-items-center w-100">
      <img src={icon_1} width="50px" alt="Logo" />
    </header>
  );

  const LoginFormContainer = (
    <Container className="rounded-4 w-50 p-2">
      {/* <ToastContainer position="top-center">
        {loginError ? (
          <Toast bg="danger" onClose={toggleShowMessage}>
            <Toast.Header>
              <strong className="me-auto" />
            </Toast.Header>
            <Toast.Body>{`${loginError}`}</Toast.Body>
          </Toast>
        ) : null}
      </ToastContainer> */}

      <section className="mt-4 m-auto d-grid gap-4">
        <h1 className="text-center text-nowrap fs-2 fw-bold">
          {t("login.loginTitle")}
        </h1>

        <Form onSubmit={handleSubmit(submitForm)} className="d-grid gap-2">
          <Button
            variant="light"
            className="d-flex justify-content-center align-items-center fw-500 w-100 d-block mb-3 rounded-5 py-2 border border-gray-400"
          >
            <Google className="me-2" />
            <a className="text-decoration-none text-black" href="#">
              {t("login.signGoogle")}
            </a>
          </Button>

          <Button
            variant="light"
            className=" d-flex justify-content-center align-items-center  fw-500 w-100 d-block mb-3 rounded-5 py-2 border  border-gray-400"
          >
            <Apple className="me-2" />
            <a className="text-decoration-none text-black" href="#">
              {t("login.signApple")}
            </a>
          </Button>

          <div className="d-flex justify-content-between align-items-center">
            <div className="bg-secondary border-bottom border-secondary w-50" />
            <div className="fs-6 text-secondary mx-2">{t("login.or")}</div>
            <div className="bg-secondary border-bottom border-secondary w-50" />
          </div>

          <div className="form-floating mt-3">
            <input
              {...register("username")}
              type="text"
              name="username"
              className="form-control"
              id="floatingInputLoginUsername"
              placeholder="Name"
            />
            <label>{t("login.usernameTitle")}</label>
          </div>
          {errors.username && (
            <div className="text-danger fst-italic fs-6">
              {errors?.username?.message}
            </div>
          )}

          <div className="form-floating mt-3">
            <input
              {...register("password")}
              type="password"
              name="password"
              className="form-control"
              id="floatingInputLoginPassword"
              placeholder="Password"
            />
            <label>{t("login.passwordTitle")}</label>
          </div>
          {(loginError || errors?.password?.message) && (
            <div className="text-danger fst-italic fs-6">
              {`${loginError || errors?.password?.message}`}
            </div>
          )}

          <Button
            className="btn btn-dark fw-700 w-100 d-block my-3 rounded-5 py-2 border border-0"
            type="submit"
            onClick={clearLoginError}
          >
            {t("login.nextButton")}
          </Button>

          <Button
            variant="light"
            className="fw-700 w-100 d-block mb-4 rounded-5 py-2 border border-gray-400"
          >
            {t("login.forgotPassword")}
          </Button>
          <div>
            <span className="text-secondary">{t("login.noAccount")}</span>
            <Link className="ms-1 text-decoration-none" to="/SignUpModal">
              {t("login.signUp")}
            </Link>
          </div>
        </Form>
      </section>
    </Container>
  );

  return (
    <ModalUniversal
      button={t("login.loginButton")}
      header={logo}
      title={currentUserId ? `Welcome, ${currentUserName}` : ""}
      content={currentUserId ? null : LoginFormContainer}
      toggleClose={clearLoginError}
    />
  );
};

export default LoginForm;

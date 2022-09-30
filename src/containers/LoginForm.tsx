import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import icon_1 from "../images/icon_1.png";
import { userActions } from "../redux/reducers/user";
import { AppDispatch, RootState } from "../redux/store";
import { LinkWithLanguageQueryParam } from "./LinkWithLanguageQueryParam";
import ModalUniversal from "./ModalUniversal";

interface MyForm {
  username: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loginError = useSelector<
    RootState,
    RootState["user"]["authUser"]["error"]
  >((store) => store.user.authUser.error);

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

  const currentUserId = useSelector<
    RootState,
    RootState["user"]["authUser"]["_id"]
  >((store) => store.user.authUser._id);
  const currentUserName = useSelector<
    RootState,
    RootState["user"]["authUser"]["username"]
  >((store) => store.user.authUser.username);

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

  const loginButton = (
    <div className="d-grid w-100">
      <div className="rounded-5 p-3 fw-semibold text-center bg-light border text-primary">
        {t("login.loginButton")}
      </div>
    </div>
  );

  const LoginFormContainer = (
    <Container className="rounded-4 w-50 p-2">
      <section className="m-auto d-grid gap-4">
        <h1 className="text-center text-nowrap fs-2 fw-bold">
          {t("login.loginTitle")}
        </h1>

        <Form onSubmit={handleSubmit(submitForm)} className="d-grid gap-2">
          <div className="form-floating mt-3">
            <input
              {...register("username")}
              type="text"
              name="username"
              className="form-control"
              id="floatingInputLoginUsername"
              placeholder={t("login.usernameTitle")}
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
              placeholder={t("login.passwordTitle")}
            />
            <label>{t("login.passwordTitle")}</label>
          </div>
          {loginError && (
            <div className="text-danger fst-italic fs-6">
              {t("validation:errors.loginError")}
            </div>
          )}
          {errors?.password?.message && (
            <div className="text-danger fst-italic fs-6">
              {errors?.password?.message}
            </div>
          )}

          <Button
            className="btn btn-dark fw-700 w-100 d-block my-3 rounded-5 py-2 border border-0"
            type="submit"
            onClick={clearLoginError}
          >
            {t("login.nextButton")}
          </Button>

          <div>
            <span className="text-secondary">{t("login.noAccount")}</span>
            <LinkWithLanguageQueryParam
              className="ms-1 text-decoration-none"
              to="/authorization"
            >
              {t("login.signUp")}
            </LinkWithLanguageQueryParam>
          </div>
        </Form>
      </section>
    </Container>
  );

  return (
    <ModalUniversal
      button={loginButton}
      header={logo}
      title={currentUserId ? `Welcome, ${currentUserName}` : ""}
      content={currentUserId ? null : LoginFormContainer}
      toggleClose={clearLoginError}
    />
  );
};

export default LoginForm;

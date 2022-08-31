import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { Apple, Google, Twitter, XLg } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";

import ModalUniversal from "./ModalUniversal";

interface MyForm {
  username: string;
}

const sampleSchema = yup.object().shape({
  username: yup.string().required("Name is required!"),
});

const StyledContainer = styled(Container)`
  height: 650px;
  width: 600px;
`;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MyForm>({
    resolver: yupResolver(sampleSchema),
  });

  const submitForm = (data: MyForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
    reset();
  };

  const LoginFormContainer = (
    <StyledContainer className="rounded-4 p-2">
      <header className="d-flex justify-content-between align-items-center">
        <OverlayTrigger
          key={"bottom"}
          placement={"bottom"}
          overlay={<Tooltip id={`tooltip-bottom}`}>Close</Tooltip>}
        >
          <Button
            variant="light"
            className="d-block p-2 d-flex justify-content-center align-items-center rounded-5"
          >
            <XLg />
          </Button>
        </OverlayTrigger>

        <Twitter color="blue" size={25} />
        <div className="p-3" />
      </header>

      <section className="w-50 mt-4 m-auto d-grid gap-4">
        <h1 className="text-nowrap fs-1 fw-700 ">Sign in to Twitter</h1>

        <Form onSubmit={handleSubmit(submitForm)} className="d-grid gap-2 ">
          <Button
            variant="light"
            className="d-flex justify-content-center align-items-center fw-500 w-100 d-block mb-3 rounded-5 py-2 border border-gray-400"
          >
            <Google className="me-2" />
            <a className="text-decoration-none text-black" href="#">
              Continue with Google
            </a>
          </Button>

          <Button
            variant="light"
            className=" d-flex justify-content-center align-items-center  fw-500 w-100 d-block mb-3 rounded-5 py-2 border  border-gray-400"
          >
            <Apple className="me-2" />
            <a className="text-decoration-none text-black" href="#">
              Continue with Apple
            </a>
          </Button>

          <div className="d-flex justify-content-between align-items-center">
            <div className="bg-secondary border-bottom border-secondary w-50" />
            <div className="fs-5 text-secondary mx-2">or</div>
            <div className="bg-secondary border-bottom border-secondary w-50" />
          </div>

          <div className="form-floating mb-3">
            <input
              {...register("username")}
              type="text"
              name="username"
              className="form-control"
              id="floatingInput"
              placeholder="Name"
            />
            <label>Phone, email, or username</label>
          </div>
          {errors.username && (
            <div className="position-absolute start-0 end-0 bottom-0 text-center mb-5 text-white">
              <span className="bg-primary rounded-1 px-4 p-3">
                {errors?.username?.message}
              </span>
            </div>
          )}

          <Button
            className="btn btn-dark fw-700 w-100 d-block mb-3 rounded-5 py-2 border border-0"
            type="submit"
          >
            Next
          </Button>

          <Button
            variant="light"
            className="fw-700 w-100 d-block mb-4 rounded-5 py-2 border border-gray-400"
          >
            Forgot password?
          </Button>
          <div>
            <span className="text-secondary">Don't have an account?</span>
            <Link className="ms-1 text-decoration-none" to="/SignUpModal">
              Sign up
            </Link>
          </div>
        </Form>
      </section>
    </StyledContainer>
  );

  return (
    <>
      <ModalUniversal
        button={"Login"}
        title={"Login"}
        content={LoginFormContainer}
      />
    </>
  );
};

export default LoginForm;

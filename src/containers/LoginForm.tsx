import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";

interface MyForm {
  userName: string;
}

const sampleSchema = yup.object().shape({
  userName: yup.string().required("Name is required!"),
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
    console.log(data);
    reset();
  };

  return (
    <StyledContainer className=" rounded-4 p-2">
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
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              width="20px"
              height="20px"
            >
              <g>
                <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z" />
              </g>
            </svg>
          </Button>
        </OverlayTrigger>

        <svg
          viewBox="0 0 24 24"
          width="32px"
          height="32px"
          fill="rgb(29, 155, 240)"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
          </g>
        </svg>
        <div className="p-3" />
      </header>

      <section className="w-50 mt-4 m-auto d-grid gap-4">
        <h1 className="fs-1 fw-700 ">Sign in to Twitter</h1>

        <Form onSubmit={handleSubmit(submitForm)} className="d-grid gap-2 ">
          <Button
            variant="light"
            className="d-flex justify-content-center align-items-center fw-500 w-100 d-block mb-3 rounded-5 py-2 border border-gray-400"
          >
            <svg
              className="me-2"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="18px"
              height="18px"
            >
              <g>
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>
            <a className="text-decoration-none text-black" href="#">
              Continue with Google
            </a>
          </Button>

          <Button
            variant="light"
            className=" d-flex justify-content-center align-items-center  fw-500 w-100 d-block mb-3 rounded-5 py-2 border  border-gray-400"
          >
            <svg
              className="me-2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              width="18px"
              height="18px"
            >
              <g>
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
              </g>
            </svg>
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
              {...register("userName")}
              type="text"
              name="userName"
              className="form-control"
              id="floatingInput"
              placeholder="Name"
            />
            <label>Phone, email, or username</label>
          </div>
          {errors.userName && (
            <div className="position-absolute start-0 end-0 bottom-0 text-center mb-5 text-white">
              <span className="bg-primary rounded-1 px-4 p-3">
                {errors?.userName?.message}
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
};

export default LoginForm;

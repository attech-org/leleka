import { Button } from "react-bootstrap";
import { ArrowLeft, Gear } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled(Button)`
  height: 2.5rem;
  width: 2.5rem;
  :focus:not(:focus-visible) {
    box-shadow: none;
  }
  :hover {
    background-color: rgba(15, 20, 25, 0.1) !important;
  }
`;
export const SinglePageHeader = ({ pageName }: { pageName: string }) => {
  const navigate = useNavigate();
  //TODO: add universal modal window after it support all buttons
  return (
    <>
      <div className="border-start border-end">
        <div className="d-flex  p-2 align-items-center ">
          <div className="p-2">
            <StyledButton
              variant="link"
              className="text-dark m-0 p-0 rounded-circle"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowLeft
                size="26"
                className="m-0 p-0 align-items-center justify-content-center"
              />
            </StyledButton>
          </div>
          <h1 className="fs-5 fw-bold ps-3 p-2">{pageName}</h1>
          <div className="p-2 ms-auto">
            <StyledButton
              variant="link"
              className="text-dark m-0 p-0 rounded-circle"
            >
              <Gear
                size="26"
                className="m-0 p-0 align-items-center justify-content-center"
              />
            </StyledButton>
          </div>
        </div>
      </div>
    </>
  );
};

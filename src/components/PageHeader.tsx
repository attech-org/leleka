import { useState } from "react";
import {
  Button,
  Modal,
  FormCheck,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { ArrowLeft, Gear, ChevronRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Search from "../containers/Search";
import { countries } from "../types/constants";

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

const Div = styled.div`
  &:hover {
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
`;
const ScrollableList = styled(ListGroup)`
  max-height: 300px;
  margin-bottom: 10px;
  overflow: scroll;
  -webkit-overflow-scrolling: auto;
`;
const VerticallyCenteredModal = (props: {
  show: boolean;
  onHide: () => void;
}) => {
  const [isNavDivVisible, setIsNavLinkVisible] = useState<boolean>(false);
  const [personalizationChecked, setIspersonalizationCheckked] =
    useState<boolean>(false);

  const [locationSettingsSelected, setLocationSettingsSelected] =
    useState<boolean>(false);

  // const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <Modal size="lg" centered show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton={!locationSettingsSelected}>
        {locationSettingsSelected && (
          <>
            <StyledButton
              variant="link"
              className="text-dark m-0 p-0 rounded-circle"
              onClick={() => {
                setLocationSettingsSelected(false);
              }}
            >
              <ArrowLeft
                size="26"
                className="m-0 p-0 align-items-center justify-content-center"
              />
            </StyledButton>
            <h1 className="fw-bold fs-4 me-auto">Locations</h1>
          </>
        )}
      </Modal.Header>
      <Modal.Body>
        <>
          {!locationSettingsSelected ? (
            <div>
              <h2 className="fw-bold fs-4 mb-5">Location</h2>
              <Div
                className="d-flex"
                onClick={() => {
                  setIsNavLinkVisible(!isNavDivVisible);
                }}
              >
                <p>Show content in this location</p>
                <div className="ms-auto">
                  <FormCheck checked={isNavDivVisible} />
                </div>
              </Div>
              <p>
                When this is on, you’ll see what’s happening around you right
                now.
              </p>
              {isNavDivVisible && (
                <Div
                  className="d-flex mt-5"
                  onClick={() => {
                    setLocationSettingsSelected(true);
                  }}
                >
                  <div>Explore locations</div>
                  <div className="ms-auto">
                    <ChevronRight
                      size="13"
                      className="m-0 p-0 align-items-center justify-content-center"
                    />
                  </div>
                </Div>
              )}
              <hr />
              <h2 className="fw-bold fs-4 mb-5">Personalization</h2>

              <Div
                className="d-flex"
                onClick={() => {
                  setIspersonalizationCheckked(!personalizationChecked);
                }}
              >
                <p>Show content in this location</p>
                <div className="ms-auto">
                  <FormCheck checked={personalizationChecked} />
                </div>
              </Div>
              <p>
                You can personalize trends based on your location and who you
                follow.
              </p>
            </div>
          ) : (
            <>
              <Search placeholder="Search locations" />
              <ScrollableList>
                {countries.map((country) => {
                  return (
                    <ListGroupItem key={country.code}>
                      <p>{country.name}</p>
                    </ListGroupItem>
                  );
                })}
              </ScrollableList>
            </>
          )}
        </>
      </Modal.Body>
    </Modal>
  );
};
export const SinglePageHeader = ({ pageName }: { pageName: string }) => {
  const navigate = useNavigate();
  //TODO: add universal modal window after it support all buttons
  const [modalDialogueShow, setModalWarningShow] = useState<boolean>(false);

  return (
    <>
      <VerticallyCenteredModal
        show={modalDialogueShow}
        onHide={() => setModalWarningShow(false)}
      />
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
              onClick={() => {
                setModalWarningShow(true);
              }}
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

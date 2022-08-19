import { Search as SearchIcon } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";

const StyledForm = styled(Form)`
  border: 2px solid white;
  :focus-within {
    color: rgb(29, 155, 240);
    border-color: rgb(29, 155, 240);
  }
`;

const StyledInputGroup = styled(InputGroup)`
  input:focus {
    box-shadow: none;
  }
`;

const Search = () => {
  return (
    <StyledForm className="justify-content-center align-items-center mx-2 rounded-pill bg-light px-3 py-1">
      <StyledInputGroup
        className="justify-content-center align-items-center bg-light"
        id="basic-addon1"
      >
        <SearchIcon size={20} className="ms-1" />
        <Form.Control
          className="border-0 bg-light px-3"
          size="lg"
          type="text"
          placeholder="Пошук у твіттері"
        />
      </StyledInputGroup>
    </StyledForm>
  );
};

export default Search;

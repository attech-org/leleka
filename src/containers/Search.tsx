import { Form, InputGroup } from "react-bootstrap";
import { Search as SearchIcon } from "react-bootstrap-icons";
import styled from "styled-components";

const StyledForm = styled(Form)`
  border: 2px solid transparent;
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

const Search = ({ placeholder }: { placeholder: string }) => {
  return (
    <StyledForm className="justify-content-center align-items-center mx-1 my-2 rounded-pill bg-light px-3 py-1">
      <StyledInputGroup
        className="justify-content-center align-items-center bg-light"
        id="basic-addon1"
      >
        <SearchIcon size={18} className="ms-1" />
        <Form.Control
          className="border-0 bg-light px-3 fs-6"
          size="sm"
          type="text"
          placeholder={placeholder}
        />
      </StyledInputGroup>
    </StyledForm>
  );
};

export default Search;

import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const PasswordInput = (props) => {
  const [type, setType] = useState("password");

  const handleType = () => {
    const newType = type === "password" ? "text" : "password";
    setType(newType);
  };

  return (
    <InputGroup>
      <Form.Control
       type={type}
       placeholder="Placeholder text"
       aria-label="Enter password"
       aria-describedby="basic-addon1"
       {...props}
       />
       <InputGroup.Text
       id="basic-addon1"
       onClick={handleType}
       style={{ cursor: "pointer" }}
       >
        {type === "password" ? <BsEyeSlashFill/> : <BsEyeFill/>}
       </InputGroup.Text>

       <Form.Control.Feedback type="invalid">
            {props.error}
       </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;

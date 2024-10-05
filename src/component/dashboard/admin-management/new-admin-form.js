import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { swalAlert } from "../../../helpers/functions/swal";
import * as Yup from "yup";
import {
  setListRefreshToken,
  setOperation,
} from "../../../store/slices/misc-slice";
import { createAdmin } from "../../../api/admin-service";
import { isInValid, isValid } from "../../../helpers/functions/forms";
import { useFormik } from "formik";
import ReactInputMask from "react-input-mask-next";
import ButtonLoader from "../../common/button-loader";

const NewAdminForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    birthDay: "",
    birthPlace: "",
    gender: "",
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    ssn: "",
    surname: "",
    username: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("required"),
    username: Yup.string().required("required"),
    surname: Yup.string().required("required"),
    password: Yup.string()
      .required("required")
      .min(8, "At least 8 characters")
      .matches(/[a-z]+/g, "Onelowercase char")
      .matches(/[A-Z]+/g, "One uppercase char")
      .matches(/[\d+]+/g, "One number char"),
    confirmPassword: Yup.string()
      .required("required")
      .oneOf([Yup.ref("password")], "Password must match"),
    gender: Yup.string()
      .required("required")
      .oneOf(["FEMALE", "MALE"], "Invalid gender"),
    birthDay: Yup.date().required("required"),
    birthPlace: Yup.string().required("required"),
    phoneNumber: Yup.string()
      .required("required")
      .matches(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format"),
    ssn: Yup.string()
      .required("required")
      .matches(/^\d{3}-\d{2}-\d{4}$/, "Invalid ssn number format"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await createAdmin(values);
      formik.resetForm();
      dispatch(setListRefreshToken(Math.random()))
      dispatch(setOperation(null));
      swalAlert("Admin created successfully", "success");
    } catch (err) {
      console.log(err);
      const errMsg = Object.values(err.response.data.validations)[0];
      swalAlert(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    dispatch(setOperation(null));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New Admin</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <Col>
                <FloatingLabel
                  controlId="firstName"
                  label="First name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("name")}
                    isValid={isValid(formik, "name")}
                    isInvalid={isInValid(formik, "name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.name && formik.errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="lastName"
                  label="Last name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("surname")}
                    isValid={isValid(formik, "surname")}
                    isInvalid={isInValid(formik, "surname")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.surname && formik.errors.surname}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Gender">
                  <Form.Select
                    aria-label="Select gender"
                    {...formik.getFieldProps("gender")}
                    isValid={isValid(formik, "gender")}
                    isInvalid={isInValid(formik, "gender")}
                  >
                    <option>Select gender</option>
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.gender && formik.errors.gender}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="birthdate"
                  label="Birthdate"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("birthDay")}
                    isValid={isValid(formik, "birthDay")}
                    isInvalid={isInValid(formik, "birthDay")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.birthDay && formik.errors.birthDay}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="placeofbirth"
                  label="Placeofbirth"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("birthPlace")}
                    isValid={isValid(formik, "birthPlace")}
                    isInvalid={isInValid(formik, "birthPlace")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.birthPlace && formik.errors.birthPlace}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                  <Form.Control
                  as={ReactInputMask}
                  mask="999-999-9999"
                  type="text"
                  placeholder=""
                  {...formik.getFieldProps("phoneNumber")}
                  isValid={isValid(formik, "phoneNumber")}
                  isInvalid={isInValid(formik, "phoneNumber")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="ssn" label="SSN" className="mb-3">
                  <Form.Control
                    as={ReactInputMask}
                    mask="999-99-9999"
                    type="text"
                    placeholder="XXX-XX-XXXX"
                    {...formik.getFieldProps("ssn")}
                    isValid={isValid(formik, "ssn")}
                    isInvalid={isInValid(formik, "ssn")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.ssn && formik.errors.ssn}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="username"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("username")}
                    isValid={isValid(formik, "username")}
                    isInvalid={isInValid(formik, "username")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.username && formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("password")}
                    isValid={isValid(formik, "password")}
                    isInvalid={isInValid(formik, "password")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.password && formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Confirm Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("confirmPassword")}
                    isValid={isValid(formik, "confirmPassword")}
                    isInvalid={isInValid(formik, "confirmPassword")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
              <Button type="button" onClick={handleCancel}>
                  Cancel
              </Button>
              <Button                  
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                  className="ms-3"
                >
                  {loading && <ButtonLoader />}Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewAdminForm;

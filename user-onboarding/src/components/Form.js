import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
import * as yup from "yup";

const NewForm = ({ submitUser }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Must be a valid email address").required(),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    terms: yup
      .boolean()
      .oneOf([true], "You must agree to the terms of service"),
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        console.log("error!", err);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log("valid?", valid);
      setIsButtonDisabled(!valid);
    });
  }, [formState]);

  const handleChange = (e) => {
    e.persist();
    validateChange(e);
    if (e.target.name === "terms") {
      setFormState({ ...formState, terms: e.target.checked });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitUser(formState);
    setFormState({
      name: "",
      email: "",
      password: "",
      terms: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ marginBottom: "5%" }}>New User</h1>
      <FormGroup>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </FormGroup>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" onChange={handleChange} name="terms" /> I Agree
          To The Terms Of Service
        </Label>
      </FormGroup>
      <Button
        color="primary"
        style={{ marginTop: "3%" }}
        type="submit"
        disabled={isButtonDisabled}
      >
        Submit
      </Button>
    </Form>
  );
};

export default NewForm;
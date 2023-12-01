import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../components/General/FormContainer";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";
import { forgotPassword } from "../../actions/UserActions";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { passwordUpdateResult, loading, error } = userForgotPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    if (new_password !== confirm_password) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        forgotPassword(
          {
            email,
            new_password,
            confirm_password,
          },
          navigate
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Forgot Password</h1>

      {message && <Message error={true}>{message}</Message>}
      {loading && <Loader>Updating Password...</Loader>}
      {passwordUpdateResult && (
        <Message success={true}>{"Updated Successfully"}</Message>
      )}
      {error && error.details && (
        <Message error={true}>{error.details}</Message>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter New Password"
            value={new_password}
            onChange={(e) => setNew_password(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter New Password Again"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Change Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;

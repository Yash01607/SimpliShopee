import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { login } from "../../actions/UserActions";

import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../components/General/FormContainer";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);

  const { userData, loading, error } = userLogin;

  const redirectURL = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userData) {
      navigate(redirectURL);
    }
  }, [navigate, userData, redirectURL]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {error?.error && (
        <Message key={1} error={true}>
          {error?.error}
        </Message>
      )}
      {loading && <Loader>Logging In...</Loader>}

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

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Button type="submit" variant="primary" className="mt-3">
              Sign In
            </Button>
          </Col>
          <Col className="pt-4 d-flex flex-row-reverse">
            <Link to={"/forgotpassword"}>Forgot Password?</Link>
          </Col>
        </Row>
      </Form>
      <Row className="py-3">
        <Col>
          Don't Have An Account ?{" "}
          <Link
            to={redirectURL ? `/signup?redirect=${redirectURL}` : "/signup"}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default AuthScreen;

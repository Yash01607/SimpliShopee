import React from "react";

import { Row, Col, Container } from "react-bootstrap";

function FormContainer({ children }) {
  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { filterURL } from "../../utils/filterURL";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#343a40",
        color: "#ffffff",
        padding: "40px 0",
      }}
    >
      <Container>
        <Row>
          <Col>
            <h4>Contact Us</h4>
            <p>Email: info@simplishopee.com</p>
            <p>Phone: +91 99999 99999</p>
            <p>Address: 123 Main St, Hyderabad, Telangana, India</p>
          </Col>
          <Col>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href={filterURL({})}>Shop</a>
              </li>
              <li>
                <a href="/cart">Cart</a>
              </li>
              <li>
                <a href="/profile">Profile</a>
              </li>
            </ul>
          </Col>
          <Col md={3} lg={3}>
            <h4>Follow Us</h4>
            <Row>
              <Col>
                <a className="text-light" href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-lg"></i>
                </a>
              </Col>
              <Col>
                <a className="text-light" href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-twitter fa-lg"></i>
                </a>
              </Col>
              <Col>
                <a
                  className="text-light"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
              </Col>
              <Col>
                <a className="text-light" href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-lg"></i>
                </a>
              </Col>
              <Col>
                <a className="text-light" href="https://www.discord.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fa-brands fa-discord" ></i>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className="mt-5">
            <p className="text-center">
              &copy; 2023 SimpliShopee. All rights reserved.
            </p>
          </div>
        </Row>
      </Container >
    </footer >
  );
};

export default Footer;

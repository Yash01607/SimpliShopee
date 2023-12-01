import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar, Nav, Container, NavDropdown, Row, Col } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../actions/UserActions";
import { useNavigate } from "react-router-dom";
import { getCategoryList } from "../../actions/CategoryActions";
import { filterURL } from "../../utils/filterURL";
import SearchBox from "./SearchBox";

import Message from "./Message";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  const categoryList = useSelector((state) => state.categoryList);
  const { categoryListData, error } = categoryList;

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <header>
      {error?.details && <Message error={true}>{error?.details}</Message>}
      <Navbar bg="light" variant="light" expand="sm" collapseOnSelect>
        <Container className="mt-3">
          <Row className="w-100">
            <Col className="py-auto">
              <SearchBox />
            </Col>
            <Col>
              <LinkContainer className="mx-auto text-center" to="/">
                <Nav.Link className="navbar-brand mx-auto">
                  <strong>
                    <h2>SimpliShopee</h2>
                  </strong>
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col>
              <Navbar.Toggle aria-controls="navbarScroll" />

              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="ms-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px", zIndex: 999999999 }}
                  navbarScroll
                >
                  {userData ? (
                    <>
                      <LinkContainer to="/cart">
                        <Nav.Link>
                          <i className="fa-solid fa-cart-shopping"></i> Cart
                        </Nav.Link>
                      </LinkContainer>
                      <NavDropdown title={userData.name} id="username">
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>

                        {userData?.isAdmin && (
                          <>
                            <LinkContainer to="/category">
                              <NavDropdown.Item>
                                Manage Categories
                              </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/products">
                              <NavDropdown.Item>
                                Manage Products
                              </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/allOrders">
                              <NavDropdown.Item>Manage Orders</NavDropdown.Item>
                            </LinkContainer>
                          </>
                        )}
                        <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <LinkContainer to="/login">
                        <Nav.Link>
                          <i className="fas fa-user"></i> Login
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to="/signup">
                        <Nav.Link>
                          <i className="fas fa-user"></i> Register
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Navbar sticky="top" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Nav
            className="me-auto w-100 text-center"
            style={{ width: "300px", overflow: "auto" }}
          >
            {categoryListData?.map((category) => (
              <Nav.Link
                key={category?.id}
                onClick={() =>
                  navigate(filterURL({ category_name: category?.name }))
                }
                className="mx-2"
              >
                {category?.name}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

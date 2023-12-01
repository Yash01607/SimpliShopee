import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCartAction } from "../../actions/CartActions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";
import CartRow from "../../components/Cart/CartRow";
import FormattedPrice from "../../components/General/FormattedPrice";
import { createOrderAction } from "../../actions/OrderActions";
import { getAddressListAction } from "../../actions/UserActions";

import { filterURL } from "../../utils/filterURL";

const CartScreen = () => {
  const [addressID, setAddressID] = useState(-1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCart = useSelector((state) => state.getCart);
  const { cartData, loading: loadingCart, error: errorCart } = getCart;

  const createOrder = useSelector((state) => state.createOrder);
  const {
    createOrderStatus,
    loading: loadingCreateOrderStatus,
    error: errorCreateOrderStatus,
  } = createOrder;

  const getUserAddressList = useSelector((state) => state.getUserAddressList);
  const {
    addressList,
    loading: loadingAddressList,
    error: errorAddressList,
  } = getUserAddressList;

  useEffect(() => {
    dispatch(getCartAction());
    dispatch(getAddressListAction());
  }, [dispatch, navigate]);

  const placeOrderHandler = () => {
    if (addressID === -1) {
      alert("Please select an address before proceeding!");
    } else {
      dispatch(createOrderAction(addressID, navigate));
    }
  };

  return (
    <Container>
      {(loadingCart || loadingCreateOrderStatus || loadingAddressList) && (
        <Loader />
      )}
      {errorCart && <Message error={true}>{errorCart?.details}</Message>}
      {errorCreateOrderStatus && (
        <Message error={true}>{errorCreateOrderStatus?.details}</Message>
      )}
      {errorAddressList && (
        <Message error={true}>{errorAddressList?.details}</Message>
      )}
      {createOrderStatus && (
        <Message success={true}>Order Placed Successfully!!!</Message>
      )}
      <Row className="mt-3">
        <Col xs={12} sm={12} md={8} className="border-end">
          <Row className="align-items-end">
            <Col md={8} className="fs-1">
              <strong>Shopping Cart</strong>
            </Col>
            <Col className="text-sm-start text-md-end ">
              <span>
                {cartData?.cartItems?.length > 1
                  ? `${cartData?.cartItems?.length} Items`
                  : cartData?.cartItems?.length === 1
                  ? "1 Item"
                  : "No Item added to Cart."}
              </span>
            </Col>
          </Row>
          <hr></hr>
          {cartData?.cartItems?.map((cartItem, index) => (
            <>
              <Row key={cartItem?.product?.id} className="my-3 ">
                <CartRow cartItem={cartItem}></CartRow>
              </Row>
              <hr></hr>
            </>
          ))}
          <span>
            Add Items.{" "}
            <span
              className="text-primary"
              onClick={() => {
                navigate(filterURL({}));
              }}
              style={{ cursor: "pointer" }}
            >
              Shop Now...
            </span>
          </span>
        </Col>
        <Col>
          <strong className="fs-3">Select Address</strong>
          <hr></hr>
          <Form>
            {addressList?.length === 0 && (
              <Message error={true}>
                No address added. Please add an address from the profile section
                OR <a href="/address/add">click here</a> to add address.
              </Message>
            )}
            {addressList?.map((address, index) => (
              <Row key={index}>
                <Col role="button">
                  <Form.Check
                    className="my-2"
                    type="radio"
                    key={address.id}
                    id={`address-${address.id}`}
                    label={`${address.street}, ${address.city}, ${address.state} - ${address.pincode}`}
                    value={address.id}
                    checked={Number(addressID) === Number(address.id)}
                    onChange={(e) => setAddressID(e.target.value)}
                  />
                </Col>
              </Row>
            ))}
          </Form>
          <hr></hr>
          <strong className="fs-3">Summary</strong>
          <hr></hr>
          {cartData?.cartItems?.length > 0 && (
            <Row className="d-flex justify-content-between">
              <Col className="fs-5">
                <strong>No of Items:</strong>
              </Col>
              <Col className="fs-5 d-flex text-muted flex-row-reverse">
                {cartData?.cartItems?.length > 1
                  ? `${cartData?.cartItems?.length} Items`
                  : cartData?.cartItems?.length === 1
                  ? "1 Item"
                  : "No Item added to Cart."}
              </Col>
            </Row>
          )}
          <Row className="d-flex justify-content-between mt-2">
            <Col className="fs-5">
              <strong>Total Price:</strong>
            </Col>
            <Col className="fs-5 text-muted d-flex flex-row-reverse">
              <div className="d-flex justify-content-start align-items-center">
                <FormattedPrice price={cartData?.total_price}></FormattedPrice>
              </div>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              <Button
                type="button"
                className="btn btn-success w-100"
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;

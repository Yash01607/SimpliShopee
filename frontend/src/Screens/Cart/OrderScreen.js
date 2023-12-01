import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

import {
  getOrderByIdAction,
  updateOrderStatusAction,
} from "../../actions/OrderActions";
import OrderRow from "../../components/Order/OrderRow";
import FormattedPrice from "../../components/General/FormattedPrice";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";

const OrderScreen = () => {
  const { id } = useParams();

  const [orderStatus, setOrderStatus] = useState("");

  const dispatch = useDispatch();

  const getOrderById = useSelector((state) => state.getOrderById);
  const {
    orderDetails,
    loading: loadingOrderDetails,
    error: errorLoadingOrderDetails,
  } = getOrderById;

  const updateOrderStatus = useSelector((state) => state.updateOrderStatus);
  const {
    updateStatus,
    loading: loadingUpdateStatus,
    error: errorUpdateStatus,
  } = updateOrderStatus;

  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    if (!orderDetails?.id || Number(orderDetails.id) !== Number(id)) {
      dispatch(getOrderByIdAction(id));
    } else {
      setOrderStatus(orderDetails?.order_status);
    }
  }, [dispatch, id, orderDetails]);

  const orderStatusHandler = () => {
    dispatch(updateOrderStatusAction(id, orderStatus));
  };

  return (
    <Container>
      {(loadingUpdateStatus || loadingOrderDetails) && <Loader />}
      {errorLoadingOrderDetails && (
        <Message error={true}>{errorLoadingOrderDetails?.details}</Message>
      )}
      {errorUpdateStatus && (
        <Message error={true}>{errorUpdateStatus?.details}</Message>
      )}
      {updateStatus && (
        <Message success={true}>Order Status Updated Successfully.</Message>
      )}
      <Row className="mt-3">
        <h2>
          <strong>
            Thank You For Your Order, {orderDetails?.user?.name}!!!{" "}
          </strong>
        </h2>
        <hr className="mt-3"></hr>
        <Col sm={12} md={8} className="border-end px-3">
          <Row className="d-flex justify-content-between">
            <span>
              {" "}
              <strong>Delivery Address: </strong>
              {orderDetails?.shipping_address}
            </span>
          </Row>
          <hr></hr>
          <Row className="d-flex justify-content-between">
            <span>
              {" "}
              <strong>Order Status: </strong>
              {orderDetails?.order_status}
            </span>
          </Row>
          <hr></hr>
          {orderDetails?.orderItems?.map((orderItem) => (
            <>
              <Row key={orderItem?.product?.id} className="my-3 ">
                <OrderRow orderItem={orderItem} />
              </Row>
              <hr className="mt-3"></hr>
            </>
          ))}
        </Col>
        <Col>
          <strong className="fs-3">Summary</strong>
          <hr></hr>
          <Row className="d-flex justify-content-between">
            <Col className="fs-5">
              <strong>No of Items:</strong>
            </Col>
            <Col className="fs-5 d-flex text-muted flex-row-reverse">
              {orderDetails?.orderItems?.length > 1
                ? `${orderDetails?.orderItems?.length} Items`
                : orderDetails?.orderItems?.length === 1
                ? "1 Item"
                : "No Item added to Cart."}
            </Col>
          </Row>
          <Row className="d-flex justify-content-between mt-2">
            <Col className="fs-5">
              <strong>Total Price:</strong>
            </Col>
            <Col className="fs-5 text-muted d-flex flex-row-reverse">
              <div className="d-flex justify-content-start align-items-center">
                <FormattedPrice
                  price={orderDetails?.total_price}
                ></FormattedPrice>
              </div>
            </Col>
          </Row>

          {userData?.isAdmin && (
            <>
              <Row className="d-flex justify-content-between mt-2">
                <Col className="fs-5">
                  <strong>Order Status:</strong>
                </Col>
                <Col className="fs-5 text-muted d-flex flex-row-reverse">
                  <Form>
                    <Form.Group controlId="orderStatus">
                      <Form.Select
                        value={orderStatus}
                        onChange={(e) => {
                          setOrderStatus(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Processing"}>Processing</option>
                        <option value={"Shipped"}>Shipped</option>
                        <option value={"Delivered"}>Delivered</option>
                        <option value={"Canceled"}>Canceled</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    type="button"
                    className="mt-3 btn btn-success w-100"
                    onClick={orderStatusHandler}
                  >
                    Update Status
                  </Button>
                </Col>
              </Row>
            </>
          )}
          <hr></hr>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;

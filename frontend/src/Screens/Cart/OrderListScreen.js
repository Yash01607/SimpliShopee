import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";

import { getAllOrdersAction } from "../../actions/OrderActions";
import FormattedPrice from "../../components/General/FormattedPrice";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllOrderList = useSelector((state) => state.getAllOrderList);
  const { orderList, loading, error } = getAllOrderList;

  useEffect(() => {
    dispatch(getAllOrdersAction());
  }, [dispatch]);

  const getDate = (dateString) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var d = new Date(dateString);

    return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  return (
    <Container style={{ overflowX: "auto" }}>
      {loading && <Loader>Loading...</Loader>}
      {error?.details && <Message error={true}>{error?.details}</Message>}
      <Table striped bordered hover className="mx-3">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order date</th>
            <th>Order Total</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList?.map((order, index) => (
            <tr key={index} className="text-center align-middle">
              <td>{order?.id}</td>
              <td>{getDate(order?.order_date)}</td>
              <td>
                <FormattedPrice price={order?.total_price} />
              </td>
              <td>{order?.order_status}</td>
              <td>
                <Row>
                  <Col>
                    <button
                      className="btn btn-primary w-100 my-1"
                      onClick={() => navigate(`/order/${order?.id}`)}
                    >
                      View Order
                    </button>
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row sm={3} md={4} xl={6} xxl={8}></Row>
    </Container>
  );
};

export default OrderListScreen;

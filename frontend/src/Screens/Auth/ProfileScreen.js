import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAddressListAction, getProfile } from "../../actions/UserActions";
import Message from "../../components/General/Message";
import Loader from "../../components/General/Loader";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import AddressBox from "../../components/User/AddressBox";
import { getOrderHistoryAction } from "../../actions/OrderActions";
import FormattedPrice from "../../components/General/FormattedPrice";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);
  const { profileData, loading, error } = userProfile;

  const getUserAddressList = useSelector((state) => state.getUserAddressList);
  const {
    addressList,
    loading: loadingAddressList,
    error: errorAddressList,
  } = getUserAddressList;

  const getOrderHistory = useSelector((state) => state.getOrderHistory);
  const {
    orderList,
    loading: loadingOrderList,
    error: errorOrderList,
  } = getOrderHistory;

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getAddressListAction());
    dispatch(getOrderHistoryAction());
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
    <Container>
      {(loadingAddressList || loading || loadingOrderList) && <Loader />}
      {error && <Message error={true}>{error?.details}</Message>}
      {errorAddressList && (
        <Message error={true}>{errorAddressList?.details}</Message>
      )}
      {errorOrderList && (
        <Message error={true}>{errorOrderList?.details}</Message>
      )}

      <Row className="d-flex justify-content-between">
        <Col xs={12} md={4} className="text-center mt-5 ">
          <img
            src="./images/user.jpg"
            alt="default user"
            style={{ width: "50%" }}
            className="mb-3"
          ></img>
          <h2>{profileData?.name}</h2>
          <h6>{profileData?.email}</h6>
        </Col>
        <Col xs={12} md={7} className="mt-5  fs-6">
          <hr></hr>
          <Row className="px-3">
            <Col xs={6} md={4} className="fw-bold">
              Full Name
            </Col>
            <Col>{profileData?.name}</Col>
          </Row>
          <hr></hr>
          <Row className="px-3">
            <Col xs={6} md={4} className="fw-bold">
              Email
            </Col>
            <Col>{profileData?.email}</Col>
          </Row>
          <hr></hr>
          <Row className="px-3">
            <Col xs={6} md={4} className="fw-bold">
              Phone
            </Col>
            <Col>{profileData?.phone}</Col>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              <Button
                type="button"
                className="btn w-100"
                onClick={() => navigate("/user/update")}
              >
                Update Profile
              </Button>
            </Col>
            <Col>
              <Button
                type="button"
                className="btn btn-success w-100"
                onClick={() => navigate("/address/add")}
              >
                + Add Address
              </Button>
            </Col>
          </Row>
          <Row>
            {addressList?.map((address) => (
              <Col sm={12} md={6} lg={4} key={address?.id}>
                <AddressBox address={address}></AddressBox>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <h1 className="mt-5">Order History</h1>
      {orderList?.length > 0 ? (
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
      ) : (
        <Message error={true}>
          You havent ordered anything yet. Please buy something to view order
          history
        </Message>
      )}
    </Container>
  );
};

export default ProfilePage;

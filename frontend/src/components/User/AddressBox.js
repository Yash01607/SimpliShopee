import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import {
  deleteAddressAction,
  getAddressListAction,
} from "../../actions/UserActions";
import { DELETE_ADDRESS_RESET } from "../../constants/UserConstants";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../General/Loader";
import Message from "../General/Message";

const AddressBox = ({ address }) => {
  const dispatch = useDispatch();

  const deleteAddress = useSelector((state) => state.deleteAddress);
  const { deleteSuccess, loading, error } = deleteAddress;

  useEffect(() => {
    if (deleteSuccess) {
      dispatch({ type: DELETE_ADDRESS_RESET });
      dispatch(getAddressListAction());
    }
  }, [deleteSuccess, dispatch]);

  const deleteAddressHandler = () => {
    if (window.confirm("Are you sure you want to delete this address?"))
      dispatch(deleteAddressAction(address.id));
  };

  return (
    <>
      {loading && <Loader></Loader>}
      {error?.details && <Message error={true}>{error?.details}</Message>}
      <Card key={address?.id} className="my-4">
        <Card.Body>
          <Card.Title>Address</Card.Title>
          <Card.Text>
            {address.street}
            <br />
            {address.city}
            <br />
            {address.state}, {address.pincode} <br></br>
            <Button
              type="button"
              className="btn btn-danger mt-3 w-100"
              onClick={deleteAddressHandler}
            >
              Delete Address
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddressBox;

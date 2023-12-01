import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import FormContainer from "../../components/General/FormContainer";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";
import { addAddressAction } from "../../actions/UserActions";
import { ADD_ADDRESS_RESET } from "../../constants/UserConstants";

const AddAddressScreen = () => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addAddress = useSelector((state) => state.addAddress);
  const { loading, addressData, error } = addAddress;

  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    if (addressData) {
      dispatch({ type: ADD_ADDRESS_RESET });
      navigate("/profile");
    }
  }, [addressData, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addAddressAction({
        street,
        city,
        state,
        pincode: pinCode,
        user: userData.id,
      })
    );
  };

  return (
    <FormContainer>
      <h1>Add Address</h1>

      {loading && <Loader>Adding address...</Loader>}
      {error && <Message error={true}>{error?.details}</Message>}
      {error?.user &&
        error?.user?.map((errorMessage, i) => (
          <Message key={i} error={true}>
            {errorMessage}
          </Message>
        ))}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <div>
            {" "}
            {error?.street &&
              error?.street?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div>
            {" "}
            {error?.city &&
              error?.city?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            required
            type="e=text"
            placeholder="Upload State"
            onChange={(e) => setState(e.target.value)}
          />
          <div>
            {" "}
            {error?.state &&
              error?.state?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>
        <Form.Group controlId="pinCode">
          <Form.Label>Pin-Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Pin-Code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <div>
            {" "}
            {error?.pinCode &&
              error?.pinCode?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          + Add Address
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AddAddressScreen;

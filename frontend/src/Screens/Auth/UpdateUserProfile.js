import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import FormContainer from "../../components/General/FormContainer";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";
import { getProfile, updateUserAction } from "../../actions/UserActions";
import { UPDATE_USER_PROFILE_RESET } from "../../constants/UserConstants";

const UpdateUserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);
  const { profileData, loading, error } = userProfile;

  const updateUserProfile = useSelector((state) => state.updateUserProfile);
  const {
    updateStatus,
    loading: loadingUpdate,
    error: errorUpdate,
  } = updateUserProfile;

  useEffect(() => {
    if (updateStatus) {
      dispatch({ type: UPDATE_USER_PROFILE_RESET });
      navigate("/profile");
    } else {
      if (profileData) {
        setName(profileData?.name);
        setEmail(profileData?.email);
        setPhone(profileData?.phone ? profileData?.phone : "");
      } else {
        dispatch(getProfile());
      }
    }
  }, [dispatch, navigate, profileData, updateStatus]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAction({ name, email, phone }));
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>

      {(loading || loadingUpdate) && (
        <Loader>Loading Updated Subcategory...</Loader>
      )}
      {error?.details && <Message error={true}>{error?.details}</Message>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            {" "}
            {errorUpdate?.name &&
              errorUpdate?.name?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            {" "}
            {errorUpdate?.email &&
              errorUpdate?.email?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div>
            {" "}
            {errorUpdate?.phone &&
              errorUpdate?.phone?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Update Profile
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdateUserProfile;

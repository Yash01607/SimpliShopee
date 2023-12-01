import React from "react";
import Message from "../components/General/Message";

const AccessDeniedScreen = () => {
  return (
    <Message error={true}>
      Access Denied. You are not Authorized to access this route. Please{" "}
      <a href="/login">login</a> as an authorized user to access this route
    </Message>
  );
};

export default AccessDeniedScreen;

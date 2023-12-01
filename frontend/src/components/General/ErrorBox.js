import React from "react";
import Message from "./Message";

const ErrorBox = ({ errors }) => {
  return (
    <Message error={true}>
      {errors?.map((error) => (
        <ul>
          <li>{error?.details}</li>
        </ul>
      ))}
    </Message>
  );
};

export default ErrorBox;

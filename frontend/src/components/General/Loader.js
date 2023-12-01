import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999",
      }}
    >
      <Spinner animation="border" role="status">
        <span className="sr-only">{children}</span>
      </Spinner>
      <span className="mx-3">{children}</span>
    </div>
  );
};

export default Loader;

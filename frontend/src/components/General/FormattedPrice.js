import React from "react";

const FormattedPrice = ({ price }) => {
  return (
    <>
      <i className={`fa-solid fa-indian-rupee-sign me-1`}></i>{" "}
      {parseInt(price, 10)?.toLocaleString("en-IN", {
        style: "decimal",
        maximumFractionDigits: 2,
      })}
      .00/-
    </>
  );
};

export default FormattedPrice;

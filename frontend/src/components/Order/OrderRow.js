import React from "react";
import { Col } from "react-bootstrap";
import CustomImage from "../../components/General/Image";
import FormattedPrice from "../General/FormattedPrice";

const OrderRow = ({ orderItem }) => {
  return (
    <>
      <Col
        sm={6}
        md={3}
        style={{ display: "flex", justifyContent: "space-around" }}
        className="px-0"
      >
        <CustomImage
          src={orderItem?.product?.image}
          style={{ height: "6rem", width: "6rem" }}
          className="border border-2"
          alt={`${orderItem?.product?.name} Image`}
        ></CustomImage>
      </Col>
      <Col sm={12} md={3} className="my-auto d-flex flex-column">
        <span className="text-muted">{orderItem?.product?.brand}</span>
        <span className="fs-6">
          <strong>{orderItem?.product?.name}</strong>
        </span>
        <span className="fs-6">
          <FormattedPrice price={orderItem?.product?.price} />
        </span>
      </Col>
      <Col sm={12} md={3} className="d-flex align-items-center">
        <strong>Qty:</strong>
        <span className="fs-5 ms-2 fw-bolder">{orderItem?.quantity}</span>
      </Col>

      <Col sm={12} md={3} className="my-auto">
        <strong>Total: </strong>
        <div>
          <FormattedPrice price={orderItem?.total_price}></FormattedPrice>
        </div>
      </Col>
    </>
  );
};

export default OrderRow;

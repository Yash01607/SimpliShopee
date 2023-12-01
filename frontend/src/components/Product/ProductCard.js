import React from "react";
import { Card } from "react-bootstrap";
import CustomImage from "../General/Image";
import { useNavigate } from "react-router-dom";
import FormattedPrice from "../General/FormattedPrice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      role="button"
      className="h-100"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="h-75 d-flex justify-content-center">
        <CustomImage
          src={product?.image}
          className="w-100 my-auto"
          alt={`${product?.name} Image`}
        />
      </div>

      <div className="card-body border-top">
        <h5 className="card-title">{product?.name}</h5>
        <h6 className="text-muted">
          <FormattedPrice price={product?.price}></FormattedPrice>
        </h6>
      </div>
    </Card>
  );
};

export default ProductCard;

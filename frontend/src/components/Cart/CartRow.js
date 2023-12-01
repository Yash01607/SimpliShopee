import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import CustomImage from "../../components/General/Image";
import FormattedPrice from "../General/FormattedPrice";
import { useNavigate } from "react-router-dom";
import {
  getCartAction,
  removeItemFromCartAction,
  updateItemInCartAction,
} from "../../actions/CartActions";
import Loader from "../General/Loader";
import {
  REMOVE_ITEM_FROM_CART_RESET,
  UPDATE_ITEM_IN_CART_RESET,
} from "../../constants/CartConstants";

const CartRow = ({ cartItem }) => {
  const [qty, setQty] = useState(cartItem?.quantity ? cartItem?.quantity : 1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateItemInCart = useSelector((state) => state.updateItemInCart);

  const {
    updateSuccess,
    loading: loadingUpdate,
    error: errorUpdate,
  } = updateItemInCart;

  const removeItemFromCart = useSelector((state) => state.removeItemFromCart);

  const {
    removeSuccess,
    loading: loadingRemove,
    error: errorRemove,
  } = removeItemFromCart;

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getCartAction());
      dispatch({ type: UPDATE_ITEM_IN_CART_RESET });
    }

    if (removeSuccess) {
      dispatch(getCartAction());
      dispatch({ type: REMOVE_ITEM_FROM_CART_RESET });
    }
  }, [cartItem, dispatch, updateSuccess, removeSuccess]);

  const removeFromCartHandler = () => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeItemFromCartAction(cartItem?.id));
    }
  };

  const updateCart = (amount) => {
    const qty1 = qty;
    if (qty1 === 1 && amount === -1) {
      removeFromCartHandler();
    } else {
      dispatch(updateItemInCartAction(cartItem?.id, Number(qty1) + amount));
    }
  };

  return (
    <>
      {(loadingUpdate || loadingRemove) && <Loader></Loader>}
      <Col
        sm={6}
        md={3}
        style={{ display: "flex", justifyContent: "space-around" }}
        className="px-0"
      >
        <CustomImage
          src={cartItem?.product?.image}
          style={{ height: "6rem", width: "6rem" }}
          className="border border-2"
          alt={`${cartItem?.product?.name} Image`}
          onClick={() => navigate(`/product/${cartItem?.product?.id}`)}
          role="button"
        ></CustomImage>
      </Col>
      <Col sm={12} md={2} className="my-auto d-flex flex-column">
        <span className="text-muted">{cartItem?.product?.brand}</span>
        <span className="fs-6">
          <strong>{cartItem?.product?.name}</strong>
        </span>
        <span className="fs-6">
          <FormattedPrice price={cartItem?.product?.price} />
        </span>
      </Col>
      <Col
        sm={12}
        md={3}
        className="d-flex justify-content-between align-items-center"
      >
        <strong>Qty:</strong>
        <span onClick={() => updateCart(-1)} className="fs-1" role="button">
          -
        </span>
        <span
          disabled={true}
          type="text"
          min={0}
          className="w-25 border-0 text-center fs-4 px-auto"
        >
          {qty}
        </span>
        <span onClick={() => updateCart(1)} role="button" className="fs-1">
          +
        </span>
      </Col>

      <Col sm={12} md={2} className="my-auto">
        <strong>Total: </strong>
        <div>
          <FormattedPrice price={cartItem?.total_price}></FormattedPrice>
        </div>
      </Col>
      <Col
        sm={1}
        md={2}
        className="d-flex justify-content-start align-items-center text-danger"
      >
        <span role="button" onClick={removeFromCartHandler}>
          <i
            className="me-2 fa-solid fa-trash"
            style={{ color: "#d42316" }}
          ></i>{" "}
          Remove
        </span>{" "}
      </Col>
    </>
  );
};

export default CartRow;

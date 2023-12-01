import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetailsAction } from "../../actions/ProductActions";
import Message from "../../components/General/Message";
import Loader from "../../components/General/Loader";
import { Container, Row, Col, Table } from "react-bootstrap";

import FormattedPrice from "../../components/General/FormattedPrice";
import CustomImage from "../../components/General/Image";
import ReadMoreParagraph from "../../components/Product/truncatedPara";
import { addToCartAction } from "../../actions/CartActions";
import { ADD_TO_CART_RESET } from "../../constants/CartConstants";

import { filterURL } from "../../utils/filterURL";

const ProductScreen = () => {
  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductDetails = useSelector((state) => state.getProductDetails);
  const {
    productDetails,
    loading: loadingProductDetails,
    error: errorLoadingProductDetails,
  } = getProductDetails;

  const addToCart = useSelector((state) => state.addToCart);
  const {
    addSuccess,
    loading: loadingAddToCart,
    error: errorAddToCart,
  } = addToCart;

  useEffect(() => {
    if (!productDetails?.id || Number(productDetails.id) !== Number(id)) {
      dispatch(getProductDetailsAction(id));
    } else {
      setActiveImage(productDetails?.image);
    }
    if (addSuccess) {
      dispatch({ type: ADD_TO_CART_RESET });
      navigate(`/cart`);
    }
  }, [dispatch, id, productDetails, addSuccess, navigate]);

  const addToCartHandler = () => {
    if (qty > 0) {
      dispatch(addToCartAction(id, qty));
    } else {
      window.alert("Quantity of the item to add cannot be 0");
    }
  };

  return (
    <div>
      {(loadingProductDetails || loadingAddToCart) && (
        <Loader>Loading Product Details...</Loader>
      )}
      {errorLoadingProductDetails?.details && (
        <Message error={true}>{errorLoadingProductDetails?.details}</Message>
      )}
      {errorAddToCart?.details && (
        <Message error={true}>{errorAddToCart?.detail}</Message>
      )}
      <Container className="px-4">
        <Row className="d-flex justify-content-around">
          <Col
            xs={12}
            md={5}
            lg={5}
            className=" mb-3 text-center"
            style={{ maxHeight: "500px" }}
          >
            <CustomImage
              src={activeImage}
              className="w-75 h-75  border border-2"
              alt={`${productDetails?.name} Image`}
            ></CustomImage>
            {/* <Row>
              <Carousel className="text-primary">
                <Carousel.Item>
                  <CustomImage
                    src={productDetails?.image}
                    className=" mx-1"
                    // style={{ hei: "30px", hei }}
                    alt={`${productDetails?.name} Image`}
                  ></CustomImage>
                  <CustomImage
                    src={productDetails?.image}
                    className="mx-1"
                    alt={`${productDetails?.name} Image`}
                  ></CustomImage>
                  <CustomImage
                    src={productDetails?.image}
                    className=" mx-1"
                    alt={`${productDetails?.name} Image`}
                  ></CustomImage>
                </Carousel.Item>
                <Carousel.Item>
                  <CustomImage
                    src={productDetails?.image}
                    className="mx-1"
                    alt={`${productDetails?.name} Image`}
                  ></CustomImage>
                </Carousel.Item>
              </Carousel>
            </Row> */}
          </Col>
          <Col xs={12} md={6} lg={6} className="">
            <hr className="mt-0"></hr>
            <p
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(filterURL({ brand: productDetails?.brand }))
              }
              className="py-0 px-0 my-0 text-primary"
            >
              Brand: {productDetails?.brand}
            </p>
            <h3>{productDetails?.name}</h3>
            <h4 className="text-body my-3 fw-normal text-success">
              <FormattedPrice price={productDetails?.price} />
            </h4>
            <hr></hr>
            <ReadMoreParagraph
              text={productDetails?.description}
            ></ReadMoreParagraph>
            <hr></hr>
            <Row
              style={{ width: "15rem" }}
              className="text-center text-muted mx-1 g-0"
            >
              <Col xs={3} className="d-flex align-items-center">
                <p className="my-0">Qty:</p>
              </Col>
              <Col
                xs={2}
                className="mb-0 mx-0 px-0 border-2 border-mute border-top border-bottom border-start rounded-start d-flex align-items-center justify-content-center"
                role="button"
                onClick={() => setQty(Number(qty) > 2 ? Number(qty) - 1 : 1)}
              >
                <h3 className="mb-0 mx-0 py-0 px-0">-</h3>
              </Col>
              <Col
                xs={5}
                className="mb-0 mx-0 px-1 border-2 border-mute border-top border-bottom"
              >
                <input
                  type="text"
                  value={qty}
                  min={1}
                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      setQty(Number(e.target.value));
                    }
                  }}
                  className="w-100 h-100 border-0 text-center fs-4 px-auto"
                ></input>
              </Col>
              <Col
                xs={2}
                className="mb-0 mx-0 px-0 border-2 border-mute border-top border-bottom border-end rounded-end d-flex align-items-center justify-content-center"
                role="button"
                onClick={() => setQty(Number(qty) + 1)}
              >
                <h3 className="mb-1 mx-0 py-0 px-0">+</h3>
              </Col>
              <Row className="mt-3 px-0">
                <span className=" text-start">
                  Total price:{" "}
                  <span className="text-success">
                    <i className="fa-solid fa-indian-rupee-sign ps-2"></i>{" "}
                    {parseInt(
                      Number(qty) * Number(productDetails?.price),
                      10
                    )?.toLocaleString("en-IN", {
                      style: "decimal",
                      maximumFractionDigits: 2,
                    })}
                    .00
                  </span>
                </span>
              </Row>
            </Row>
            <Row className="mt-4">
              <Col>
                <button
                  type="button"
                  className="btn btn-danger w-100 h-100"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </Col>
            </Row>
            <hr></hr>
            <Row className="mt-4">
              <h5 className="fw-bolder mb-3">Details of this item</h5>
              <Table striped bordered hover className="mx-3">
                <tbody>
                  {productDetails?.details?.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail?.name}</td>
                      <td>{detail?.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductScreen;

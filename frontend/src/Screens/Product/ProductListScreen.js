import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import {
  deleteProductAction,
  getLatestProductListAction,
} from "../../actions/ProductActions";

import FormattedPrice from "../../components/General/FormattedPrice";
import CustomImage from "../../components/General/Image";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";
import PaginationNavigation from "../../components/Product/PaginationNavigation";

export const ProductListScreen = () => {
  const [pageNo, setPageNo] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLatestProductList = useSelector(
    (state) => state.getLatestProductList
  );
  const {
    latestProductList,
    loading: loadingLatestProducts,
    error: errorLatestProducts,
  } = getLatestProductList;

  const deleteProduct = useSelector((state) => state.deleteProduct);
  const {
    loading: loadingDelete,
    error: errorDelete,
    deleteProductStatus,
  } = deleteProduct;

  useEffect(() => {
    dispatch(getLatestProductListAction(pageNo));
  }, [dispatch, deleteProductStatus, pageNo]);

  const deleteProductHandler = (productId) => {
    if (window.confirm(`Are u sure you want to delete this product?`)) {
      dispatch(deleteProductAction(productId));
    }
  };

  return (
    <Container style={{ overflowX: "auto" }}>
      {(loadingLatestProducts || loadingDelete) && <Loader>Loading...</Loader>}
      {errorLatestProducts?.details && (
        <Message error={true}>{errorLatestProducts?.details}</Message>
      )}
      {errorDelete?.details && (
        <Message error={true}>{errorDelete?.details}</Message>
      )}
      <Row>
        <button
          onClick={() => navigate("/product/add")}
          className="btn btn-success w-25 mx-auto my-3"
        >
          + Add Product
        </button>
      </Row>
      <Table striped bordered hover className="mx-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {latestProductList?.products?.map((product, index) => (
            <tr key={index} className="text-center align-middle">
              <td>
                <CustomImage
                  src={product?.image}
                  style={{ height: "4rem", width: "4rem" }}
                  className="border border-2"
                  alt={`${product?.name} Image`}
                  onClick={() => navigate(`/product/${product?.id}`)}
                  role="button"
                ></CustomImage>
              </td>
              <td
                onClick={() => navigate(`/product/${product?.id}`)}
                role="button"
              >
                {product?.name}
              </td>
              <td>
                <FormattedPrice price={product?.price} />
              </td>
              <td>{product?.brand}</td>
              <td>
                <Row>
                  <Col>
                    <a
                      href={`/product/update/${product?.id}`}
                      className="btn btn-primary w-100 my-1"
                    >
                      Edit
                    </a>
                  </Col>

                  <Col>
                    <button
                      className="btn btn-danger w-100 my-1"
                      onClick={() => deleteProductHandler(product?.id)}
                    >
                      Delete
                    </button>
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationNavigation
        productList={latestProductList}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
      <Row sm={3} md={4} xl={6} xxl={8}></Row>
    </Container>
  );
};

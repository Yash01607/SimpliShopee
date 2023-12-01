import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import { getCategoryList } from "../actions/CategoryActions";
import Message from "../components/General/Message";
import Loader from "../components/General/Loader";
import Image from "../components/General/Image";
import { getLatestProductListAction } from "../actions/ProductActions";
import ProductCard from "../components/Product/ProductCard";
import { filterURL } from "../utils/filterURL";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.categoryList);

  const {
    categoryListData,
    loading: loadingCategories,
    error: errorLoadingCategories,
  } = categoryList;

  const getLatestProductList = useSelector(
    (state) => state.getLatestProductList
  );

  const {
    latestProductList,
    loading: loadingLatestProducts,
    error: errorLatestProducts,
  } = getLatestProductList;

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getLatestProductListAction(1));
  }, [dispatch]);


  return (
    <>
      {(loadingCategories || loadingLatestProducts) && (
        <Loader>Loading ProductDetails...</Loader>
      )}
      {errorLoadingCategories && (
        <Message key={1} error={true}>
          {errorLoadingCategories.details}
        </Message>
      )}
      {errorLatestProducts && (
        <Message key={1} error={true}>
          {errorLatestProducts.details}
        </Message>
      )}
      <h2 className="mt-3">Latest Products</h2>
      <hr></hr>
      <Container>
        <Row sm={3} md={4} xl={6} xxl={8}>
          {latestProductList?.products?.slice(0, 5)?.map((product, index) => (
            <Col className="my-2" key={index}>
              <ProductCard product={product}></ProductCard>
            </Col>
          ))}
          <Col
            className="my-2 text-primary d-flex align-items-center"
            key={"index"}
            onClick={() => navigate(filterURL({}))}
          >
            <span style={{ cursor: "pointer" }}>
              <i className="fa-solid fa-circle-arrow-right fa-2xl mx-2"></i>
              Shop Now...
            </span>
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <h2>Browse by Categories</h2>
      <hr></hr>
      <Container>
        <Row xs={1} md={2} lg={3}>
          {categoryListData?.map((category, index) => (
            <Col key={index} className="my-2">
              <Card
                role="button"
                className="h-100 text-center"
                onClick={() =>
                  navigate(filterURL({ category_name: category?.name }))
                }
              >
                <Image
                  src={category.image}
                  className="card-img-top h-75"
                  alt={`${category?.name} Image`}
                />
                <div className="card-body">
                  <h5 className="card-title">{category?.name}</h5>
                  <p className="card-text">{category?.description}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;

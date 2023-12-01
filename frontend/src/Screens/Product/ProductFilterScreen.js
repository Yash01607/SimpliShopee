import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Col, Form, Nav, Navbar, Row } from "react-bootstrap";

import {
  getBrandListAction,
  getFilteredProductsAction,
} from "../../actions/ProductActions";

import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";
import { filterURL } from "../../utils/filterURL";

import FormattedPrice from "../../components/General/FormattedPrice";
import { getSubCategoriesAction } from "../../actions/CategoryActions";
import { GET_SUB_CATEGORY_RESET } from "../../constants/CategoryConstants";
import PaginationNavigation from "../../components/Product/PaginationNavigation";

const ProductFilterScreen = () => {
  const {
    category_name,
    subcategory_name,
    search_string,
    brand,
    min_price,
    max_price,
    order_by,
  } = useParams();
  const subcategoryIdList = subcategory_name.split(",");

  const [minPrice, setMinPrice] = useState(min_price);
  const [maxPrice, setMaxPrice] = useState(max_price);
  const [userBrand, setUserBrand] = useState("");
  const [userOrderBy, setUserOrderBy] = useState("");
  const [pageNo, setPageNo] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFilteredProductList = useSelector(
    (state) => state.getFilteredProductList
  );
  const {
    productList,
    loading: loadingProducts,
    error: errorProducts,
  } = getFilteredProductList;

  const getBrandList = useSelector((state) => state.getBrandList);
  const {
    brandList,
    loading: loadingBrands,
    error: errorBrands,
  } = getBrandList;

  const getSubCategories = useSelector((state) => state.getSubCategories);
  const {
    subCategories,
    loading: loadingSubCategories,
    error: errorSubCategories,
  } = getSubCategories;

  useEffect(() => {
    setPageNo(1);
  }, [
    category_name,
    subcategory_name,
    search_string,
    brand,
    min_price,
    max_price,
    order_by,
  ]);

  useEffect(() => {
    const filterData = {
      category_name,
      subcategory_name,
      search_string,
      brand,
      min_price,
      max_price,
      order_by,
    };

    dispatch(getFilteredProductsAction(filterData, pageNo));
    dispatch(getBrandListAction(category_name));
    if (category_name && category_name !== " ") {
      dispatch(getSubCategoriesAction(category_name));
    } else {
      dispatch({ type: GET_SUB_CATEGORY_RESET });
    }
  }, [
    dispatch,
    category_name,
    subcategory_name,
    search_string,
    brand,
    min_price,
    max_price,
    order_by,
    pageNo,
  ]);

  const resetFilterHandler = () => {
    setMaxPrice(100000);
    setMinPrice(0);
    setUserBrand("");
    setUserOrderBy("");
  };

  const applyFilterHandler = (e) => {
    e.preventDefault();
    navigate(
      filterURL({
        category_name,
        subcategory_name,
        search_string,
        brand: userBrand,
        min_price: minPrice,
        max_price: maxPrice === 100000 ? 999999999 : maxPrice,
        order_by: userOrderBy,
      })
    );
  };
  const subcategoryFilterUpdateHandler = (subCategoryId) => {
    if (subcategory_name !== " ") {
      if (subcategoryIdList?.includes(String(subCategoryId))) {
        const updateSubcategoryIdList = subcategoryIdList.filter(
          (id) => Number(id) !== Number(subCategoryId)
        );
        navigate(
          filterURL({
            subcategory_name: updateSubcategoryIdList,
            category_name: category_name,
            brand: userBrand,
            min_price: minPrice,
            max_price: maxPrice,
            order_by: userOrderBy,
          })
        );
      } else {
        const updateSubcategoryIdList = [...subcategoryIdList, subCategoryId];
        navigate(
          filterURL({
            subcategory_name: updateSubcategoryIdList,
            category_name: category_name,
            brand: userBrand,
            min_price: minPrice,
            max_price: maxPrice,
            order_by: userOrderBy,
          })
        );
      }
    } else {
      navigate(
        filterURL({
          subcategory_name: [subCategoryId],
          category_name: category_name,
          brand: userBrand,
          min_price: minPrice,
          max_price: maxPrice,
          order_by: userOrderBy,
        })
      );
    }
  };

  return (
    <>
      {(loadingProducts || loadingSubCategories || loadingBrands) && (
        <Loader>Loading...</Loader>
      )}
      {errorProducts?.details && (
        <Message error={true}>{errorProducts?.details}</Message>
      )}
      {errorBrands?.details && (
        <Message error={true}>{errorBrands?.details}</Message>
      )}
      {errorSubCategories?.details && (
        <Message error={true}>{errorSubCategories?.details}</Message>
      )}
      {category_name && (
        <Navbar sticky="top" data-bs-theme="light" className="bg-body-tertiary">
          <Nav
            className="me-auto w-100 text-center"
            style={{ width: "300px", overflow: "auto" }}
          >
            {subCategories?.map((subcategory) => (
              <Nav.Link key={subcategory?.id} className="mx-2">
                <Form.Check
                  type="checkbox"
                  role="button"
                  id={Number(subcategory?.id)}
                  label={subcategory?.name}
                  checked={subcategoryIdList?.includes(String(subcategory?.id))}
                  onChange={() =>
                    subcategoryFilterUpdateHandler(subcategory?.id)
                  }
                />
              </Nav.Link>
            ))}
          </Nav>
        </Navbar>
      )}
      <Row>
        <span>
          <Form
            onSubmit={applyFilterHandler}
            className="px-2 py-2"
            style={{ background: "lightgrey" }}
          >
            <Row>
              <Col sm={6} md={4} lg={3}>
                <Form.Group controlId="minPrice">
                  <Form.Label>Minimum Price</Form.Label>
                  <Form.Range
                    value={minPrice}
                    onChange={(e) => {
                      Number(e.target.value) < maxPrice
                        ? setMinPrice(Number(e.target.value))
                        : alert(
                          "Minimum Price must me less than Maximum Price"
                        );
                    }}
                    min={0}
                    max={100000}
                    step={100}
                  />
                  <Form.Text className="text-center">
                    Min Price: <FormattedPrice price={minPrice} />
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col sm={6} md={4} lg={3}>
                <Form.Group controlId="maxPrice">
                  <Form.Label>Maximum Price</Form.Label>
                  <Form.Range
                    value={maxPrice}
                    onChange={(e) => {
                      Number(e.target.value) > minPrice
                        ? setMaxPrice(Number(e.target.value))
                        : alert(
                          "Minimum Price must me less than Maximum Price"
                        );
                    }}
                    min={0}
                    max={100000}
                    step={100}
                  />
                  <Form.Text className="text-center">
                    Max Price:{" "}
                    {maxPrice === 100000 ? (
                      <span>No Limit!!!</span>
                    ) : (
                      <FormattedPrice price={maxPrice} />
                    )}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col sm={6} md={4} lg={3}>
                <Form.Group controlId="brand">
                  <Form.Label>Brand:</Form.Label>
                  <Form.Select
                    value={userBrand}
                    onChange={(e) => {
                      setUserBrand(e.target.value);
                    }}
                  >
                    <option value="">Select a Brand</option>
                    {brandList?.map((brand, index) => (
                      <option key={index} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={6} md={4} lg={3}>
                <Form.Group controlId="category">
                  <Form.Label>Order By:</Form.Label>
                  <Form.Select
                    value={userOrderBy}
                    onChange={(e) => {
                      setUserOrderBy(e.target.value);
                    }}
                  >
                    <option value="">Select an order</option>
                    <option value="-createdAt">Newest First</option>
                    <option value="createdAt">Oldest First</option>
                    <option value="price">Price Low - High</option>
                    <option value="-price">Price High - Low</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button
                  type="button"
                  onClick={resetFilterHandler}
                  variant="primary"
                  className="mx-3 "
                >
                  Reset Filter
                </Button>
                <Button type="submit" variant="success" className="">
                  Apply Filter
                </Button>
              </Col>
            </Row>
          </Form>{" "}
        </span>
      </Row>
      {productList?.products?.length === 0 && (
        <Message error={true}>
          Oopss!!!! No products found with current Filter Criteria. Try a more
          general filter for Criteria
        </Message>
      )}
      <Row sm={2} md={3} xl={4} xxl={5}>
        {productList?.products?.map((product, index) => (
          <Col className="my-2" key={index}>
            <ProductCard product={product}></ProductCard>
          </Col>
        ))}
      </Row>
      <PaginationNavigation
        productList={productList}
        pageNo={pageNo}
        setPageNo={setPageNo}
      ></PaginationNavigation>
    </>
  );
};

export default ProductFilterScreen;

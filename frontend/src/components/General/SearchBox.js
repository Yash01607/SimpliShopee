import React, { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProductsAction } from "../../actions/ProductActions";
import { useNavigate } from "react-router-dom";
import { GET_FILTERED_PRODUCTS_LIST_RESET } from "../../constants/ProductConstants";
import CustomImage from "./Image";
import { filterURL } from "../../utils/filterURL";
import Message from "./Message";

const SearchBox = () => {
  const [search_string, setSearch_string] = useState("");
  const [display, setDisplay] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFilteredProductList = useSelector(
    (state) => state.getFilteredProductList
  );
  const {
    productList,
    error: errorProducts,
  } = getFilteredProductList;

  useEffect(() => {
    if (window.location.href.includes("products/filter")) {
      setDisplay(false);
    }
    const filterData = {
      category_name: "",
      subcategory_name: "",
      search_string: search_string,
      brand: "",
      min_price: 0,
      max_price: 999999999,
      order_by: "-createdAt",
    };
    if (search_string === "") {
      dispatch({ type: GET_FILTERED_PRODUCTS_LIST_RESET });
    } else if (search_string)
      dispatch(getFilteredProductsAction(filterData, 1));
  }, [search_string, dispatch]);

  const handleSearchChange = (e) => {
    setSearch_string(e.target.value);
  };

  const handleProductClick = (id) => {
    setDisplay(false);
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search_string === "") {
      return alert("Please enter something to search");
    }
    setDisplay(false);
    navigate(filterURL({ search_string: search_string }));
  };

  return (
    <Form
      className="my-auto position-absolute w-25"
      onSubmit={handleSearchSubmit}
    >
      <div className="input-group">
        <input
          className="form-control rounded-0 border-end-0 border"
          type="text"
          value={search_string}
          onChange={handleSearchChange}
          id="search-input"
          autoComplete="off"
          onFocus={() =>
            !window.location.href.includes("products/filter") &&
            setDisplay(true)
          }
        />
        <span className="">
          <button
            className="btn btn-outline-secondary bg-white border-start-0 border rounded-0 ms-n5"
            type="submit"
          >
            <i className="fa fa-search"></i>
          </button>
        </span>
      </div>

      {display && (
        <div className="position-relative" style={{ zIndex: 9999 }}>
          {errorProducts?.details && (
            <Message error={true}>{errorProducts?.details}</Message>
          )}
          {productList?.products?.length > 0 && (
            <ListGroup>
              {productList?.products?.map((product, index) => (
                <ListGroup.Item
                  onClick={() => handleProductClick(product?.id)}
                  key={index}
                  role="button"
                >
                  <CustomImage
                    src={product?.image}
                    style={{ height: "2rem", width: "2rem" }}
                    className=""
                    alt={`${product?.name} Image`}
                    role="button"
                  ></CustomImage>
                  <span className="ms-3">
                    <strong>{product?.brand}</strong>
                  </span>
                  <span className="mx-1">{product.name}</span>
                </ListGroup.Item>
              ))}
              <ListGroup.Item
                onClick={() => {
                  setDisplay(false);
                  navigate(filterURL({ search_string: search_string }));
                }}
                key={"index"}
                role="button"
              >
                <span className="ms-3 text-primary">
                  <strong>Load all...</strong>
                </span>
              </ListGroup.Item>
            </ListGroup>
          )}
        </div>
      )}
    </Form>
  );
};

export default SearchBox;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Col, Form, ListGroup, Row } from "react-bootstrap";

import FormContainer from "../../components/General/FormContainer";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";

import { UPDATE_PRODUCT_RESET } from "../../constants/ProductConstants";
import {
  getProductDetailsAction,
  updateProductAction,
} from "../../actions/ProductActions";
import {
  getCategoryList,
  getSubCategoriesAction,
} from "../../actions/CategoryActions";

const UpdateProductScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);
  const [brand, setBrand] = useState("");
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState(undefined);

  const [subCategories, setSubCategories] = useState([]);
  const [searchSubCategories, setSearchSubCategories] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const [detailName, setDetailName] = useState("");
  const [detailValue, setDetailValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductDetails = useSelector((state) => state.getProductDetails);
  const {
    productDetails,
    loading: loadingProductDetails,
    error: errorLoadingProductDetails,
  } = getProductDetails;

  const updateProduct = useSelector((state) => state.updateProduct);
  const {
    productDetails: productUpdateStatus,
    loading: loadingUpdate,
    error: errorUpdate,
  } = updateProduct;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    categoryListData,
    loading: loadingGetCategories,
    error: errorGetCategories,
  } = categoryList;

  const getSubCategories = useSelector((state) => state.getSubCategories);
  const {
    subCategories: subCategoriesList,
    loading: loadingSubCategories,
    error: errorSubCategories,
  } = getSubCategories;

  useEffect(() => {
    if (productUpdateStatus) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/products");
    } else {
      if (!productDetails?.id || productDetails?.id !== Number(id)) {
        dispatch(getProductDetailsAction(id));
      } else {
        setName(productDetails?.name);
        setDescription(productDetails?.description);
        setPrice(productDetails?.price);
        setCategory(productDetails?.category);
        setBrand(productDetails?.brand);
        setDetails(productDetails?.details);
        const subCategoryListIdToObject = productDetails?.subcategories?.map(
          (s1) => subCategoriesList?.find((s2) => s2.id === s1)
        );
        setSubCategories(subCategoryListIdToObject);
      }
    }
    if (!categoryListData || categoryListData?.length === 0) {
      dispatch(getCategoryList());
    } else {
      if (
        subCategoriesList?.length > 0 &&
        Number(subCategoriesList[0].category) === Number(category)
      ) {
        setSubCategoryOptions(subCategoriesList);
      } else if (category > 0) {
        setSubCategoryOptions([]);
        setSubCategories([]);
        dispatch(getSubCategoriesAction(category));
      }
    }
  }, [
    category,
    categoryListData,
    dispatch,
    id,
    navigate,
    productDetails,
    productUpdateStatus,
    subCategoriesList,
  ]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addDetail = () => {
    if (detailName && detailValue) {
      const updatedDetails = [
        ...details,
        {
          name: detailName,
          value: detailValue,
        },
      ];
      setDetails(updatedDetails);
      setDetailName("");
      setDetailValue("");
    } else {
      alert(
        "Both details name and value must be provided before adding the detail."
      );
    }
  };

  const addSubcategoriesHandler = (subcategory) => {
    if (
      !subCategories?.find(
        (addedSubcategory) => addedSubcategory.id === subcategory.id
      )
    ) {
      setSubCategories([...subCategories, subcategory]);
      setSubCategoryOptions(
        subCategoryOptions.filter((s) => s.id !== subcategory.id)
      );
      setSearchSubCategories("");
    }
  };

  const handleRemoveValue = (subcategory) => {
    const updatedValues = subCategories.filter((s) => s.id !== subcategory.id);

    if (subCategoryOptions.some((s) => s.id === subcategory.id)) {
      setSubCategories(updatedValues);
    } else {
      setSubCategoryOptions([...subCategoryOptions, subcategory]);
      setSubCategories(updatedValues);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (subCategories.length === 0) {
      return alert("You must add atleast one subcategory");
    }
    let formData = new FormData();
    image && formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("details", JSON.stringify(details));
    formData.append("category", category);
    formData.append("price", price);

    const subCategoriesIdList = subCategories?.map((s) => Number(s.id));
    formData.append("subcategoryIds", subCategoriesIdList);

    dispatch(updateProductAction(id, formData));
  };

  const removeDetail = (index) => {
    if (index >= 0 && index < details.length) {
      const newDetails = [
        ...details.slice(0, index),
        ...details.slice(index + 1),
      ];
      setDetails(newDetails);
    }
  };

  return (
    <FormContainer>
      <h1>Update {productDetails?.name || "Product"}</h1>

      {(loadingProductDetails ||
        loadingGetCategories ||
        loadingUpdate ||
        loadingSubCategories) && <Loader>Loading...</Loader>}
      {errorLoadingProductDetails?.details && (
        <Message error={true}>{errorLoadingProductDetails?.details}</Message>
      )}
      {errorGetCategories?.details && (
        <Message error={true}>{errorGetCategories?.details}</Message>
      )}
      {errorSubCategories?.details && (
        <Message error={true}>{errorSubCategories?.details}</Message>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            {" "}
            {errorUpdate?.name &&
              errorUpdate?.name?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            {" "}
            {errorUpdate?.description &&
              errorUpdate?.description?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div>
            {" "}
            {errorUpdate?.description &&
              errorUpdate?.description?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <div>
            {" "}
            {errorUpdate?.description &&
              errorUpdate?.description?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="subcategories">
          <Form.Label>Select Subcategories to add</Form.Label>
          <div className="">
            {subCategories?.map((subcategory, index) => (
              <div key={index}>
                <Badge
                  role="button"
                  variant="primary"
                  className="selected-value mx-1 my-1"
                  onClick={() => handleRemoveValue(subcategory)}
                >
                  {subcategory?.name} x
                </Badge>
              </div>
            ))}
            <Form.Control
              type="text"
              value={searchSubCategories}
              onChange={(e) => setSearchSubCategories(e.target.value)}
              placeholder="Search for values..."
            />
          </div>
          {subCategoryOptions?.length > 0 && (
            <div
              className="border border-2 border-top-0"
              style={{ maxHeight: "100px", overflowY: "auto" }}
            >
              {subCategoryOptions
                ?.filter((subcategory) =>
                  subcategory?.name
                    .toLowerCase()
                    .includes(searchSubCategories.toLowerCase())
                )
                .map((subcategory) => (
                  <div
                    role="button"
                    key={subcategory?.id}
                    className="mx-1 my-1"
                    onClick={() => addSubcategoriesHandler(subcategory)}
                  >
                    {subcategory?.name}
                  </div>
                ))}
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload category Image"
            onChange={handleImageChange}
          />
          <div>
            {" "}
            {errorUpdate?.image &&
              errorUpdate?.image?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="details">
          <Form.Label>Details</Form.Label>
          {details?.length > 0 && (
            <ListGroup>
              {details.map((detail, index) => (
                <ListGroup.Item key={index} className="my-1">
                  <i
                    role="button"
                    onClick={() => removeDetail(index)}
                    className="fa-solid fa-trash"
                    style={{ color: "#e21d1d" }}
                  ></i>{" "}
                  <span className="mx-3">
                    {detail.name} - {detail.value}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={detailName}
                placeholder="Add Detail Name"
                onChange={(e) => setDetailName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                value={detailValue}
                placeholder="Add Detail Value"
                onChange={(e) => setDetailValue(e.target.value)}
              />
            </Col>
            <Col>
              <Button onClick={addDetail} type="button" variant="primary">
                +
              </Button>
            </Col>
          </Row>

          <div>
            {" "}
            {errorUpdate?.image &&
              errorUpdate?.image?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Update {productDetails?.name || "Product"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdateProductScreen;

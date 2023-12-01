import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

import FormContainer from "../../components/General/FormContainer";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";
import AddSubCategoryForm from "../../components/Category/AddSubCategoryForm";

import {
  deleteSubCategoryAction,
  getCategoryAction,
  getSubCategoriesAction,
  updateCategoryAction,
} from "../../actions/CategoryActions";

import { UPDATE_CATEGORY_RESET } from "../../constants/CategoryConstants";

const UpdateCategoryForm = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCategory = useSelector((state) => state.getCategory);
  const { category, loading, error } = getCategory;

  const getSubCategories = useSelector((state) => state.getSubCategories);
  const {
    subCategories,
    loading: loadingSubCategories,
    error: errorSubCategories,
  } = getSubCategories;

  const deleteSubCategories = useSelector((state) => state.deleteSubCategories);
  const {
    deleteSuccess: deleteSubCategorySuccess,
    loading: loadingDeleteSubCategory,
    error: errorDeleteSubCategory,
  } = deleteSubCategories;

  const updateCategory = useSelector((state) => state.updateCategory);
  const {
    category: categoryUpdateStatus,
    loading: loadingUpdate,
    error: errorUpdate,
  } = updateCategory;

  useEffect(() => {
    if (categoryUpdateStatus) {
      dispatch({ type: UPDATE_CATEGORY_RESET });
      navigate("/category");
    } else {
      if (!category?.name || category?.id !== Number(id)) {
        dispatch(getCategoryAction(id));
        dispatch(getSubCategoriesAction(id));
      } else {
        setName(category?.name);
        setDescription(category?.description);
      }
    }
    if (deleteSubCategorySuccess) {
      dispatch(getSubCategoriesAction(id));
    }
  }, [
    dispatch,
    category,
    id,
    categoryUpdateStatus,
    deleteSubCategorySuccess,
    navigate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();

    image && formData.append("image", image, image.name);
    name && formData.append("name", name);
    description && formData.append("description", description);

    dispatch(updateCategoryAction(id, formData));
  };

  const deleteSubcategoryHandler = (subCategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      dispatch(deleteSubCategoryAction(subCategoryId));
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Update Category</h1>

        {(loading ||
          loadingUpdate ||
          loadingSubCategories ||
          loadingDeleteSubCategory) && (
          <Loader>Loading Updated Subcategory...</Loader>
        )}
        {error?.details && <Message error={true}>{error?.details}</Message>}
        {errorSubCategories?.details && (
          <Message error={true}>{errorSubCategories?.details}</Message>
        )}
        {errorDeleteSubCategory?.details && (
          <Message error={true}>{errorDeleteSubCategory?.details}</Message>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
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

          <Form.Group controlId="image">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Upload category Image"
              onChange={(e) => setImage(e.target.files && e.target.files[0])}
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

          <Button type="submit" variant="primary" className="mt-3">
            Update category
          </Button>
        </Form>
      </FormContainer>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AddSubCategoryForm categoryId={id} />
          {subCategories?.map((subCategory, index) => (
            <tr key={index}>
              <td>{subCategory?.name}</td>
              <td>{subCategory?.description}</td>
              <td>
                <Row>
                  <Col>
                    <button
                      onClick={() => deleteSubcategoryHandler(subCategory.id)}
                      className="btn btn-danger w-100"
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
    </>
  );
};

export default UpdateCategoryForm;

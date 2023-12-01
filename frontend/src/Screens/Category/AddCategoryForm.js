import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import FormContainer from "../../components/General/FormContainer";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";

import { addCategoryAction } from "../../actions/CategoryActions";
import { ADD_CATEGORY_RESET } from "../../constants/CategoryConstants";

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(undefined);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addCategory = useSelector((state) => state.addCategory);
  const { loading, category, error } = addCategory;

  useEffect(() => {
    if (category) {
      dispatch({ type: ADD_CATEGORY_RESET });
      navigate("/category");
    }
  }, [category, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", image, image.name);
    formData.append("name", name);
    formData.append("description", description);
    dispatch(addCategoryAction(formData));
  };

  return (
    <FormContainer>
      <h1>Add Category</h1>

      {loading && <Loader>Adding category...</Loader>}

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
            {error?.name &&
              error?.name?.map((errorMessage, i) => (
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
            {error?.description &&
              error?.description?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            required
            type="file"
            placeholder="Upload category Image"
            onChange={(e) => setImage(e.target.files && e.target.files[0])}
          />
          <div>
            {" "}
            {error?.image &&
              error?.image?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Create category
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AddCategoryForm;

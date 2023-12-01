import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_SUB_CATEGORY_RESET } from "../../constants/CategoryConstants";
import {
  addSubCategoryAction,
  getCategoryAction,
} from "../../actions/CategoryActions";
import Loader from "../General/Loader";
import Message from "../General/Message";

const AddSubCategoryForm = ({ categoryId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addSubcategory = useSelector((state) => state.addSubcategory);
  const { loading, subCategory, error } = addSubcategory;

  useEffect(() => {
    if (subCategory) {
      dispatch({ type: ADD_SUB_CATEGORY_RESET });
      setName("");
      setDescription("");
      dispatch(getCategoryAction(categoryId));
    }
  }, [subCategory, dispatch, navigate]);

  const addSubCategoryHandler = () => {
    dispatch(addSubCategoryAction({ name, description, category: categoryId }));
  };

  return (
    <>
      {loading && <Loader>Adding Subcategory...</Loader>}
      <tr>
        <td>
          <Form.Group controlId="name">
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
            {error?.name &&
              error?.name?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </Form.Group>
        </td>
        <td>
          <Form.Group controlId="description">
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />{" "}
            {error?.description &&
              error?.description?.map((errorMessage, i) => (
                <Message key={i} error={true}>
                  {errorMessage}
                </Message>
              ))}
          </Form.Group>
        </td>

        <td>
          <Button
            type="button"
            onClick={addSubCategoryHandler}
            variant="success"
            className="w-100"
          >
            <strong>+</strong> Add
          </Button>
        </td>
      </tr>
    </>
  );
};

export default AddSubCategoryForm;

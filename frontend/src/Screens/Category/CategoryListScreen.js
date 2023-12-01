import React, { useEffect } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getCategoryList,
} from "../../actions/CategoryActions";
import Image from "../../components/General/Image";
import Loader from "../../components/General/Loader";
import Message from "../../components/General/Message";

const CategoryListScreen = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categoryListData, loading, error } = categoryList;

  const deleteCategory = useSelector((state) => state.deleteCategory);
  const {
    loading: loadingDelete,
    error: errorDelete,
    deleteSuccess,
  } = deleteCategory;

  useEffect(() => {
    dispatch(getCategoryList());
  }, [deleteSuccess, dispatch]);

  const deleteCategoryHandler = (id) => {
    if (window.confirm(`Are u sure you want to delete this category?`)) {
      dispatch(deleteCategoryAction(id));
    }
  };

  return (
    <>
      {loading && <Loader>Loading Categories</Loader>}
      {loadingDelete && <Loader>Deleting Category...</Loader>}
      {error && <Message error={true}>{error}</Message>}
      {errorDelete && <Message error={true}>{errorDelete?.detail}</Message>}

      <Container>
        <Row>
          <a href="/category/add" className="btn btn-success w-25 mx-auto my-3">
            + Add category
          </a>
        </Row>
        <Row xs={1} md={2} lg={3}>
          {categoryListData?.map((category, index) => (
            <Col key={index}>
              <Card className="my-2 text-center">
                <Image
                  src={category.image}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{category?.name}</h5>
                  <p className="card-text">{category?.description}</p>
                  <Row>
                    <Col>
                      <a
                        href={`/category/update/${category?.id}`}
                        className="btn btn-primary w-100"
                      >
                        Edit
                      </a>
                    </Col>

                    <Col>
                      <button
                        onClick={() => deleteCategoryHandler(category.id)}
                        className="btn btn-danger w-100"
                      >
                        Delete
                      </button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CategoryListScreen;

import React, { useEffect } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategoriesAction } from "../../actions/CategoryActions";
import Loader from "../General/Loader";
import Message from "../General/Message";

const SubcategoryList = ({ categoryId }) => {
  const dispatch = useDispatch();

  const getSubCategories = useSelector((state) => state.getSubCategories);
  const {
    subCategories,
    loading: loadingSubCategories,
    error: errorSubCategories,
  } = getSubCategories;

  useEffect(() => {
    dispatch(getSubCategoriesAction(categoryId));
  }, [dispatch, categoryId]);

  return (
    <Container className=" bg-light " style={{ zIndex: 999999 }}>
      {loadingSubCategories && <Loader></Loader>}
      {errorSubCategories?.details && (
        <Message error={true}>{errorSubCategories?.details}</Message>
      )}
      <Row>
        <Col sm={12} md={3} lg={3}>
          {subCategories && subCategories?.length > 0 && (
            <ListGroup>
              {subCategories?.map((subcategory, index) => (
                <ListGroup key={index}>
                  <span>{subcategory?.name}</span>
                </ListGroup>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col sm={12} md={9} lg={9}></Col>
      </Row>
    </Container>
  );
};

export default SubcategoryList;

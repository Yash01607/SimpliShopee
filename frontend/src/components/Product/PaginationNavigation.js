import React from "react";
import { Nav } from "react-bootstrap";

const PaginationNavigation = ({ productList, pageNo, setPageNo }) => {
  return (
    <Nav aria-label="Page navigation example" className="w-100">
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${productList?.previous ? "" : "disabled"}`}
          onClick={() => productList?.previous && setPageNo(pageNo - 1)}
        >
          <span role="button" className="page-link">
            Previous
          </span>
        </li>
        <li
          className="page-item"
          onClick={() => productList?.previous && setPageNo(pageNo - 1)}
        >
          <span
            role="button"
            className={`page-link ${productList?.previous ? "" : "disabled"}`}
          >
            {pageNo - 1}
          </span>
        </li>
        <li className="page-item">
          <span role="button" className="page-link">
            {pageNo}
          </span>
        </li>
        <li
          className={`page-item ${productList?.next ? "" : "disabled"}`}
          onClick={() => productList?.next && setPageNo(pageNo + 1)}
        >
          <span role="button" className="page-link">
            {pageNo + 1}
          </span>
        </li>
        <li
          className={`page-item ${productList?.next ? "" : "disabled"}`}
          onClick={() => productList?.next && setPageNo(pageNo + 1)}
        >
          <span role="button" className="page-link">
            Next
          </span>
        </li>
      </ul>
    </Nav>
  );
};

export default PaginationNavigation;

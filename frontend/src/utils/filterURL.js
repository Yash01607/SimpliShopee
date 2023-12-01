export const filterURL = (filterData) => {
  const category_name = filterData?.category_name || " ";
  const subcategory_name =
    filterData?.subcategory_name?.length > 0
      ? filterData?.subcategory_name
      : " ";
  const search_string = filterData?.search_string || " ";
  const brand = filterData?.brand || " ";
  const min_price = filterData?.min_price || 0;
  const max_price =
    filterData?.max_price < 100000 ? filterData?.max_price : 999999999;
  const order_by = filterData?.order_by || "-createdAt";

  return `/products/filter/category_name/${category_name}/subcategory_name/${subcategory_name}/search_string/${search_string}/brand/${brand}/min_price/${min_price}/max_price/${max_price}/order_by/${order_by}`;
};

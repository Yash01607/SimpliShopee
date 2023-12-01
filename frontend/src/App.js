import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Header from "./components/General/Header";
import Footer from "./components/General/Footer";
import AdminRoute from "./components/General/AdminRoute";
import PrivateRoute from "./components/General/PrivateRoute";

import HomeScreen from "./Screens/HomeScreen";
import AuthScreen from "./Screens/Auth/AuthScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import ProfileScreen from "./Screens/Auth/ProfileScreen";
import ForgotPasswordScreen from "./Screens/Auth/ForgotPasswordScreen";
import AddCategoryForm from "./Screens/Category/AddCategoryForm";
import UpdateCategoryForm from "./Screens/Category/UpdateCategoryForm";
import CategoryListScreen from "./Screens/Category/CategoryListScreen";
import ProductScreen from "./Screens/Product/ProductScreen";
import { ProductListScreen } from "./Screens/Product/ProductListScreen";
import AddProductScreen from "./Screens/Product/AddProductScreen";
import UpdateProductScreen from "./Screens/Product/UpdateProductScreen";
import ProductFilterScreen from "./Screens/Product/ProductFilterScreen";
import CartScreen from "./Screens/Cart/CartScreen";
import OrderListScreen from "./Screens/Cart/OrderListScreen";
import OrderScreen from "./Screens/Cart/OrderScreen";
import AddAddressScreen from "./Screens/Address/AddAddressScreen";
import UpdateUserProfile from "./Screens/Auth/UpdateUserProfile";
import AccessDeniedScreen from "./Screens/AccessDeniedScreen";

function App() {
  return (
    <>
      <Header />
      <Container>
        <main style={{ minHeight: "80vh" }}>
          <Routes>
            <Route exact path="/login" element={<AuthScreen />} />
            <Route exact path="/signup" element={<RegisterScreen />} />
            <Route
              exact
              path="/forgotpassword"
              element={<ForgotPasswordScreen />}
            />
            <Route
              exact
              path="/address/add"
              element={
                <PrivateRoute>
                  <AddAddressScreen />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />

            <Route exact path="/user/update" element={<UpdateUserProfile />} />
            <Route
              exact
              path="/category/update/:id"
              element={
                <AdminRoute>
                  <UpdateCategoryForm />
                </AdminRoute>
              }
            />
            <Route
              exact
              path="/category/add"
              element={
                <AdminRoute>
                  <AddCategoryForm />
                </AdminRoute>
              }
            />

            <Route
              exact
              path="/category"
              element={
                <AdminRoute>
                  <CategoryListScreen />
                </AdminRoute>
              }
            />

            <Route exact path="/product/:id" element={<ProductScreen />} />

            <Route
              exact
              path="/products/filter/category_name/:category_name/subcategory_name/:subcategory_name/search_string/:search_string/brand/:brand/min_price/:min_price/max_price/:max_price/order_by/:order_by"
              element={<ProductFilterScreen />}
            />

            <Route
              exact
              path="/products/"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />

            <Route
              exact
              path="/product/add/"
              element={
                <AdminRoute>
                  <AddProductScreen />
                </AdminRoute>
              }
            />

            <Route
              exact
              path="/product/update/:id"
              element={
                <AdminRoute>
                  <UpdateProductScreen />
                </AdminRoute>
              }
            />

            <Route
              exact
              path="/cart"
              element={
                <PrivateRoute>
                  <CartScreen />
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/allorders"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />

            <Route
              exact
              path="/order/:id"
              element={
                <PrivateRoute>
                  <OrderScreen />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/access/denied"
              element={<AccessDeniedScreen />}
            />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;

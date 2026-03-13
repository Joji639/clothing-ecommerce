
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Footer from "./Main/Footer";
import Nav from "./Main/Nav";
import Body from "./Main/Body";

import { AuthProvider } from "./Context/AuthContext.jsx";
import { WishListProvider } from "./Context/WishListContext.jsx";
import CategoryProvider from "./Context/CategoryContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";

import FormikValidationForm from "./Auth/Login.jsx";
import SignUpPage from "./Auth/SignUpPage.jsx";
import ProtectedRouteUser from "./Auth/ProtectedRouteUser.jsx";
import ProtectedRouteAdmin from "./Auth/ProtectedRouteAdmin.jsx";
import PublicRoute from "./Auth/PublicRoute.jsx";
import Unauthorized from "./Auth/Unauthorized.jsx";

import AllProducts from "./Components/AllProducts.jsx";
import Carts from "./Components/Carts.jsx";
import WishList from "./Components/WishList.jsx";
import DetailsPage from "./Components/DetailsPage.jsx";
import PaymentPage from "./Components/PaymentPage.jsx";
import OrderPage from "./Components/OrderPage.jsx";

import Admin from "./Admin/Admin.jsx";
import DashBoard from "./Admin/DashBoard.jsx";
import Users from "./Admin/Users.jsx";
import Orders from "./Admin/Orders.jsx";
import Products from "./Admin/Products.jsx";

function App() {
  return (
    <AuthProvider>
      <WishListProvider>
        <CategoryProvider>
          <CartProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
          

            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/allProducts" element={<AllProducts />} />
              <Route path="/login" element={ <PublicRoute><FormikValidationForm /> </PublicRoute>} />
              <Route path="/Signin"   element={<PublicRoute>  <SignUpPage /></PublicRoute>} />
              <Route path="/product/:id" element={<DetailsPage />} />
               <Route  path="/carts"element={<ProtectedRouteUser> <Carts /> </ProtectedRouteUser>}/>
              <Route path="/wishlist"  element={<ProtectedRouteUser> <WishList /></ProtectedRouteUser> }/>
              <Route path="/paymentpage" element={<ProtectedRouteUser>  <PaymentPage /></ProtectedRouteUser>}/>
              <Route path="/OrderPage"element={<ProtectedRouteUser> <OrderPage /> </ProtectedRouteUser> }/>
              

              <Route path="/admin"   element={ <ProtectedRouteAdmin> <Admin /></ProtectedRouteAdmin>}>
                <Route index element={<DashBoard />} />
                <Route path="userPage" element={<Users />} />
                <Route path="orders" element={<Orders />} />
                <Route path="Products" element={<Products />} />
              </Route>.
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>

          </CartProvider>
        </CategoryProvider>
      </WishListProvider>
    </AuthProvider>
  );
}

export default App;

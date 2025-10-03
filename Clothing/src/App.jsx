import Footer from "./Main/Footer"
import Nav from "./Main/Nav"
import Body from "./Main/Body"
import { Route,Routes } from "react-router-dom"
import AllProducts from "../src/Components/AllProducts.jsx"
import CategoryProvider from "./Context/CategoryContext.jsx"
import FormikValidationForm from "./Auth/Login.jsx"
import SignUpPage from "./Auth/SignUpPage.jsx"
import { Toaster } from "react-hot-toast"
import { CartProvider } from "./Context/CartContext.jsx"
import Carts from "./Components/Carts.jsx"
import { AuthProvider } from "./Context/AuthContext.jsx"
import { WishListProvider } from "./Context/WishListContext.jsx"
import WishList from "./Components/WishList.jsx"
import DetailsPage from "./Components/DetailsPage.jsx"
import PaymentPage from "./Components/PaymentPage.jsx"
import OrderPage from "./Components/OrderPage.jsx"
import Admin from "./Admin/Admin.jsx"
import DashBoard from "./Admin/DashBoard"
import Users from "./Admin/Users.jsx"
import Orders from "./Admin/Orders.jsx"
import Products from "./Admin/Products.jsx"

function App() {
  return(
    <>
    <AuthProvider>
      <WishListProvider>
    <CategoryProvider>
      <CartProvider>

      <Toaster position="bottom-right" reverseOrder={false}/>
    <Routes>
    <Route path="/" element={<Body/>}/>
     <Route path="/allProducts" element={<AllProducts/>}/>
     <Route path="/login" element={<FormikValidationForm />}/>
     <Route path="/Signin" element={<SignUpPage/>}/>
     <Route path='/carts' element={<Carts/>}/>
     <Route path='/wishlist' element={<WishList/>}/>
     <Route path="/product/:id" element={<DetailsPage />} />
     <Route path="/paymentpage" element={<PaymentPage/>}/>
     <Route path="/OrderPage" element={<OrderPage/>}/>


     <Route path="/admin" element={<Admin/>}>
         <Route index element={<DashBoard/>}/>
         <Route path="userPage" element={<Users/>}/>
         <Route path="orders" element={<Orders/>}/>
         <Route path="Products" element={<Products/>}/>


     </Route>
    </Routes>
  </CartProvider>
    </CategoryProvider>
   </WishListProvider>
    </AuthProvider>
   
    </>
  )
  
}

export default App

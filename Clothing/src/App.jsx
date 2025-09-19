import Footer from "./Main/Footer"
import Nav from "./Main/Nav"
import Body from "./Main/Body"
import { Route,Routes } from "react-router-dom"
import AllProducts from "../src/Components/AllProducts.jsx"
import CategoryProvider from "./Context/CategoryContext.jsx"
import FormikValidationForm from "./Auth/Login.jsx"
import SignUpPage from "./Auth/SignUpPage.jsx"
import { Toaster } from "react-hot-toast"
import { CartProvider } from "./Context/cartcontext.jsx"
import Carts from "./Components/Carts.jsx"


function App() {
  return(
    <>
    <CategoryProvider>
      <CartProvider>

      <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
    <Routes>
    <Route path="/" element={<Body/>}/>
     <Route path="/allProducts" element={<AllProducts/>}/>
     <Route path="/login" element={<FormikValidationForm />}/>
     <Route path="/Signin" element={<SignUpPage/>}/>
     <Route path='/carts' element={<Carts/>}/>
    </Routes>
  </CartProvider>
    </CategoryProvider>
   
    </>
  )
  
}

export default App

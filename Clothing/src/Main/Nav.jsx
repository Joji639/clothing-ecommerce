import React, { useContext } from "react";
import { GiClothesline } from "react-icons/gi";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import useAuth from "../Context/AuthContext";
import { IoLogOut } from "react-icons/io5";
import { WishlistContext } from "../Context/WishListContext";
import { IoBag } from "react-icons/io5";
import Search from "./Search";
import { CategoryContext } from "../Context/CategoryContext";
const Nav = () => {
  const { SetCategory } = useContext(CategoryContext);
  const { CartItem } = useContext(CartContext); 
  const {user,isLoggedIn,logout}=useAuth()
   const { WishList } = useContext(WishlistContext);

  const totalItems = CartItem.reduce((sum, item) => sum + item.quantity, 0);



  return (
    <nav className="sticky top-0 bg-white shadow-md py-4 px-6 flex items-center justify-between max-w-7xl mx-auto gap-4 z-50">
      <Link to="/">
        <div className="flex items-center space-x-2">
          <GiClothesline className="text-3xl text-amber-600" />
          <span className="text-xl md:text-2xl font-bold text-gray-800">
            Clothify
          </span>
        </div>
      </Link>

      <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <Link to="/allProducts">
          <li
            onClick={() => SetCategory(null)}
            className="hover:text-amber-600 transition cursor-pointer"
          >
            All products
          </li>
        </Link>
        <Link to="/allProducts">
          <li
            onClick={() => SetCategory("men")}
            className="hover:text-amber-600 transition cursor-pointer"
          >
            Men
          </li>
        </Link>
        <Link to="/allProducts">
          <li
            onClick={() => SetCategory("women")}
            className="hover:text-amber-600 transition cursor-pointer"
          >
            Women
          </li>
        </Link>
        <Link to="/allProducts">
          <li
            onClick={() => SetCategory("kids")}
            className="hover:text-amber-600 transition cursor-pointer"
          >
            Kids
          </li>
        </Link>
        <Link to="/allProducts">
          <li
            onClick={() => SetCategory("unisex")}
            className="hover:text-amber-600 transition cursor-pointer"
          >
            Unisex
          </li>
        </Link>
      </ul>

      <div className="hidden md:block flex-grow mx-8">
        <Search display="hidden"/>
      </div>

      <div className="flex items-center space-x-6 text-gray-600 relative">
        <Link to="/OrderPage" className="relative">
          <IoBag className="text-2xl hover:text-amber-600 transition cursor-pointer" />
        </Link>
        <Link to="/Wishlist" className="relative">
          <FaHeart className="text-xl hover:text-amber-600 transition cursor-pointer" />
          {WishList.length  > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {WishList.length }
            </span>
          )}
        </Link>

        <Link to="/carts" className="relative">
          <FaShoppingCart className="text-xl hover:text-amber-600 transition cursor-pointer" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

          {isLoggedIn?(<button onClick={logout} ><IoLogOut className="text-2xl hover:bg-amber-600" /></button>):(<Link to="/login">
          <FaUser className="text-xl hover:text-amber-600 transition cursor-pointer" />
        </Link>)}
        
      </div>
    </nav>
  );
};

export default Nav;

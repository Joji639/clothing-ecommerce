import React, { useContext, useState } from "react";
import { GiClothesline } from "react-icons/gi";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import useAuth from "../Context/AuthContext";
import { IoLogOut, IoBag } from "react-icons/io5";
import { WishlistContext } from "../Context/WishListContext";
import Search from "./Search";
import { CategoryContext } from "../Context/CategoryContext";

const Nav = () => {
  const { SetCategory } = useContext(CategoryContext);
  const { CartItem } = useContext(CartContext);
  const { user, logout, loading } = useAuth();
  const { WishList } = useContext(WishlistContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = CartItem.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 bg-white border-b shadow-sm z-50">

      
      <div className="max-w-6xl mx-auto px-2 py-3 flex items-center justify-between">

        
        <div className="flex items-center gap-4 min-w-[180px]">
          
          
          <button
            className="md:hidden text-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

         
          <Link to="/" className="flex items-center gap-2">
            <GiClothesline className="text-3xl text-amber-600" />
            <span className="text-2xl font-bold text-gray-800">
              Clothify
            </span>
          </Link>

          
          <ul className="hidden md:flex gap-4 text-gray-700 font-medium text-base">
            <Link to="/allProducts">
              <li onClick={() => SetCategory(null)} className="hover:text-amber-600 cursor-pointer">
                All
              </li>
            </Link>
            <Link to="/allProducts">
              <li onClick={() => SetCategory("men")} className="hover:text-amber-600 cursor-pointer">
                Men
              </li>
            </Link>
            <Link to="/allProducts">
              <li onClick={() => SetCategory("women")} className="hover:text-amber-600 cursor-pointer">
                Women
              </li>
            </Link>
            <Link to="/allProducts">
              <li onClick={() => SetCategory("kids")} className="hover:text-amber-600 cursor-pointer">
                Kids
              </li>
            </Link>
            <Link to="/allProducts">
              <li onClick={() => SetCategory("unisex")} className="hover:text-amber-600 cursor-pointer">
                Unisex
              </li>
            </Link>
          </ul>
        </div>

        
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="w-full max-w-md">
            <Search />
          </div>
        </div>

        
        <div className="flex items-center gap-4 min-w-[180px] justify-end text-gray-700">

          
          <div className="md:hidden flex items-center pt-1">
            <Search />
          </div>

          
          <Link to="/OrderPage">
            <IoBag className="text-2xl" />
          </Link>

          
          <Link to="/Wishlist" className="relative">
            <FaHeart className="text-2xl" />
            {WishList.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {WishList.length}
              </span>
            )}
          </Link>

          
          <Link to="/carts" className="relative">
            <FaShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          
          {loading ? (
            <span>...</span>
          ) : user ? (
            <button onClick={logout}>
              <IoLogOut className="text-2xl hover:text-red-500" />
            </button>
          ) : (
            <Link to="/signin">
              <FaUser className="text-2xl hover:text-amber-600" />
            </Link>
          )}
        </div>
      </div>



      
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-5 py-4 flex flex-col gap-3">
          <Link to="/allProducts" onClick={() => SetCategory(null)}>
            All
          </Link>
          <Link to="/allProducts" onClick={() => SetCategory("men")}>
            Men
          </Link>
          <Link to="/allProducts" onClick={() => SetCategory("women")}>
            Women
          </Link>
          <Link to="/allProducts" onClick={() => SetCategory("kids")}>
            Kids
          </Link>
          <Link to="/allProducts" onClick={() => SetCategory("unisex")}>
            Unisex
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
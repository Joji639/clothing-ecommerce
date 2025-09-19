import React, { useContext } from "react";
import { GiClothesline } from "react-icons/gi";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";
import { CartContext } from "../Context/cartcontext";
const Nav = () => {
  const { SetCategory } = useContext(CategoryContext);
  const { cart } = useContext(CartContext); // ✅ get cart from context

  // ✅ total items in cart (sum of quantities)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 bg-white shadow-md py-4 px-6 flex items-center justify-between max-w-7xl mx-auto gap-4 z-50">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center space-x-2">
          <GiClothesline className="text-3xl text-amber-600" />
          <span className="text-xl md:text-2xl font-bold text-gray-800">
            Clothify
          </span>
        </div>
      </Link>

      {/* Categories */}
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

      {/* Search Bar */}
      <div className="hidden md:block flex-grow mx-8">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full max-w-md border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-6 text-gray-600 relative">
        <FaHeart className="text-xl hover:text-amber-600 transition cursor-pointer" />

        {/* Cart with badge */}
        <Link to="/carts" className="relative">
          <FaShoppingCart className="text-xl hover:text-amber-600 transition cursor-pointer" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* User */}
        <Link to="/login">
          <FaUser className="text-xl hover:text-amber-600 transition cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

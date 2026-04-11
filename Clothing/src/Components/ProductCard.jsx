import React, { useContext } from "react";
import { useCart } from "../Context/CartContext";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/WishListContext";

const ProductCard = ({ pcard = [] }) => {
  const { CartItem, AddToCart } = useCart();
  const { toggleWishList, WishList } = useContext(WishlistContext);

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-6 p-[50px] m-[10px]">
      {pcard.map((product) => {
        const isInWishlist = WishList.some(
          (item) => item.product === product.id
        );

        const isInCart = CartItem.some(
          (item) => item.product === product.id
        );

        return (
          <div
            key={product.id}  
            className="relative shadow-md border p-2 hover:shadow-lg transition rounded-xl flex flex-col items-center"
          >
            {/* Wishlist Button */}
            <button
              className="absolute top-2 right-3"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishList(product);
              }}
            >
              {isInWishlist ? (
                <RiHeart3Fill className="text-red-500" size={24} />
              ) : (
                <RiHeart3Line size={24} />
              )}
            </button>

            
            <Link to={`/product/${product.id}`} className="w-full">
              <img
                src={product.img}
                alt={product.title}
                className="rounded-xl w-full h-48 object-cover"
              />
            </Link>

            
            <div className="mt-2 text-center w-full">
              <p className="font-semibold text-sm">
                {product.title}
              </p>
              <p className="text-sm font-bold">
                ₹{product.price}
              </p>

              
              {isInCart ? (
                <Link to="/carts">
                  <button className="bg-blue-500 text-white rounded-lg w-full mt-2 py-1 hover:bg-blue-600">
                    View Cart
                  </button>
                </Link>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    AddToCart(product.id);
                  }}
                  className="bg-gray-200 rounded-lg w-full mt-2 py-1 hover:bg-blue-400"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
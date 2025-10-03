import React, { useContext } from "react";
import { useCart } from "../Context/CartContext";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/WishListContext";

const ProductCard = ({ pcard }) => {
  const { CartItem, AddToCart } = useCart();
  const { toggleWishList, WishList } = useContext(WishlistContext);

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-4 cursor-pointer gap-6 p-[50px] m-[10px]">
      {pcard.map((product, idx) => {
        const isInWishlist = WishList.some((item) => item.id === product.id); 

        return (
          <div
            key={idx}
            className="w-full relative shadow-md border-[1px] p-1 hover:shadow-lg transition hover:border-[2px] rounded-xl flex flex-col justify-center items-center"
          >
            

            <button
              className="mb-2 absolute top-2 right-3  text-black text-5xl   hover:bg-gray-300"
              onClick={(e) => {
                e.stopPropagation(); 
                toggleWishList(product);
              }}
              >
              {isInWishlist ? (
                <RiHeart3Fill size={28} className="text-red-500 text-xl" />
              ) : (
                <RiHeart3Line size={28} className="text-black text-xl" />
              )}
            </button>
              

            <div className="flex flex-col justify-center items-center overflow-hidden w-full">
              <Link to={`/product/${product.id}`}>
              <img
                src={product.img}
                alt={product.title}
                className="object-cover rounded-xl w-full h-48"
              />
              </Link>
              
              
   
              <div className="grid gap-2 mt-2 text-center w-full px-2">
                <p className="text-[15px] font-bold">Product: {product.title}</p>
                <p className="text-[13px] font-bold">Price: ₹{product.price}</p>

                {CartItem.find((p) => p.id === product.id) ? (
                    <Link to={"/Carts"}>
                    <button className="bg-blue-500 rounded-lg hover:bg-blue-600 w-full mb-1 border-[1px] cursor-pointer transition-all ease-in-out">
                      VIEW CART
                    </button>
                    </Link>
                 
                ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        AddToCart(product);
                      }}
                      className="bg-white rounded-lg hover:bg-blue-400 w-full mb-1 border-[1px] cursor-pointer transition-all ease-in-out"
                    >
                      ADD TO CART
                    </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;


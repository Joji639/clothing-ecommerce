import React from "react";
import { useCart } from "../Context/cartcontext";
import { Link } from "react-router-dom";
const ProductCard = ({ pcard }) => {
  const { cart,addToCart } = useCart(); // use addToCart function

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-4 cursor-pointer gap-6 p-[50px] m-[10px]">
      {pcard.map((product, idx) => (
        <div
          key={idx}
          className="shadow-md border-[1px] p-1 hover:shadow-lg transition hover:border-[2px] rounded-xl flex justify-center items-center"
        >
          <div className="flex flex-col justify-center items-center overflow-hidden">
            <img
              src={product.img}
              alt={product.title}
              className="object-cover rounded-xl w-full h-full"
            />

            <div className="grid gap-2 mt-2 text-center">
              <p className="text-[15px] font-bold">Product: {product.title}</p>
              <p className="text-[13px] font-bold">Price: ₹{product.price}</p>

              {/* ✅ Add to Cart button */}
              {/* <button
                onClick={() => addToCart(product)}
                className="p-[5px] rounded-lg text-black border hover:bg-gray-300"
              >
                Add To Cart
              </button> */}

                {(cart.find((p)=>p.id===product.id))?
              (<Link title='view cart' to="/carts">
                <button className='bg-amber-400 hover:bg-amber-500 w-full mb-1 border-[1px] cursor-pointer transition-all ease-in-out'>
                  VIEW CART
                </button>
              </Link>):
              (<Link title='add to cart'>
                <button onClick={(e)=>{
              e.stopPropagation 
              addToCart(product)}}
              className='bg-white hover:bg-amber-300 w-full mb-1 border-[1px] cursor-pointer transition-all ease-in-out'>
                  ADD TO CART
                </button>
              </Link>)}



              {/* Wishlist button (you can connect later to WishlistContext) */}
              <button className="text-black border p-[5px] rounded-lg hover:bg-gray-300">
                Add To Wishlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;

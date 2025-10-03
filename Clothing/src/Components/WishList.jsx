import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishListContext";
import { Trash2 } from "lucide-react"
import Nav from "../Main/Nav";
const WishList = () => {

 const{WishList,removeFromWishlist}=useContext(WishlistContext)

  return (
    <><Nav/>
    <div className="p-6">
      
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {WishList.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="space-y-4">
          {WishList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>
              </div>
              <button onClick={()=>removeFromWishlist(item.id)}>
                <Trash2 className="text-red-500 w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div></>
  );
};

export default WishList;


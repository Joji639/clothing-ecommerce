// Context/WishListContext.jsx

import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export const WishListProvider = ({ children }) => {
  const [WishList, setWishList] = useState([]);
  const { user } = useContext(AuthContext);


  const fetchWishlist = async () => {
    try {
      const res = await api.get("allwishlist/wishlist/");
      setWishList(res.data);
    } catch (err) {
      console.log("Wishlist fetch error", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishList([]);
    }
  }, [user]);


  const addToWishlist = async (productId) => {
    try {
      await api.post("allwishlist/wishlist/", {
        product: productId,
      });
      toast.success("Added to Wishlist");
      fetchWishlist(); 
    } catch (err) {
      toast.error("Already in wishlist");
    }
  };


  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`allwishlist/wishlist/${productId}/`);
      toast.error("Removed from Wishlist");
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  
  const toggleWishList = (product) => {
    const exists = WishList.some(
      (item) => item.product === product.id
    );

    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ WishList, toggleWishList, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
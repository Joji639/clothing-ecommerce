

import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import useAuth from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [CartItem, SetCartItem] = useState([]);
  const { user } = useAuth();


  const fetchCart = async () => {
    try {
      const res = await api.get("allcart/cart/");
      SetCartItem(res.data);
    } catch (err) {
      console.log("Cart fetch error", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      SetCartItem([]);
    }
  }, [user]);


  const AddToCart = async (productId) => {
    try {
      await api.post("allcart/cart/", {
        product: productId,
      });
      toast.success("Added to Cart ");
      fetchCart();
    } catch {
      toast.error("Error adding to cart");
    }
  };


  const incrementQuantity = async (productId) => {
    try {
      await api.patch(`allcart/cart/${productId}/`, {
        action: "increase",
      });
      fetchCart();
    } catch {
      toast.error("Error updating quantity");
    }
  };


  const decrementQuantity = async (productId) => {
    try {
      await api.patch(`allcart/cart/${productId}/`, {
        action: "decrease",
      });
      fetchCart();
    } catch {
      toast.error("Minimum quantity is 1");
    }
  };


  const removeFromCart = async (productId) => {
    try {
      await api.delete(`allcart/cart/${productId}/`);
      toast.error("Removed from cart");
      fetchCart();
    } catch {
      toast.error("Error removing item");
    }
  };

  return (
    <CartContext.Provider
      value={{
        CartItem,
        AddToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        SetCartItem,
        fetchCart, 
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
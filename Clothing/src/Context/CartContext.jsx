import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import useAuth from "./AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [CartItem, SetCartItem] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

 
  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5000/user/${user.id}`)
        .then((res) => {
          SetCartItem(res.data.cart || []);
        })
        .catch((err) => console.error("Error fetching cart:", err));
    } else {
      SetCartItem([]);
    }
  }, [user]);

  const updateCart = async (updatedCart) => {
    if (!user?.id) return;
    try {
      await axios.patch(`http://localhost:5000/user/${user.id}`, {
        cart: updatedCart,
      });
    } catch (err) {
      console.error("Error updating cart:", err);
      throw err;
    }
  };

  const AddToCart = async (product) => {
    if (!user) {
      toast.error("Please sign in to use this feature");
      return navigate("/Signin");
    }
    if (user.role === "admin") {
      toast.error("Admins cannot add products to cart");
      return;
    }

    const updatedCart = [...CartItem, { ...product, quantity: 1 }];
    SetCartItem(updatedCart);
    try {
      await updateCart(updatedCart);
      toast.success("Added to Cart");
    } catch {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const removeFromCart = async (id) => {
    const updatedCart = CartItem.filter((item) => item.id !== id);
    SetCartItem(updatedCart);
    try {
      await updateCart(updatedCart);
      toast.error("Removed from cart");
    } catch {
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const incrementQuantity = async (id) => {
    const updatedCart = CartItem.map((item) =>
      item.id === id ? { ...item, quantity: (Number(item.quantity) || 1) + 1 } : item
    );
    SetCartItem(updatedCart);
    try {
      await updateCart(updatedCart);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const decrementQuantity = async (id) => {
    const updatedCart = CartItem.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(Number(item.quantity ?? 1) - 1, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    SetCartItem(updatedCart);
    try {
      await updateCart(updatedCart);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  
  const EmptyCart = async ({ saveAsOrder = true } = {}) => {
    if (!user?.id) return false;
    if (user.role === "admin") {
      toast.error("Admins cannot place orders");
      return false;
    }

    try {
      const { data: latestUser } = await axios.get(`http://localhost:5000/user/${user.id}`);
      const now = new Date();
      const orderDate = now.toLocaleDateString();
      const orderTime = now.toLocaleTimeString();

      const currentCart = latestUser.cart || [];

      const orderDetails = currentCart.map((item) => ({
        ...item,
        date: orderDate,
        time: orderTime,
        status: "pending",
      }));

      const newOrders = saveAsOrder ? [...(latestUser.orders || []), ...orderDetails] : (latestUser.orders || []);

      await axios.patch(`http://localhost:5000/user/${user.id}`, {
        orders: newOrders,
        cart: [],
      });

      SetCartItem([]);
      toast.success("Order placed successfully! Cart cleared.");
      return true;
    } catch (err) {
      console.error("Error emptying cart:", err);
      toast.error("Something went wrong while placing the order");
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        CartItem,
        SetCartItem,
        AddToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        EmptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

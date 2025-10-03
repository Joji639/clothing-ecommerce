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
        .catch((err) => console.error(" Error fetching cart:", err));
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
    }
  };

  const AddToCart = async (product) => {
    if (!user) {
      toast.error("please sign in to use this feature ");
      return navigate("/signin");
    }
    let updatedCart;
    updatedCart = [...CartItem, { ...product, quantity: 1 }];
    updateCart(updatedCart);
    SetCartItem(updatedCart);
    toast.success("Added to Cart ");
  };

  const removeFromCart = (id) => {
    let updatedCart;
    updatedCart = CartItem.filter((item) => item.id !== id);
    updateCart(updatedCart);
    SetCartItem(updatedCart);
    toast.error("Removed from cart");
  };

  const incrementQuantity = (id) => {
    const updatedCart = CartItem.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    SetCartItem(updatedCart);
    updateCart(updatedCart);
  };

  const decrementQuantity = (id) => {
    const updatedCart = CartItem.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(Number(item.quantity ?? 1) - 1, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    SetCartItem(updatedCart);
    updateCart(updatedCart);
  };

  const EmptyCart = async () => {
    if (!user?.id) return;
    let now = new Date();
    let updatedCart = [...CartItem];

    try {
      const { data: latestUser } = await axios.get(
        `http://localhost:5000/user/${user.id}`
      );

      const orderDate = now.toLocaleDateString();
      const orderTime = now.toLocaleTimeString();

      const OrderDetails = updatedCart.map((item) => ({
        ...item,
        date: orderDate,
        time: orderTime,
        status: "pending",
      }));
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Something went wrong while placing the order");
    }

    SetCartItem([]);
  };

  return (
    <CartContext.Provider
      value={{
        CartItem,
        SetCartItem,
        removeFromCart,
        AddToCart,
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

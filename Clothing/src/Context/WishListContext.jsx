import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const WishlistContext = createContext();

export const WishListProvider = ({ children }) => {
  const [WishList, setWishList] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5000/user/${user.id}`)
        .then((res) => {
          setWishList(res.data.wishlist || []);
        })
        .catch((err) => console.error("Error fetching wishlist:", err));
    } else {
      setWishList([]);
    }
  }, [user]);

  const updateWishList = async (updatedList) => {
    if (!user?.id) return;
    try {
      await axios.patch(`http://localhost:5000/user/${user.id}`, {
        wishlist: updatedList,
      });
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  const toggleWishList = (product) => {
    if (!user) {
      toast.error("Please sign in to use this feature");
      return navigate("/signin");
    }

    let updatedList;
    const exists = WishList.find((item) => item.id === product.id);
    if (exists) {
      updatedList = WishList.filter((item) => item.id !== product.id);
      toast.error("Removed from Wishlist");
    } else {
      updatedList = [...WishList, product];
      toast.success("Added to Wishlist");
    }

    setWishList(updatedList);
    updateWishList(updatedList);
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = WishList.filter((item) => item.id !== id);
    setWishList(updatedWishlist);
    updateWishList(updatedWishlist);
    toast.error("Removed from wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{ WishList, toggleWishList, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

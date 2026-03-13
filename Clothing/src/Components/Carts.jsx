


import React from "react";
import { useCart } from "../Context/CartContext";
import { Trash2 } from "lucide-react";
import Nav from "../Main/Nav";
import useAuth from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

const Carts = () => {
  const { CartItem, incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
let a = useSelector((state)=>state.cart.cart)
let dispatch = useDispatch()
  if (user?.role === "admin") {
    return (
      <>
        <Nav />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600">Admins cannot view or place orders. Use the admin panel.</p>
        </div>
      </>
    );
  }

  const totalPrice = CartItem.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <>
      <Nav />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Cart</h2>

        {a.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {a.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p>₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => decrementQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded" disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      
                      <span>{item.quantity}</span>
                      <button onClick={() => incrementQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded">
                        +
                      </button>
                    </div>
                  </div>
                </div> 

                <button onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="text-red-500 w-6 h-6" />
                </button>
              </div>
            ))}

            <div className="text-right mt-6">
              <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
            </div>

            <div className="text-right mt-4">
              <button
                onClick={() => navigate("/paymentpage")}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Carts;

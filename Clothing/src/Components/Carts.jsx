// src/Products/Carts.jsx
import React from "react";
import { useCart } from "../Context/cartcontext";
import { Trash2 } from "lucide-react";

const Carts = () => {
  const { cart, increase, decrease, removeFromCart, totalAmount } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
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
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decrease(item.id)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increase(item.id)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
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
            <h3 className="text-xl font-bold">Total: ₹{totalAmount}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;

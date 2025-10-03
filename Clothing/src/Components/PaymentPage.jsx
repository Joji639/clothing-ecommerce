import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Nav from "../Main/Nav";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { CartItem, SetCartItem } = useCart();
  const { user } = useContext(AuthContext);

  const singleProduct = location.state?.product;

  const orderItems = singleProduct ? [singleProduct] : CartItem || [];
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 1000 ? 0 : subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Full Name must be at least 2 characters")
    .max(10, "Full Name must be less than 50 characters")
    .required("Full Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  address: Yup.string()
    .required("Address is required"),

  payment: Yup.string()
    .oneOf(["upi", "card", "cod"], "Please select a valid payment method")
    .required("Please select a payment method"),
});




  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    
    const { data: latestUser } = await axios.get(`http://localhost:5000/user/${user.id}`);

    const now = new Date();

    
    const newOrderItems = orderItems.map(item => ({
      ...item,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      status: "pending",
      buyer: values,
    }));

    await axios.patch(`http://localhost:5000/user/${user.id}`, {
      userDetails: values, 
      orders: [...(latestUser.orders || []), ...newOrderItems] 
    });

    toast.success("Order placed successfully!");

    {(!singleProduct)&& SetCartItem([]);}

    resetForm();
    navigate("/OrderPage");
  } catch (error) {
    console.error(error);
    toast.error("Failed to place order");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <>
    <Nav/>
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {orderItems.length > 0 ? (
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4 last:border-none"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity || 1}
                  </p>
                  <p className="font-bold">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No items to checkout.</p>
        )}
      </div>

      <Formik
        initialValues={{
          fullName:"",
          email:"",
          phone: "",
          address: "",
          payment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Buyer Details</h2>

              <Field
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full mb-2 px-4 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="fullName"
                component="p"
                className="text-red-500 text-sm mb-2"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full mb-2 px-4 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mb-2"
              />

              <Field
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full mb-2 px-4 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-red-500 text-sm mb-2"
              />

              <Field
                as="textarea"
                name="address"
                placeholder="Address"
                className="w-full mb-2 px-4 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="address"
                component="p"
                className="text-red-500 text-sm mb-2"
              />

              <h2 className="text-xl font-bold mb-3">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <Field type="radio" name="payment" value="upi" />
                  <span>UPI</span>
                </label>
                <label className="flex items-center gap-2">
                  <Field type="radio" name="payment" value="card" />
                  <span>Credit / Debit Card</span>
                </label>
                <label className="flex items-center gap-2">
                  <Field type="radio" name="payment" value="cod" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
              <ErrorMessage
                name="payment"
                component="p"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </p>
              <p className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </p>
              <p className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </p>
              <button
                type="submit"
                disabled={isSubmitting || orderItems.length === 0}
                className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
              >
                {isSubmitting ? "Placing Order..." : "Confirm & Pay"}

              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
};

export default PaymentPage;

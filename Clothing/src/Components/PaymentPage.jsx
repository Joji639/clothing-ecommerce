import React from "react";
import { useCart } from "../Context/CartContext";
import useAuth from "../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Nav from "../Main/Nav";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { CartItem,SetCartItem, fetchCart } = useCart(); // ✅ FIXED naming
  const { user } = useAuth();

  const singleProduct = location.state?.product;
  const orderItems = singleProduct ? [singleProduct] : CartItem || [];

  
  const subtotal = orderItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const shipping = subtotal > 1000 ? 0 : subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;


  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      let payload;

      if (!singleProduct) {
        payload = {
          type: "cart",
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          payment_method: values.payment,
        };
      } else {
        payload = {
          type: "single",
          product: singleProduct.product || singleProduct.id,
          quantity: singleProduct.quantity || 1,
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          payment_method: values.payment,
        };
      }

      const res = await api.post("payment/", payload);

      toast.success(res.data?.message || "Order placed successfully!");

      
      if (!singleProduct) {
        SetCartItem([]);      
        await fetchCart();    
      }

      resetForm();
      navigate("/OrderPage");

    } catch (error) {
      const err = error.response?.data;

      if (err && typeof err === "object") {
        setErrors({
          fullName: err.full_name,
          email: err.email,
          phone: err.phone,
          address: err.address,
          payment: err.payment_method,
        });

        Object.values(err).forEach((msg) => {
          toast.error(Array.isArray(msg) ? msg[0] : msg);
        });

      } else {
        toast.error("Server error");
      }

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav />

      <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-8">

        
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <div key={item.id || index} className="flex gap-4 border-b pb-4">
                <img
                  src={item.img || ""}
                  alt={item.title || "product"}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.title || "No Title"}</h3>
                  <p>Qty: {item.quantity || 1}</p>
                  <p>₹{item.price || 0}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </div>

        
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phone: "",
            address: "",
            payment: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white p-6 rounded-2xl shadow space-y-3">

              <Field
                name="fullName"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="fullName" component="p" className="text-red-500 text-sm" />

              <Field
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />

              <Field
                name="phone"
                placeholder="Phone"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />

              <Field
                name="address"
                placeholder="Address"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="address" component="p" className="text-red-500 text-sm" />

              
              <div className="space-x-3">
                <label>
                  <Field type="radio" name="payment" value="upi" /> UPI
                </label>
                <label>
                  <Field type="radio" name="payment" value="card" /> Card
                </label>
                <label>
                  <Field type="radio" name="payment" value="cod" /> COD
                </label>
              </div>

              <ErrorMessage name="payment" component="p" className="text-red-500 text-sm" />

              <p className="font-bold">Total: ₹{total}</p>

              <button
                type="submit"
                disabled={isSubmitting || orderItems.length === 0}
                className="bg-green-600 text-white w-full py-2 rounded"
              >
                {isSubmitting ? "Placing Order..." : "Confirm & Pay"}
              </button>

            </Form>
          )}
        </Formik>

      </div>
    </>
  );
};

export default PaymentPage;
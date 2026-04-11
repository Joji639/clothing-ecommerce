import React from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ForgotPassword = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await api.post("user/forgot-password/", values);

      toast.success(res.data.message);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              <div>
                <label className="block mb-1">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default ForgotPassword;
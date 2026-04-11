import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field,ErrorMessage } from "formik";
import api from "../api/axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { uid, token } = useParams(); //uid means encoded id 
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const payload = {
        uid,
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      const res = await api.post("user/reset-password/", payload);

      toast.success(res.data.message);
      navigate("/login");

    } catch (error) {
      const err = error.response?.data;

      
      if (err) {
        Object.values(err).forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error("Reset failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

    <h2 className="text-2xl font-bold text-center mb-6">
      Reset Password
    </h2>

    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">

          
          <div>
            <label className="block mb-1 font-medium">
              New Password
            </label>
            <Field
              type="password"
              name="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          
          <div>
            <label className="block mb-1 font-medium">
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded transition duration-200"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>

        </Form>
      )}
    </Formik>

  </div>
</div>
  );
};

export default ResetPassword;
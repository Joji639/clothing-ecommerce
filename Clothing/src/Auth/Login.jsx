
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/AuthContext";

const FormikValidationForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values, { setErrors }) => {
    try {
      await login(values.email, values.password);

      toast.success(`Welcome ${values.email}`);
      navigate("/");

    } catch (error) {
      const err = error.response?.data;

      if (err) {
        setErrors({
          email: err.email?.[0],
          password: err.password?.[0],
        });

        if (err.non_field_errors) {
          toast.error(err.non_field_errors[0]);
        } else if (err.detail) {
          toast.error(err.detail);
        } else {
          toast.error("Invalid credentials");
        }
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              <div>
                <label>Email</label>
                <Field name="email" type="email" className="w-full p-2 border rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label>Password</label>
                <Field name="password" type="password" className="w-full p-2 border rounded" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-2 w-full rounded"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-sm">
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-blue-500 cursor-pointer"
          >
            Forgot Password?
          </span>
        </p>
      </div>
    </div>
  );
};

export default FormikValidationForm;
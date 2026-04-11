import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authservices/";
import useAuth from "../Context/AuthContext";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    try {
      const { name, email, password, confirmPassword } = values;

      await signup({
        username: name,
        email,
        password,
        confirmPassword,
      });

      await login(email, password);

      toast.success("Signup & Login successful 🎉");
      navigate("/");
      resetForm();

    } catch (error) {
      const err = error.response?.data;

      
      if (err) {
        setErrors({
          email: err.email?.[0],
          confirmPassword: err.confirmPassword?.[0],
          password: err.password?.[0],
          name: err.username?.[0],
        });

        if (err.non_field_errors) {
          toast.error(err.non_field_errors[0]);
        } else if (err.message) {
          toast.error(err.message);
        }
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              <div>
                <label>Name</label>
                <Field name="name" className="w-full p-2 border rounded" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

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

              <div>
                <label>Confirm Password</label>
                <Field name="confirmPassword" type="password" className="w-full p-2 border rounded" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-2 w-full rounded"
              >
                {isSubmitting ? "Creating..." : "Sign Up"}
              </button>

            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-sm">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer ml-1"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
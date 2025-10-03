import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/AuthContext";
const SignUpPage = () => {
  const navigate=useNavigate();
  const{login}=useAuth()
 const validationSchema = Yup.object({
  name: Yup.string()
    .trim("Name must be alphabets") 
    .strict(true) 
    .min(3, "Name must be at least 3 characters")
    .matches(/^[A-Za-z ]+$/, "Name can only contain letters and spaces")    
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .trim("Password cannot include leading/trailing spaces")
    .strict(true)
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?!\s*$).+/, "Password cannot be empty or just spaces")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

  const handleSubmit = async (values, { resetForm }) => {
  try {
    const { confirmPassword, ...userData } = values;
    const UserwithRole={ ...userData, status: "user"}
    const existing = await axios.get("http://localhost:5000/user", {
      params: { email: userData.email },
    });

    if (existing.data.length > 0) {
      toast.error("User already exists!");
      return; 
    }

    const res = await axios.post("http://localhost:5000/user", UserwithRole);
    // console.log("Saved:",res.data);
    toast.success("User saved successfully!");
    login(UserwithRole)
    navigate("/");
    resetForm();
  } catch (error) {
    console.error(error);
    toast.error("Error saving user");
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
            confirmPassword: "",}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              <div>
                <label className="block text-sm font-medium">Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
                </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" 
              >
                Signin
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;

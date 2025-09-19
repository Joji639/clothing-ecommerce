import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const FormikValidationForm   = () => {
  const navigate=useNavigate();
  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Form Submitted:", values);
          toast.success(" form submitted");
          navigate("/")
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border rounded-2xl"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block font-medium">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full p-2 border rounded-2xl"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
              <button
              type="submit"
              disabled={isSubmitting}
              className="w-45  bg-blue-600 text-white py-2  hover:bg-blue-700 rounded-2xl ml-28"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <h2 className='mt-4'>Don't have an account?<Link to="/Signin"><span className='text-red-500 font-semibold'>create one</span></Link>
        </h2>
    </div>
  )
}

export default FormikValidationForm
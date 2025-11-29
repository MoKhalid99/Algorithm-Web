

// Import hooks and libraries
import { useNavigate } from "react-router-dom"; // For navigation after login
import React, { useContext, useState } from "react"; // React core features
import * as yup from "yup"; // For validation
import { useFormik } from "formik"; // For form handling
import axios from "axios"; // For API requests
import { AuthContext } from "../Context/Context"; // Context for authentication

/*

Summary of the code:

Formik + Yup handles form state and validation.

Axios sends login request to backend.

AuthContext stores token globally on login.

Conditional messages for success and errors.

Loading state disables button feedback while waiting for API.

Responsive and styled using Tailwind CSS.

*/

// Login component: allows users to sign in
export default function Login() {
  // State for error, success messages, and loading indicator
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get setToken function from AuthContext to save token on login
  let { setToken } = useContext(AuthContext);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Validation schema for form inputs using Yup
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required"),
      // Optional: can add regex to validate email format
    password: yup
      .string()
      .required("password is required"),
      // Optional: can add regex to enforce password complexity
  });

  // Formik configuration for form control
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // Submit handler for the login form
    onSubmit: async function login(values) {
      // Reset messages and show loading state
      setErrMsg(null);
      setSuccessMsg(null);
      setLoading(true);

      try {
        // Send login request to API
        const responsive = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );

        // Store success message and token
        setSuccessMsg(responsive.data.message);
        setToken(responsive.data.token);
        localStorage.setItem("token", responsive.data.token);

        // Navigate to the main page after 1 second
        setTimeout(() => {
          navigate("/Main");
        }, 1000);
      } catch (err) {
        // Store error message if API fails
        setErrMsg(err?.response?.data?.message);
      } finally {
        // Stop loading indicator
        setLoading(false);
      }
    },

    // Attach validation schema
    validationSchema: validationSchema,
  });

  return (
    <>
      {/* Fullscreen container with background image */}
      <div className="bg-cover bg-center bg-no-repeat bg-(image:--backgrounds-Login) h-screen">
        {/* Center content using flex */}
        <div className="md:flex justify-center items-center mx-auto pt-32 p-5 shadow-lg bg-black/50 h-screen text-white">
          {/* Login form container */}
          <form onSubmit={formik.handleSubmit} className="md:w-[40%]">
            <div className="space-y-6 my-10">
              {/* Heading */}
              <h1 className="text-2xl font-bold mb-6 text-center font-fontPlaywrite">Login In</h1>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  onBlur={formik.handleBlur} // track blur for validation
                  onChange={formik.handleChange} // update formik state
                  className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
                  placeholder="Email Address"
                />
              </div>
              {/* Email validation error */}
              {formik.errors.email && formik.touched.email ? (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">Danger alert! </span>
                  {formik.errors.email}
                </div>
              ) : null}

              {/* Password Input */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
                  placeholder="Your Password"
                />
              </div>
              {/* Password validation error */}
              {formik.errors.password && formik.touched.password ? (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">Danger alert! </span>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            {/* Submit button */}
            <div className="mb-10 text-center">
              <button
                type="submit"
                className="bg-[#5C7BA3] px-8 py-2 cursor-pointer text-lg rounded-full"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>

            {/* API error message */}
            {errMsg ? (
              <div className="p-4 mt-4 text-base text-red-800 rounded-lg bg-red-50">{errMsg}</div>
            ) : null}

            {/* API success message */}
            {successMsg ? (
              <div className="p-4 mt-4 text-base text-green-800 rounded-lg bg-green-50">{successMsg}</div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}

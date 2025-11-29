import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { AuthContext } from "../Context/Context";

export default function Login() {
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  // ✅ Simplified validation schema
  // - Email must be valid format
  // - Password required and length 6-20 characters
  // This is easier for users than complex regex with uppercase, symbols, etc.
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"), // simple email validation
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"), // simplified password validation
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      setErrMsg(null);
      setSuccessMsg(null);
      setLoading(true);

      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );

        setSuccessMsg(response.data.message);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        setTimeout(() => {
          navigate("/Main");
        }, 1000);
      } catch (err) {
        setErrMsg(err?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },

    validationSchema: validationSchema,
  });

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-[image:var(--backgrounds-Login)] h-screen">
      <div className="md:flex justify-center items-center mx-auto pt-32 p-5 shadow-lg bg-black/50 h-screen text-white">
        <form onSubmit={formik.handleSubmit} className="md:w-[40%]">
          <div className="space-y-6 my-10">
            <h1 className="text-2xl font-bold mb-6 text-center font-fontPlaywrite">Login In</h1>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email" // ✅ Added name for Formik
                value={formik.values.email} // ✅ Added value binding
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
                placeholder="Email Address"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Danger alert! </span>
                {formik.errors.email}
              </div>
            )}

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password" // ✅ Added name for Formik
                value={formik.values.password} // ✅ Added value binding
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
                placeholder="Your Password"
              />
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Danger alert! </span>
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mb-10 text-center">
            <button
              type="submit"
              disabled={loading} // ✅ Disable button while loading
              className="bg-[#5C7BA3] px-8 py-2 cursor-pointer text-lg rounded-full disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>

          {/* Error & Success Messages */}
          {errMsg && (
            <div className="p-4 mt-4 text-base text-red-800 rounded-lg bg-red-50">
              {errMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-4 mt-4 text-base text-green-800 rounded-lg bg-green-50">
              {successMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

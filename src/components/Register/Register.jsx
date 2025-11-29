import React, { useState } from "react";
import img from "../../assets/image/Screenshot 2025-11-23 173118.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

/*  

1.Simplified password validation → only minimum 6 characters.

2.Clear placeholders and labels → better UX.

3.Simple and concise error messages.

4.Responsive layout → image only shows on medium screens and above.

5.Loading state for submit button.

*/

export default function Register() {
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // تبسيط الـ validation عشان يسهل على المستخدم
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(3, "Too short"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "At least 6 characters"), // أقل تعقيد من السابق
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setErrMsg(null);
      setSuccessMsg(null);
      setLoading(true);

      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        setSuccessMsg(res.data.message);
        setTimeout(() => navigate("/Login"), 1000);
      } catch (err) {
        setErrMsg(err?.response?.data?.errors?.msg || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-gradient-to-l from-[#3533CC] to-black min-h-screen flex items-center justify-center p-5">
      <div className="md:flex md:w-[90%] bg-white/10 rounded-lg shadow-lg overflow-hidden">
        {/* Left Image */}
        <div className="md:w-1/2 hidden md:block">
          <img src={img} alt="Register" className="w-full h-full object-cover" />
        </div>

        {/* Form Section */}
        <form
          onSubmit={formik.handleSubmit}
          className="md:w-1/2 p-6 flex flex-col justify-center space-y-6 text-white"
        >
          <h1 className="text-2xl font-bold text-center">Create New Account</h1>

          {/* Name Input */}
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="w-full p-3 rounded-full bg-gray-300 text-black placeholder-gray-600 text-center"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-600 text-sm">{formik.errors.name}</p>
          )}

          {/* Email Input */}
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="w-full p-3 rounded-full bg-gray-300 text-black placeholder-gray-600 text-center"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 text-sm">{formik.errors.email}</p>
          )}

          {/* Password Input */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="w-full p-3 rounded-full bg-gray-300 text-black placeholder-gray-600 text-center"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 text-sm">{formik.errors.password}</p>
          )}

          {/* Social Login */}
          <div className="flex flex-col items-center space-y-2">
            <p>Or Register With</p>
            <div className="flex space-x-4">
              <FontAwesomeIcon icon={faFacebook} className="text-2xl cursor-pointer" />
              <FontAwesomeIcon icon={faGoogle} className="text-2xl cursor-pointer" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-bold"
          >
            {loading ? "Loading..." : "Register"}
          </button>

          {/* Messages */}
          {errMsg && <p className="text-red-600 text-center">{errMsg}</p>}
          {successMsg && <p className="text-green-500 text-center">{successMsg}</p>}
        </form>
      </div>
    </div>
  );
}

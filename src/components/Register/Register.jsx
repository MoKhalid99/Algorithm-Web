import React, { useState } from "react";
import img from "../../assets/image/Screenshot 2025-11-23 173118.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function Register() {
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-Za-z]+(?: [A-Za-z]+)?$/, "Name must contain only letters and one optional space")
      .min(3, "Minimum 3 characters")
      .max(30, "Maximum 30 characters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[A-Za-z0-9]+[A-Za-z0-9._-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}$/, "Please enter a valid email address"),
    password: yup
  .string()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters")
  .matches(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must include at least one letter and one number"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "", //adding confirm password field 
    },
    onSubmit: async function (values) {
      setErrMsg(null);
      setSuccessMsg(null);
      setLoading(true);

      try {
        const responsive = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );

        setSuccessMsg(responsive.data.message);
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      } catch (err) {
        setErrMsg(err?.response?.data?.errors?.msg);
        console.log(err?.response?.data?.errors?.msg);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <div className="[background:linear-gradient(to_left,#3533CC,#000003)]">
        <div className="md:w-[90%] md:flex justify-between items-center mx-auto pt-32 p-5 rounded-lg text-white">
          
          <div className="md:w-[50%]">
            <img src={img} alt="Register" />
          </div>

          <form onSubmit={formik.handleSubmit} className="md:w-[40%]">
            <h1 className="text-2xl font-bold my-6 text-center font-fontPlaywrite">
              Create New Account
            </h1>

            <div className="space-y-6 my-10">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
                  placeholder="Your Name"
                />
              </div>
              {formik.errors.name && formik.touched.name && (
                <div className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">Danger alert!</span> {formik.errors.name}
                </div>
              )}

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
                  placeholder="Email Address"
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">Danger alert!</span> {formik.errors.email}
                </div>
              )}

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
              {formik.errors.password && formik.touched.password && (
                <div className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">Danger alert!</span> {formik.errors.password}
                </div>
              )}

              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
                  placeholder="Confirm Password"
                />
              </div>
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <div className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">Danger alert!</span> {formik.errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Submit button and alternative login */}
            <div className="mb-10 text-center">
              <div className="my-4">
                <p>Or Login With</p>
                <div className="text-white my-2 space-x-3">
                  <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                  <FontAwesomeIcon icon={faAt} className="text-xl" />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#5C7BA3] px-8 py-2 cursor-pointer text-lg rounded-full"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>

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
    </>
  );
}

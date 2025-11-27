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
  let { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required"),
      // .matches(
      //   /^[A-Za-z0-9]+[A-Za-z0-9._-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}$/,
      //   "please enter a valid email address"
      // ),
    password: yup
      .string()
      .required("password is required")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      //   "password must be 8-20 characters, include uppercase, lowercase, number, and special symbol"
      // ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async function login(values) {
      setErrMsg(null);
      setSuccessMsg(null);
      setLoading(true);

      try {
        const responsive = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );

        setSuccessMsg(responsive.data.message);
        setToken(responsive.data.token);
        localStorage.setItem("token", responsive.data.token);

        setTimeout(() => {
          navigate("/Main");
        }, 1000);
      } catch (err) {
        setErrMsg(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },

    validationSchema: validationSchema,
  });
  return (
    <>
      <div className="bg-cover bg-center bg-no-repeat bg-(image:--backgrounds-Login) h-screen ">
        <div className=" md:flex justify-center items-center mx-auto pt-32 p-5  shadow-lg bg-black/50 h-screen text-white ">
          <form onSubmit={formik.handleSubmit} className="md:w-[40%]" action="">
            <div className="space-y-6 my-10 ">
              <h1 className="text-2xl font-bold mb-6 text-center font-fontPlaywrite">Login In</h1>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600 "
                  placeholder="Email Address"
                />
              </div>
              {formik.errors.email && formik.touched.email ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
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
                  className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600 "
                  placeholder="Your Password"
                />
              </div>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                <span className="font-medium">Danger alert! </span>
                {formik.errors.password}
              </div>
            ) : null}

            <div className="mb-10 text-center">
              <button
                type="submit"
                className="bg-[#5C7BA3] px-8 py-2 cursor-pointer  text-lg rounded-full"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>

            {errMsg ? (
              <div className="p-4 mt-4 text-base text-red-800 rounded-lg bg-red-50 ">
                {errMsg}
              </div>
            ) : null}
            {successMsg ? (
              <div className="p-4 mt-4 text-base text-green-800 rounded-lg bg-green-50 ">
                {successMsg}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}

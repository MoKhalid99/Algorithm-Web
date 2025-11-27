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
  // لتخزين رسالة error , success من ال API
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // لتخزين loading أثناء انتظار استجابة ال API
  const [loading, setLoading] = useState(false);

  // useNavigate hook to navigate to another page
  const navigate = useNavigate();

  // validation by library yup بحيث ان مخليش ال user يدخل بيانات غير صحيحة
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("name is required")
      .matches(
        /^[A-Za-z]+(?: [A-Za-z]+)?$/,
        "name must contain only letters and one optional space"
      )
      .min(3, "min 3 characters")
      .max(30, "max 20 characters"),
    email: yup
      .string()
      .required("email is required")
      .matches(
        /^[A-Za-z0-9]+[A-Za-z0-9._-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}$/,
        "please enter a valid email address"
      ),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "password must be 8-20 characters, include uppercase, lowercase, number, and special symbol"
      ),
  });

  // control the form using useFormik hook (library formik)
  const formik = useFormik({
    // تحديد القيم الابتدائية فى ال input
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    // function بتخزن قيم values و بتفضى error message , success message
    onSubmit: async function (values) {
      setErrMsg(null);
      setSuccessMsg(null);
      setLoading(true);

      // call Api by axios library and send values
      try {
        const responsive = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        // بيخزن رسالة النجاح
        setSuccessMsg(responsive.data.message);
        // بروح لصفحة اللوجنن لو call api تم بنجاح
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      } catch (err) {
        // لو حصل خطا فى تنفيذ api الجزء دا بيشتغل بيخزن رسالة الخطا
        setErrMsg(err?.response?.data?.errors?.msg);
        console.log(err?.response?.data?.errors?.msg);
      } finally {
        setLoading(false);
      }
    },
    // بباصى ال validation لل formik
    validationSchema: validationSchema,
  });
  return (
    <>
      <div className="[background:linear-gradient(to_left,#3533CC,#000003)]">
        <div className="md:w-[90%] md:flex justify-between items-center mx-auto pt-32 p-5 rounded-lg  text-white ">
          <div className="md:w-[50%]">
            <img src={img} alt="Register" />
          </div>

          <form onSubmit={formik.handleSubmit} className="md:w-[40%]">
            <h1 className="text-2xl font-bold my-6 text-center font-fontPlaywrite">
              Create New Account
            </h1>
            <div className="space-y-6 my-10 ">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600 "
                  placeholder="Your Name"
                />
              </div>
              {formik.errors.name && formik.touched.name ? (
                <div
                  className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">Danger alert!</span>{" "}
                  {formik.errors.name}
                </div>
              ) : null}

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
                  className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">Danger alert!</span>{" "}
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
              {formik.errors.password && formik.touched.password ? (
                <div
                  className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">Danger alert!</span>{" "}
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

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
                className="bg-[#5C7BA3] px-8 py-2 cursor-pointer  text-lg rounded-full"
              >
                {loading ? "Loading..." : "submit"}
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

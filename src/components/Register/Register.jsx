import React, { useState } from "react";
import img from "../../assets/image/Screenshot 2025-11-23 173118.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { useFormik } from "formik";

export default function Register() {
  const [successMsg, setSuccessMsg] = useState(null);

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
      .matches(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, "Password must include at least one letter and one number"),
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
      confirmPassword: "",
    },
    onSubmit: function (values) {
      // فقط عرض رسالة نجاح على الـ frontend
      setSuccessMsg("Form submitted successfully!");
      console.log("Form values:", values);
    },
    validationSchema: validationSchema,
  });

  return (
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
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50">{formik.errors.name}</div>
            )}

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50">{formik.errors.email}</div>
            )}

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50">{formik.errors.password}</div>
            )}

            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-full bg-gray-300 text-black font-bold text-center border border-gray-600"
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div className="p-4 mb-4 text-base text-red-800 rounded-lg bg-red-50">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <div className="mb-10 text-center">
            <p>Or Login With</p>
            <div className="text-white my-2 space-x-3">
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
              <FontAwesomeIcon icon={faAt} className="text-xl" />
            </div>
            <button
              type="submit"
              className="bg-[#5C7BA3] px-8 py-2 cursor-pointer text-lg rounded-full"
            >
              Submit
            </button>
          </div>

          {successMsg && <div className="p-4 mt-4 text-base text-green-800 rounded-lg bg-green-50">{successMsg}</div>}
        </form>
      </div>
    </div>
  );
}

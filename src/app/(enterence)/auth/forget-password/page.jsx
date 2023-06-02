"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import LinkSended from "../components/LinkSended";
import Link from "next/link";

export default function page() {
  const [isLinkSended, setIsLinkSended] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      // handle form submission here
      setIsLinkSended(true);
    },
  });

  return isLinkSended ? (
    <LinkSended
      type={"Reset Link sended"}
      message={
        "We have sended you a password reset link, please check your gmail"
      }
    />
  ) : (
    <div className="max-w-xs bg-white p-10 rounded-md mx-auto mt-20">
      <div className="">
        <h1 className="text-base text-gray-600 font-bold">
          Did you forgot your password?
        </h1>
        <p className="text-sm text-gray-500 ">Please enter your email below</p>
      </div>
      <form className="mt-5 flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="yourmai@gmail.com"
            className="mt-1 w-full p-2 border-2 rounded-md border-gray-500 focus:border-primary-focus outline-none bg-white text-sm text-gray-700 shadow-sm"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-xs text-red-500">{formik.errors.email}</p>
          ) : null}
        </div>
        <button
          className="outline-none border-none border-2 border-transparent text-sm bg-primary text-white py-2 rounded-md active:scale-90 disabled:opacity-60 transition-all"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Request password reset
        </button>
        <div className="text-gray-500 flex items-center justify-start text-xs gap-2">
          <p>Have Password?</p>{" "}
          <Link
            href={"/auth/login"}
            className="hover:text-primary-focus hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

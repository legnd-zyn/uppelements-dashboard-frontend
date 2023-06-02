"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import iconElemenet from "../images/iconelement.png";
import Image from "next/image";

import Link from "next/link";
import {
  AiOutlineExclamationCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import LinkSended from "../components/LinkSended";
import fetchInstanceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";

const Form = () => {
  const [isOtpSended, setIsOtpSended] = useState(false);
  const [responseStatusCode, setResponseStatusCode] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm password"),
      terms: Yup.boolean()
        .oneOf([true], "Please accept terms and conditions")
        .required("Please read terms first"),
    }),
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    const { username, email, password, fullname } = values;

    setResponseStatusCode(null);

    const obj = { fullname, username, email, password };
    console.log(obj);
    const res = await fetchInstanceClientSide("/auth/signup", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.status === 200) {
      setResponseStatusCode(res.status);
      return;
    }
    if (res.status === 409) {
      setResponseStatusCode(res.status);
      return;
    }

    if (!res.ok) {
      setResponseStatusCode(500);
      setTimeout(() => {
        setResponseStatusCode(null);
      }, 3000);
      return;
    }
  }

  return responseStatusCode === 200 ? (
    <LinkSended
      type={"Verify your account"}
      message={"We have sended you verification link, please check your gmail."}
    />
  ) : (
    <section className="bg-white rounded-md overflow-hidden">
      <div className="lg:grid lg:min-h-16 lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1518724720933-d73c1fea476e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <Image src={iconElemenet} />
            </a>

            {/* <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Squid 🦑
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p> */}
          </div>
        </section>

        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 relative"
        >
          {responseStatusCode === 500 && (
            <div className="absolute inset-0 flex justify-center flex-col items-center bg-white">
              <div className="flex flex-col justify-center items-center text-xl text-red-500">
                <AiOutlineExclamationCircle
                  size={"3rem"}
                  color="currentColor"
                />
                <p>Oops!</p>
                <p className="text-xs mt-5">
                  something wen&apos;t wrong, please retry
                </p>
              </div>
            </div>
          )}

          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm sm:h-20 sm:w-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <Image src={iconElemenet} className="p-2" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to UppElements 🦑
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Fill out our signup form below to get started!
              </p>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                  className="mt-1 p-2 border-b-2 border-gray-500 focus:border-b-primary-focus w-full outline-none bg-white text-sm text-gray-700 shadow-sm"
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.fullname}
                  </p>
                ) : null}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  className="mt-1 p-2 border-b-2 border-gray-500 focus:border-b-primary-focus w-full outline-none bg-white text-sm text-gray-700 shadow-sm"
                  id="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.username}
                  </p>
                ) : null}
              </div>

              <div className="col-span-6">
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
                  className={`mt-1 w-full p-2 border-b-2 border-gray-500 focus:border-b-primary-focus outline-none bg-white text-sm text-gray-700 shadow-sm ${
                    responseStatusCode === 409 ? "border-red-500" : ""
                  }`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-xs mt-0.5 text-red-500">
                    {formik.errors.email}
                  </p>
                ) : null}

                {responseStatusCode === 409 && (
                  <p className="text-xs text-red-500 mt-1">
                    Account already exists with this gmail
                  </p>
                )}
              </div>

              <PasswordField formik={formik} />

              <ConfirmPasswordField formik={formik} />

              <div className="col-span-6">
                <label htmlFor="terms" className="flex gap-4">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.terms}
                    className="checkbox h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I agree to the terms and policies
                  </span>
                </label>
                {formik.touched.terms && formik.errors.terms ? (
                  <p className="text-xs text-red-500">{formik.errors.terms}</p>
                ) : null}
              </div>

              {/* <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    terms and conditions
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div> */}

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="inline-block shrink-0 rounded-md border border-primary bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primary-focus outline-none active:text-primary-focus active:scale-90 disabled:opacity-60"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Have account?
                  <Link href="/auth/login" className="text-gray-700 underline">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

function PasswordField({ formik }) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>

      <div className="flex justify-center items-center border-b-2 border-gray-500 focus:border-b-primary-focus overflow-hidden">
        <input
          id="password"
          name="password"
          type={isShown ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 p-2  w-full outline-none bg-white text-sm text-gray-700 shadow-sm"
        />
        <button
          className="px-2.5 h-full py-2.5"
          onClick={() => setIsShown((prev) => !prev)}
        >
          {isShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      {formik.touched.password && formik.errors.password ? (
        <p className="text-xs text-red-500">{formik.errors.password}</p>
      ) : null}
    </div>
  );
}
function ConfirmPasswordField({ formik }) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="confirmPassword"
        className="block text-sm font-medium text-gray-700"
      >
        Confirm Password
      </label>

      <div className="flex justify-center items-center border-b-2 border-gray-500 focus:border-b-primary-focus">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={isShown ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className="mt-1 p-2  w-full outline-none bg-white text-sm text-gray-700 shadow-sm"
        />
        <button
          className="px-2.5 h-full py-2.5"
          onClick={() => setIsShown((prev) => !prev)}
        >
          {isShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <p className="text-xs text-red-500">{formik.errors.confirmPassword}</p>
      ) : null}
    </div>
  );
}

export default Form;

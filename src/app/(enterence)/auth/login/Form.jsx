"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import iconElemenet from "../images/iconelement.png";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { CgLock } from "react-icons/cg";
// import axiosInstaceClientSide from "@/lib/axios/axiosInstanceClientSide";
import { setTokenCookie } from "@/utils/setTokenInCookie";
import fetchInstanceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";
import { useRouter } from "next/navigation";
import { useRole } from "@/app/Context/ContextProvider";

export default function FormLayout() {
  return (
    <section className="bg-white rounded-md overflow-hidden">
      <div className="flex flex-col-reverse lg:grid lg:min-h-16 lg:grid-cols-12">
        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="w-full">
            <div className="relative -mt-16 block lg:hidden  z-10">
              <Link
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm sm:h-20 sm:w-20"
                href="/"
              >
                <span className="sr-only rounded-full bg-white">Home</span>
                <Image src={iconElemenet} className="p-2" />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to UppElements 🦑
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Fill out our signup form below to get started!
              </p>
            </div>

            <Form />
          </div>
        </main>
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
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
      </div>
    </section>
  );
}

export function Form() {
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: handleSubmit,
  });

  const { fetchRole } = useRole();

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const res = await fetchInstanceClientSide(`/auth/login`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      const resData = await res.json();
      setTokenCookie(resData?.token);
      console.log(res?.status, res?.status === 200);
      if (res?.status === 200) {
        await fetchRole();
        Router.push("/dashboard");
      }
      if (!res.ok) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Err ", error);
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className=" mt-8 grid grid-cols-1 gap-6 "
    >
      <div className="space-y-2 group">
        <label
          htmlFor="email"
          className="block text-base  text-gray-500 font-bold"
        >
          Email
        </label>

        <div className="flex justify-center items-center border-2 rounded-lg border-gray-500 group-focus:border-b-primary-focus overflow-hidden">
          <span className=" text-primary px-2 border-r-[1px] border-gray-300">
            <AiOutlineUser fill="current-color" size={"1rem"} />
          </span>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className=" w-full p-2  outline-none bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p className="text-xs text-red-500">{formik.errors.email}</p>
        ) : null}
      </div>

      <PasswordField formik={formik} />

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

      <div className="sm:flex mt-4  sm:flex-col sm:gap-4">
        <button
          className="text-xs shrink-0 rounded-md border border-primary bg-primary px-4 py-2 mt-5 md:mt-0 md:px-12 md:py-3 md:text-sm font-medium text-white transition hover:bg-transparent hover:text-primary-focus outline-none active:text-primary-focus active:scale-90 disabled:opacity-70 flex justify-center items-center"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Login
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Don&apos;t have an account?
          <Link href="/auth/signup" className="text-gray-700 underline">
            Signup
          </Link>
          .
        </p>
        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          <Link
            href="/auth/forget-password"
            className="text-gray-700 underline"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
      <div className=" sm:flex  sm:flex-col sm:gap-4"></div>
    </form>
  );
}

function PasswordField({ formik }) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="space-y-2">
      <label
        htmlFor="password"
        className="block text-base font-bold text-gray-500"
      >
        Password
      </label>

      <div className=" border-2 rounded-lg overflow-hidden border-gray-500 focus:border-b-primary-focus flex justify-center items-center">
        <span className=" px-2 border-r-[1px] border-gray-300">
          <CgLock fill="current-color" size={"1rem"} />
        </span>
        <input
          id="password"
          name="password"
          type={isShown ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className=" p-2 w-full outline-none bg-white text-sm text-gray-700 shadow-sm"
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

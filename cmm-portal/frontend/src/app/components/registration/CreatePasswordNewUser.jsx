"use client";

import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BarLoader } from "react-spinners";
import { GlobalContext } from "@/app/context/user";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa6";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

const CreatePasswordNewUser = ({ authToken }) => {
  const { setLoading, loading } = useContext(GlobalContext);
  const [seePassword, setseePassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/createPasswordForNewUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: values.password,
              token: authToken,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          toast.success(data.message);
          router.push("/login");
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }, 2000);
  };

  return (
    <div className="bg-[#f8fcc2]">
      <main className="max-w-[1400px] mx-auto min-h-screen">
        <Image
          src="https://cdn.dribbble.com/users/1265653/screenshots/17449203/media/be0454b44daef56979b92f547d0f8358.gif"
          alt="logo"
          width={1066}
          height={800}
          className="object-contain h-60 mx-auto"
        />
        <div
          className={`w-full mx-auto shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white rounded-md max-w-xl pt-0.5 ${
            loading && "pointer-events-none opacity-90"
          }`}
        >
          {loading && <BarLoader color="#aa76f5" height={5} width="100%" />}
          <div className="p-6">
            <p className="bg-gray-200 p-4 rounded-full h-20 w-20 mx-auto flex items-center justify-center">
              <FaLock className="text-gray-900 h-8 w-8" />
            </p>
            <h1 className="text-black font-bold uppercase text-center my-4 text-xl">
              Create New Password
            </h1>
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .min(8, "Password must be at least 8 characters")
                  .required("Password is required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm password is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                handleSubmit(values);
              }}
            >
              {({ errors }) => (
                <Form>
                  <div className="">
                    <label
                      className={errors.password ? "error-label" : "label"}
                      htmlFor="password"
                    >
                      Password <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative mb-3">
                      <Field
                        type={seePassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className={errors.password ? "error-input" : "input"}
                      />
                      <span
                        onClick={() => setseePassword(!seePassword)}
                        className="absolute text-black grid place-items-center top-3.5 right-5 cursor-pointer text-lg"
                      >
                        {seePassword ? <IoMdEyeOff /> : <IoMdEye />}
                      </span>

                      {errors.password && (
                        <p className="error-message">* {errors.password}</p>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <label
                      className={
                        errors.confirmPassword ? "error-label" : "label"
                      }
                      htmlFor="confirmPassword"
                    >
                      Confirm password{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className={
                        errors.confirmPassword ? "error-input" : "input"
                      }
                    />
                    {errors.confirmPassword && (
                      <p className="error-message">
                        * {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <button
                    className="mt-8 mb-6 text-white text-center w-full text-sm font-semibold py-3 bg-[#aa76f5] rounded-md text-500"
                    type="submit"
                  >
                    {loading ? "Checking..." : "Create Password"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePasswordNewUser;

"use client";

import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { GlobalContext } from "@/app/context/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SchoolId = () => {
  const { setLoading, loading } = useContext(GlobalContext);
  const router = useRouter();
  const initialValues = {
    schoolId: "",
  };

  const validationSchema = () => {
    return Yup.object().shape({
      schoolId: Yup.string().required("School ID is required"),
    });
  };

  const onSubmit = async (values) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/school/checkSchool",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: values.schoolId,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          router.push(`/registration/school/${data.id}`);
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    }, 2000);
  };

  return (
    <main className="background-container bg-gray-200">
      <section className="max-w-[1400px] mx-auto pt-24 h-screen min-h-screen">
        <div className="bg-white rounded-md px-10 py-14 space-y-8 w-3/4 mx-auto h-5/6">
          <Image
            src="https://cdn.dribbble.com/users/269837/screenshots/19056965/media/fde6d751bc9490433b42c27cb6098363.png"
            alt="logo"
            width={300}
            height={300}
            className="mx-auto rounded-full h-44 w-44 object-cover"
          />
          <h1 className="text-3xl text-gray-600 tracking-wider text-center mb-10">
            Please enter school ID provided by your school.
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={() => validationSchema()}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <div className="flex flex-col space-y-4">
                  <div class="relative">
                    <Field
                      type="text"
                      name="schoolId"
                      id="schoolId"
                      class="block p-5 text-lg font-semibold w-full text-gray-900 bg-transparent rounded-lg border-2 border-blue-500 appearance-none focus:outline-none focus:ring-2 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      for="schoolId"
                      class="absolute text-lg text-gray-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-5 peer-focus:px-5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      School ID
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md py-3 font-semibold text-lg hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-opacity"
                    disabled={isSubmitting || loading}
                  >
                    {loading ? "Verifying..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default SchoolId;

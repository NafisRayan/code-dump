"use client";

import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import StudentForm from "./StudentForm";
import ParentForm from "./ParentForm";
import EducationForm from "./EductionForm";
import { convertToDesiredJsonFormat, validationSchema } from "./contants";
import { toast } from "react-toastify";
import { GlobalContext } from "@/app/context/user";
import { PulseLoader } from "react-spinners";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import SuccessRegistration from "./SuccessRegistration";
import ChooseUser from "./ChooseUser";
import NewParent from "./NewParent";
import { FaAngleLeft } from "react-icons/fa6";

const RegistrationPage = ({ schoolID }) => {
  const { setLoading, loading } = useContext(GlobalContext);
  const [success, setSuccess] = useState(null);
  const [choose, setChoose] = useState(null);
  const [studentWithRegisteredParent, setStudentWithRegisteredParent] =
    useState(false);
  const [parentWithRegisteredStudent, setParentWithRegisteredStudent] =
    useState(false);

  const initialValues = {
    studentFirstName: "",
    studentLastName: "",
    studentGender: "",
    schoolID: schoolID,
    studentDateOfBirth: "",
    studentEmail: "",
    studentPhone: "",
    studentState: "",
    studentCity: "",
    studentZipCode: "",
    studentEmergencyContactNumber: "",

    parentFirstName: "",
    parentLastName: "",
    parentGender: "",
    parentEmail: "",
    parentPhone: "",
    parentState: "",
    parentCity: "",
    parentZipCode: "",
    parentEmergencyContactNumber: "",

    highSchoolName: "",
    grade: "",
    unweightedGPA: "",
    graduationYear: "",
    previousTestScores: { testName: "", score: "" },
    topUniversitiesDesired: "",
    possibleMajor: "",
  };

  const fetchUrl = studentWithRegisteredParent
    ? "new-student-existing-parent"
    : parentWithRegisteredStudent
    ? "new-parent-existing-student"
    : "new-student-new-parent";

  const onSubmit = async (values) => {
    const formatedData = convertToDesiredJsonFormat(
      values,
      studentWithRegisteredParent,
      parentWithRegisteredStudent
    );

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/registration/register/" + fetchUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formatedData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        if (parentWithRegisteredStudent) {
          setSuccess(data.newParent);
        } else {
          setSuccess(data.newStudent);
        }
        toast.success(data.message);
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      {!choose ? (
        <ChooseUser setChoose={setChoose} />
      ) : success ? (
        <SuccessRegistration
          user={success}
          setSuccess={setSuccess}
          setChoose={setChoose}
          setStudentWithRegisteredParent={setStudentWithRegisteredParent}
          setParentWithRegisteredStudent={setParentWithRegisteredStudent}
        />
      ) : (
        <main className="max-w-[1400px] mx-auto pt-24 min-h-screen">
          <div className="py-6">
            <button
              onClick={() => {
                setChoose(null);
                setSuccess(null);
                setStudentWithRegisteredParent(false);
                setParentWithRegisteredStudent(false);
              }}
              className="flex gap-3  font-semibold px-4 py-2 rounded-md bg-white hover:bg-white/75 hover:scale-105 transition duration-300 ease-in-out"
            >
              <FaAngleLeft className="my-auto" /> back
            </button>
          </div>
          <div className="px-6 py-4 bg-white rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Registration Form</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={() =>
                validationSchema(
                  studentWithRegisteredParent,
                  parentWithRegisteredStudent
                )
              }
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  {choose === 1 ? (
                    <div className="space-y-4">
                      {/* Student Information */}
                      <div className="border-2 border-gray-200 p-6 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">
                          Student Information
                        </h3>
                        <StudentForm
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          errors={errors}
                        />
                      </div>

                      {/* Education Information */}
                      <div className="border-2 border-gray-200 p-6 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">
                          Education Information
                        </h3>
                        <EducationForm
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          errors={errors}
                        />
                      </div>

                      {/* Parent Information */}
                      <div className="border-2 border-gray-200 p-6 rounded-md">
                        <h3 className="text-lg items-center font-semibold mb-2 w-1/2 flex justify-between">
                          Parent Information
                          <button
                            type="button"
                            onClick={() =>
                              setStudentWithRegisteredParent(
                                !studentWithRegisteredParent
                              )
                            }
                            className="my-auto px-6 py-2 text-sm font-semibold rounded-md bg-red-500 text-white hover:bg-red-600"
                          >
                            {studentWithRegisteredParent
                              ? "New Parent"
                              : "Already registered parent?"}
                          </button>
                        </h3>
                        {!studentWithRegisteredParent ? (
                          <ParentForm
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            errors={errors}
                          />
                        ) : (
                          <div className="w-1/2">
                            <label
                              className={
                                errors.registeredParentEmail
                                  ? "error-label"
                                  : "label"
                              }
                              htmlFor="registeredParentEmail"
                            >
                              Registered email{" "}
                              <span className="text-red-500 font-bold">*</span>
                            </label>
                            <Field
                              type="text"
                              name="registeredParentEmail"
                              placeholder="Please enter registered email"
                              className={
                                errors.registeredParentEmail
                                  ? "error-input"
                                  : "input"
                              }
                            />
                            {errors.registeredParentEmail && (
                              <div className="error-message">
                                * {errors.registeredParentEmail}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Parent Information */}
                      <div className="border-2 border-gray-200 p-6 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">
                          Parent Information
                        </h3>
                        <ParentForm
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          errors={errors}
                        />
                      </div>

                      {/* Student Information */}
                      <div className="border-2 border-gray-200 space-y-6 p-6 rounded-md">
                        <h3 className="text-lg items-center font-semibold mb-2 w-1/2 flex justify-between">
                          Student Information
                          <button
                            type="button"
                            onClick={() =>
                              setParentWithRegisteredStudent(
                                !parentWithRegisteredStudent
                              )
                            }
                            className="my-auto px-6 py-2 text-sm font-semibold rounded-md bg-red-500 text-white hover:bg-red-600"
                          >
                            {parentWithRegisteredStudent
                              ? "New Student"
                              : "Already registered student?"}
                          </button>
                        </h3>
                        {parentWithRegisteredStudent ? (
                          <div className="w-1/2">
                            <label
                              className={
                                errors.registeredStudentEmail
                                  ? "error-label"
                                  : "label"
                              }
                              htmlFor="registeredParentEmail"
                            >
                              Registered email{" "}
                              <span className="text-red-500 font-bold">*</span>
                            </label>
                            <Field
                              type="text"
                              name="registeredStudentEmail"
                              placeholder="Please enter registered email"
                              className={
                                errors.registeredStudentEmail
                                  ? "error-input"
                                  : "input"
                              }
                            />
                            {errors.registeredStudentEmail && (
                              <div className="error-message">
                                * {errors.registeredStudentEmail}
                              </div>
                            )}
                          </div>
                        ) : (
                          <StudentForm
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            errors={errors}
                          />
                        )}
                      </div>

                      {/* Education Information */}
                      {!parentWithRegisteredStudent && (
                        <div className="border-2 border-gray-200 p-6 rounded-md">
                          <h3 className="text-lg font-semibold mb-2">
                            Education Information
                          </h3>
                          <EducationForm
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            errors={errors}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn bg-blue-500 min-w-32 text-sm font-semibold text-white py-2 px-4 rounded-md"
                    disabled={loading}
                  >
                    {loading ? <PulseLoader color="#ffffff" /> : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </main>
      )}
    </div>
  );
};

export default RegistrationPage;

// StudentForm.js
import React from "react";
import { Form, Field } from "formik";

const StudentForm = ({ initialValues, validationSchema, errors }) => {
  return (
    <>
      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label
            className={errors.studentFirstName ? "error-label" : "label"}
            htmlFor="studentFirstName"
          >
            First name <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="studentFirstName"
            placeholder="First Name"
            className={errors.studentFirstName ? "error-input" : "input"}
          />
          {errors.studentFirstName && (
            <p className="error-message">* {errors.studentFirstName}</p>
          )}
        </div>
        <div className="w-1/2">
          <label
            className={errors.studentLastName ? "error-label" : "label"}
            htmlFor="studentLastName"
          >
            Last name <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="studentLastName"
            placeholder="Last Name"
            className={errors.studentLastName ? "error-input" : "input"}
          />
          {errors.studentLastName && (
            <p className="error-message">* {errors.studentLastName}</p>
          )}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div role="group" aria-labelledby="my-radio-group" className="w-1/2">
          <label
            className={errors.studentGender ? "error-label" : "label"}
            htmlFor="studentGender"
          >
            Gender <span className="text-red-500 font-bold">*</span>
          </label>
          <div className="flex gap-4">
            <div className="flex items-center mb-4">
              <Field
                type="radio"
                name="studentGender"
                value="Male"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              <label
                htmlFor="studentGender"
                className="block ms-2  text-sm font-medium text-gray-900"
              >
                Male
              </label>
            </div>
            <div className="flex items-center mb-4">
              <Field
                type="radio"
                name="studentGender"
                value="Female"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              <label
                htmlFor="studentGender"
                className="block ms-2  text-sm font-medium text-gray-900"
              >
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <label
            htmlFor="studentDateOfBirth"
            className={errors.studentDateOfBirth ? "error-label" : "label"}
          >
            Date of Birth <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="date"
            name="studentDateOfBirth"
            placeholder="Date of Birth"
            className={errors.studentDateOfBirth ? "error-input" : "input"}
          />
          {errors.studentDateOfBirth && (
            <p className="error-message">* {errors.studentDateOfBirth}</p>
          )}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label
            htmlFor="studentEmail"
            className={errors.studentEmail ? "error-label" : "label"}
          >
            {" "}
            Email <span className="text-red-500 font-bold">*</span>{" "}
          </label>
          <Field
            type="email"
            name="studentEmail"
            placeholder="Email"
            className={errors.studentEmail ? "error-input" : "input"}
          />
          {errors.studentEmail && (
            <p className="error-message">* {errors.studentEmail}</p>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="studentPhone"
            className={errors.studentPhone ? "error-label" : "label"}
          >
            Phone <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="studentPhone"
            placeholder="Phone"
            className={errors.studentPhone ? "error-input" : "input"}
          />
          {errors.studentPhone && (
            <p className="error-message">* {errors.studentPhone}</p>
          )}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label
            htmlFor="studentAddress"
            className={errors.studentAddress ? "error-label" : "label"}
          >
            State <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="studentState"
            placeholder="State"
            className={errors.studentState ? "error-input" : "input"}
          />
          {errors.studentState && (
            <p className="error-message">* {errors.studentState}</p>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="studentCity"
            className={errors.studentCity ? "error-label" : "label"}
          >
            City <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="studentCity"
            placeholder="City"
            className={errors.studentCity ? "error-input" : "input"}
          />
          {errors.studentCity && (
            <p className="error-message">* {errors.studentCity}</p>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="studentZipCode"
            className={errors.studentZipCode ? "error-label" : "label"}
          >
            Zip Code <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="studentZipCode"
            placeholder="Zip Code"
            className={errors.studentZipCode ? "error-input" : "input"}
          />
          {errors.studentZipCode && (
            <p className="error-message">* {errors.studentZipCode}</p>
          )}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label
            htmlFor="studentEmergencyContactNumber"
            className={
              errors.studentEmergencyContactNumber ? "error-label" : "label"
            }
          >
            Emergency Contact Number{" "}
            <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="studentEmergencyContactNumber"
            placeholder="Emergency Contact Number"
            className={
              errors.studentEmergencyContactNumber ? "error-input" : "input"
            }
          />
          {errors.studentEmergencyContactNumber && (
            <p className="error-message">
              * {errors.studentEmergencyContactNumber}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentForm;

import React from "react";
import { Form, Field } from "formik";

const ParentForm = ({ initialValues, validationSchema, errors }) => {
  return (
    <>
      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label
            className={errors.parentFirstName ? "error-label" : "label"}
            htmlFor="parentFirstName"
          >
            First Name <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="parentFirstName"
            placeholder="First Name"
            className={errors.parentFirstName ? "error-input" : "input"}
          />
          {errors.parentFirstName && (
            <div className="error-message">* {errors.parentFirstName}</div>
          )}
        </div>
        <div className="w-1/2">
          <label
            className={errors.parentLastName ? "error-label" : "label"}
            htmlFor="parentLastName"
          >
            Last Name <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="parentLastName"
            placeholder="Last Name"
            className={errors.parentLastName ? "error-input" : "input"}
          />
          {errors.parentLastName && (
            <div className="error-message">* {errors.parentLastName}</div>
          )}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label
            className={errors.parentGender ? "error-label" : "label"}
            htmlFor="parentGender"
          >
            Gender <span className="text-red-500 font-bold">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label htmlFor="parentGenderMale" className="flex items-center">
              <Field
                type="radio"
                name="parentGender"
                value="Male"
                id="parentGenderMale"
                className="mr-2"
              />
              Male
            </label>
            <label htmlFor="parentGenderFemale" className="flex items-center">
              <Field
                type="radio"
                name="parentGender"
                value="Female"
                id="parentGenderFemale"
                className="mr-2"
              />
              Female
            </label>
          </div>
          {errors.parentGender && (
            <div className="error-message">* {errors.parentGender}</div>
          )}
        </div>
        <div className="w-1/2">
          <label
            className={errors.parentEmail ? "error-label" : "label"}
            htmlFor="parentEmail"
          >
            Email <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="email"
            name="parentEmail"
            placeholder="Email"
            className={errors.parentEmail ? "error-input" : "input"}
          />
          {errors.parentEmail && (
            <div className="error-message">* {errors.parentEmail}</div>
          )}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label
            className={errors.parentPhone ? "error-label" : "label"}
            htmlFor="parentPhone"
          >
            Phone <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="parentPhone"
            placeholder="Phone"
            className={errors.parentPhone ? "error-input" : "input"}
          />
          {errors.parentPhone && (
            <div className="error-message">* {errors.parentPhone}</div>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="parentEmergencyContactNumber"
            className={
              errors.parentEmergencyContactNumber ? "error-label" : "label"
            }
          >
            Emergency Contact Number{" "}
            <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="parentEmergencyContactNumber"
            placeholder="Emergency Contact Number"
            className={
              errors.parentEmergencyContactNumber ? "error-input" : "input"
            }
          />
          {errors.parentEmergencyContactNumber && (
            <div className="error-message">
              * {errors.parentEmergencyContactNumber}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label
            className={errors.parentState ? "error-label" : "label"}
            htmlFor="parentState"
          >
            State <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="parentState"
            placeholder="State"
            className={errors.parentState ? "error-input" : "input"}
          />
          {errors.parentState && (
            <div className="error-message">* {errors.parentState}</div>
          )}
        </div>
        <div className="w-1/2">
          <label
            className={errors.parentCity ? "error-label" : "label"}
            htmlFor="parentCity"
          >
            City <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="parentCity"
            placeholder="City"
            className={errors.parentCity ? "error-input" : "input"}
          />
          {errors.parentCity && (
            <div className="error-message">* {errors.parentCity}</div>
          )}
        </div>
        <div className="w-1/2">
          <label
            className={errors.parentZipCode ? "error-label" : "label"}
            htmlFor="parentZipCode"
          >
            Zip Code <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="parentZipCode"
            placeholder="Zip Code"
            className={errors.parentZipCode ? "error-input" : "input"}
          />
          {errors.parentZipCode && (
            <div className="error-message">* {errors.parentZipCode}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ParentForm;

import React, { useState } from "react";
import StudentForm from "./StudentForm";
import { Field, FieldArray } from "formik";

const NewParent = ({ initialValues, validationSchema, errors }) => {
  const [registeredStudents, setRegisteredStudents] = useState([]);

  console.log(initialValues)

  return (
    <div className="space-y-4">
      <div className="border-2 rounded-md border-gray-200 border-dashed">
        <h4 className="text-base font-bold p-4 border-b-2 border-gray-200 border-dashed text-blue-600">
          Already Registered Student -{" "}
        </h4>
        <div className="p-4">
          <div className="w-1/2">
            <label
              className={
                errors.registeredStudentEmail ? "error-label" : "label"
              }
              htmlFor="registeredParentEmail"
            >
              Registered email <span className="text-red-500 font-bold">*</span>
            </label>
            <Field
              type="text"
              name="registeredStudentEmail"
              placeholder="Please enter registered email"
              className={
                errors.registeredStudentEmail ? "error-input" : "input"
              }
            />
            {errors.registeredStudentEmail && (
              <div className="error-message">
                * {errors.registeredStudentEmail}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-2 rounded-md border-gray-200 border-dashed text-blue-600">
        <h4 className="text-base font-bold p-4 border-b-2 border-gray-200 border-dashed">
          Add another new Student -
          <span className="text-sm text-gray-500 italic">Optional</span>
        </h4>
        <div className="p-4">
          <StudentForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default NewParent;

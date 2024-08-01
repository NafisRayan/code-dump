import React from "react";
import { Form, Field } from "formik";

const EducationForm = ({ initialValues, validationSchema, errors }) => {
  return (
    <>
      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label htmlFor="highSchoolName" className="label">
            High School Name <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="highSchoolName"
            placeholder="High School Name"
            className={errors.highSchoolName ? "error-input" : "input"}
          />
          {errors.highSchoolName && (
            <div className="error-message">{errors.highSchoolName}</div>
          )}
        </div>

        <div className="w-1/2">
          <label htmlFor="grade" className="label">
            Grade <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="text"
            name="grade"
            placeholder="Grade"
            className={errors.grade ? "error-input" : "input"}
          />
          {errors.grade && <div className="error-message">{errors.grade}</div>}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label htmlFor="unweightedGPA" className="label">
            Unweighted GPA <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="number"
            name="unweightedGPA"
            placeholder="Unweighted GPA"
            className={errors.unweightedGPA ? "error-input" : "input"}
          />
          {errors.unweightedGPA && (
            <div className="error-message">{errors.unweightedGPA}</div>
          )}
        </div>

        <div className="w-1/2">
          <label htmlFor="graduationYear" className="label">
            Graduation Year <span className="text-red-500 font-bold">*</span>
          </label>
          <Field
            type="number"
            name="graduationYear"
            placeholder="Graduation Year"
            className={errors.graduationYear ? "error-input" : "input"}
          />
          {errors.graduationYear && (
            <div className="error-message">{errors.graduationYear}</div>
          )}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label htmlFor="previousTestScores.testName" className="label">
            Any Previous Test Score(s){" "}
            <span className="text-sm text-gray-500 italic">- Optional</span>
          </label>
          <Field
            type="text"
            name="previousTestScores.testName"
            placeholder="Test Name"
            className={
              errors.previousTestScores && errors.previousTestScores.testName
                ? "error-input"
                : "input"
            }
          />
          {errors.previousTestScores && errors.previousTestScores.testName && (
            <div className="error-message">
              {errors.previousTestScores.testName}
            </div>
          )}
        </div>

        <div className="w-1/2 mt-auto">
          <Field
            type="number"
            name="previousTestScores.score"
            placeholder="Score"
            className={
              errors.previousTestScores && errors.previousTestScores.score
                ? "error-input"
                : "input"
            }
          />
          {errors.previousTestScores && errors.previousTestScores.score && (
            <div className="error-message">
              {errors.previousTestScores.score}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-5 w-full my-2">
        <div className="w-1/2">
          <label htmlFor="topUniversitiesDesired" className="label">
            Top Universities Desired{" "}
            <span className="text-sm text-gray-500 italic">- Optional</span>
          </label>
          <Field
            type="text"
            name="topUniversitiesDesired"
            placeholder="Top Universities Desired"
            className={errors.topUniversitiesDesired ? "error-input" : "input"}
          />
          {errors.topUniversitiesDesired && (
            <div className="error-message">{errors.topUniversitiesDesired}</div>
          )}
        </div>

        <div className="w-1/2">
          <label htmlFor="possibleMajor" className="label">
            Possible Major
            <span className="text-sm text-gray-500 italic">- Optional</span>
          </label>
          <Field
            type="text"
            name="possibleMajor"
            placeholder="Possible Major"
            className={errors.possibleMajor ? "error-input" : "input"}
          />
          {errors.possibleMajor && (
            <div className="error-message">{errors.possibleMajor}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default EducationForm;

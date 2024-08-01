import * as Yup from "yup";

export const convertToDesiredJsonFormat = (
  data,
  studentWithRegisteredParent,
  parentWithRegisteredStudent,
) => {
  return {

    student: parentWithRegisteredStudent
      ? {
          contactInfo: {
            email: data.registeredStudentEmail,
          },
        }
      : {
          fullName: `${data.studentFirstName} ${data.studentLastName}`,
          gender: data.studentGender,
          dateOfBirth: data.studentDateOfBirth,
          contactInfo: {
            email: data.studentEmail,
            phone: data.studentPhone,
          },
          address: {
            state: data.studentState,
            city: data.studentCity,
            zipCode: data.studentZipCode,
          },
          emergencyContactNumber: data.studentEmergencyContactNumber,
          role: "student",
        },

    parent: studentWithRegisteredParent
      ? {
          contactInfo: {
            email: data.registeredParentEmail,
          },
        }
      : {
          fullName: `${data.parentFirstName} ${data.parentLastName}`,
          gender: data.parentGender,
          contactInfo: {
            email: data.parentEmail,
            phone: data.parentPhone,
          },
          address: {
            state: data.parentState,
            city: data.parentCity,
            zipCode: data.parentZipCode,
          },
          emergencyContactNumber: data.parentEmergencyContactNumber,
          role: "parent",
        },

    education: !parentWithRegisteredStudent && {
      highSchoolName: data.highSchoolName,
      grade: data.grade,
      unweightedGPA: data.unweightedGPA,
      previousTestScores: data.previousTestScores,
      topUniversitiesDesired: data.topUniversitiesDesired,
      possibleMajor: data.possibleMajor,
      graduationYear: data.graduationYear,
    },

    schoolID: data.schoolID,
  };
};

export const validationSchema = (
  studentWithRegisteredParent,
  parentWithRegisteredStudent
) => {
  return Yup.object().shape({
    studentFirstName: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("First name is required"),
    studentLastName: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("Last name is required"),
    studentGender: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("Please select Gender"),
    studentDateOfBirth: parentWithRegisteredStudent
      ? Yup.date()
      : Yup.date().required("Date of birth is required"),
    studentEmail: parentWithRegisteredStudent
      ? Yup.string().email("Invalid email")
      : Yup.string().email("Invalid email").required("Email is required"),
    studentPhone: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("Phone number is required"),
    studentState: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("State is required"),
    studentCity: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("City is required"),
    studentZipCode: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("Zip code is required"),
    studentEmergencyContactNumber: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("Emergency contact number is required"),
    registeredStudentEmail: parentWithRegisteredStudent
      ? Yup.string().email("Invalid email").required("Email is required").notOneOf(
          [Yup.ref("parentEmail")],
          "Parent email and student email cannot be the same"
        )
      : Yup.string().email("Invalid email"),

    parentFirstName: studentWithRegisteredParent
      ? Yup.string()
      : Yup.string().required("First name is required"),
    parentLastName: studentWithRegisteredParent
      ? Yup.string()
      : Yup.string().required("Last name is required"),
    parentGender: studentWithRegisteredParent
      ? Yup.string()
      : Yup.string().required("Please select gender"),
    parentEmail: studentWithRegisteredParent
      ? Yup.string().email("Invalid email")
      : Yup.string()
          .email("Invalid email")
          .required("Email is required")
          .notOneOf(
            [Yup.ref("studentEmail")],
            "Parent email and student email cannot be the same"
          ),
    parentPhone: studentWithRegisteredParent
      ? Yup.string()
      : Yup.string().required("Phone number is required"),
    parentState: studentWithRegisteredParent
      ? Yup.string()
      : Yup.string().required("State is required"),
    parentCity: studentWithRegisteredParent
      ? Yup.string()
      : Yup.string().required("City is required"),
    parentZipCode: studentWithRegisteredParent
      ? Yup.string()
      : Yup.string().required("Zip code is required"),
    parentEmergencyContactNumber: studentWithRegisteredParent
      ? Yup.string()
      : Yup.string().required("Emergency contact number is required"),
    registeredParentEmail: studentWithRegisteredParent
      ? Yup.string()
          .email("Invalid email")
          .required("Email is required")
          .notOneOf(
            [Yup.ref("studentEmail")],
            "Parent email and student email cannot be the same"
          )
      : Yup.string().email("Invalid email"),

    highSchoolName: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("High school name is required"),
    grade: parentWithRegisteredStudent
      ? Yup.string()
      : Yup.string().required("Grade is required"),
    unweightedGPA: parentWithRegisteredStudent
      ? Yup.number()
      : Yup.number().required("Unweighted GPA is required"),
    graduationYear: parentWithRegisteredStudent
      ? Yup.number()
      : Yup.number().required("Graduation year is required"),
  });
};

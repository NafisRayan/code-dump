import { useRouter } from "next/navigation";
import React from "react";
import { FaCheck } from "react-icons/fa";

const SuccessRegistration = ({
  user,
  setSuccess,
  setChoose,
  setStudentWithRegisteredParent,
  setParentWithRegisteredStudent,
}) => {
  const router = useRouter();

  return (
    <div className="flex justify-center w-full mx-auto pt-24 items-center h-screen max-w-[1400px]">
      <div className="bg-white flex flex-col rounded-md h-[500px] p-6 w-1/3">
        <div
          style={{
            backgroundImage: `url(https://cdn.dribbble.com/users/2116379/screenshots/18267019/media/b920de2e27c712d9d9dcb7aced26c0b1.gif)`,
          }}
          className="h-1/2 flex flex-col items-center justify-center px-5 md:px-10 bg-cover bg-center bg-no-repeat rounded-md"
        >
          <h1 className="text-3xl font-bold tracking-wide">Success !</h1>
          <p className="p-4 rounded-full bg-green-600 my-5 animate-bounce">
            <FaCheck className="text-white h-8 w-8" />
          </p>
          <h2 className="text-xl text-center font-semibold tracking-wide">
            {user?.role === "student" &&
              `${user?.fullName} is Enrolled in the 6 Week SAT Challenge!`}
            {user?.role === "parent" &&
              `${user?.fullName} is Registered Successfully!`}
          </h2>
        </div>
        <p className="text-justify font-semibold text-base my-10">
          Please check your email for further instructions. We are excited to
          have you on board. If you don't see an email from us, please check
          your spam folder.
        </p>
        {user?.role === "parent" ? (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setSuccess(null);
                setChoose(1);
                setStudentWithRegisteredParent(true);
                setParentWithRegisteredStudent(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 my-4 text-sm font-semibold rounded-md"
            >
              Do you want to register another student?
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => {
                router.push("/");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 my-4 text-sm font-semibold rounded-md"
            >
              Home
            </button>
          </div>
        )}
        <p className="text-sm text-center px-5 mt-auto text-gray-500">
          If you have any questions, please email us at{" "}
          <span className="text-blue-600 cursor-pointer">
            contact@collegemastermind.com
          </span>{" "}
          for assistance.
        </p>
      </div>
    </div>
  );
};

export default SuccessRegistration;

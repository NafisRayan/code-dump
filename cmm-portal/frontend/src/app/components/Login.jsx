"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/user";
import { BarLoader } from "react-spinners";
import Image from "next/image";

export default function Login() {
  const { setLoading, loading } = useContext(GlobalContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setseePassword] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        toast.error(res.error);
        console.error("Failed to login", res.error);
        setLoading(false);
        return;
      }
      if (res.ok) {
        toast.success("LOGIN SUCCESSFUL!");
        setLoading(false);
        // router.push("/dashboard");
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to login", error);
      toast.error("Failed to login");
    }
  };

  return (
    <div
      className="h-screen flex items-center w-full gap-16 px-20 text-white"
    >
      <div className="w-1/3">
        <div
          className={`w-full mx-auto shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-md max-w-96 ${
            loading && "pointer-events-none bg-opacity-70"
          }`}
        >
          {loading && <BarLoader color="#2196F3" height={5} width="100%" />}
          <div className="p-6">
            <h1 className="text-black font-bold uppercase text-center my-4 text-xl">
              Welcome Back!
            </h1>
            {/* <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center space-x-4 w-full text-center my-6 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-6 py-3 text-sm font-semibold tracking-wide text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="800px"
              height="800px"
              viewBox="-0.5 0 48 48"
              version="1.1"
            >
              {" "}
              <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
              <defs> </defs>{" "}
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {" "}
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  {" "}
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                    {" "}
                    <path
                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      id="Fill-1"
                      fill="#FBBC05"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      id="Fill-2"
                      fill="#EB4335"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      id="Fill-3"
                      fill="#34A853"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      id="Fill-4"
                      fill="#4285F4"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </svg>
            <span>Log in with Google</span>
          </button>

          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center text-gray-500 font-semibold">
              OR
            </p>
          </div> */}
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="email"
                className="peer bg-white text-black shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="relative mb-6">
              <div className="relative">
                <input
                  type={`${seePassword ? "text" : "password"}`}
                  className="peer bg-white text-black shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none "
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                />
              </div>
              <span
                onClick={() => setseePassword(!seePassword)}
                className="absolute text-black grid place-items-center inset-y-0 right-5 my-auto cursor-pointer text-lg"
              >
                {seePassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                  type="checkbox"
                />
                <label className="inline-block text-black pl-[0.15rem] hover:cursor-pointer">
                  Remember me
                </label>
              </div>

              <Link
                href="/auth/forgotPassword"
                className="text-primary text-blue-500 font-semibold transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
              >
                Forgot password?
              </Link>
            </div>

            <button
              onClick={handleLogin}
              type="submit"
              disabled={!email || !password}
              className="inline-block w-full rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              Log in
            </button>

            <p className="mt-4 text-sm text-center text-neutral-500">
              Don&apos;t have an account yet?{" "}
              <Link
                className="text-primary text-blue-500 font-semibold transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
                href="/auth/signup"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/3 h-full flex flex-col items-center">
        <Image
          src="https://cdn.dribbble.com/users/2448553/screenshots/16408464/media/9f205205d68e4f9d6c001a232fdd119a.jpg"
          alt="Login"
          width={1066}
          height={800}
          className="my-auto"
        />
      </div>
    </div>
  );
}

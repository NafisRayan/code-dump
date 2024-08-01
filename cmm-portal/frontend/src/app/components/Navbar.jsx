"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { IoClose, IoPerson } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { GlobalContext } from "../context/user";
import { RiUserSmileFill } from "react-icons/ri";
import Image from "next/image";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();

  const { user } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    console.log("user");
    console.log(user);
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${isScrolling ? "bg-black" : "h-0"
        } sticky top-0 z-30 inset-x-0 transition-all duration-500 ease-in-out`}
    >
      <div
        className={`transition-colors duration-500 ease-in-out ${isScrolling ? "bg-black text-white" : "bg-transparent"
          } max-w-[1400px] mx-2 md:mx-auto flex items-center justify-between px-4 py-1`}
      >
        <div>
          <Link
            className="flex items-center flex-shrink-0 cursor-pointer mr-6 gap-6"
            href="/"
          >
            <span className="font-semibold text:sm md:text-xl tracking-tight">
              <RiUserSmileFill />
            </span>
            <span className="font-semibold text-sm uppercase tracking-widest">
              CMM Portal
            </span>
          </Link>
        </div>

        <div className="hidden md:flex font-semibold">
          {user?.role === "admin" && (
            <Link
              href="/dashboard"
              className="px-3 mr-2 py-1 my-auto text-sm rounded-md text-white hover:bg-red-600 bg-red-500"
            >
              DASHBOARD
            </Link>
          )}
          {user && (
            <>
              <Link
                href="/appointments"
                className="py-3 Linkx-5 hover:border-b-2 border-b-black hover:cursor-pointer"
              >
                APPOINTMENTS
              </Link>
              <Link
                href="/calender"
                className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
              >
                CALENDER
              </Link>
              <Link
                href="/usermanagement"
                className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
              >
                User Management
              </Link>
            </>
          )}
          {/* <Link
            href="/about"
            className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
          >
            CONTACT
          </Link> */}
          {/* <button
            onClick={() => router.push("/calender")}
            className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
          >
            TEST
          </button>
          <button
            onClick={() => router.push("/appointments")}
            className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
          >
            TEST
          </button> */}
        </div>
        <div className="hidden md:flex font-semibold">
          {!user ? (
            <div>
              <button
                onClick={() => router.push("/login")}
                className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
              >
                LOGIN
              </button>
              <button
                onClick={() => router.push("/registration")}
                className="px-3 py-1 my-auto text-sm rounded-md text-white hover:bg-black tracking-wide bg-gray-900"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                onClick={() => router.push("/profile")}
                className="py-3 px-5 hover:cursor-pointer"
              >
                {user?.image ? (
                  <Image
                    className="rounded-full"
                    src={user.image}
                    alt="user image"
                    height={28}
                    width={28}
                  />
                ) : (
                  <IoPerson className="h-8 w-8 p-2  bg-gray-200 hover:bg-gray-300 rounded-full" />
                )}
              </button>
              <button
                onClick={() => {
                  toast.success("LOGGED OUT SUCCESSFULLY!");
                  signOut();
                  router.push("/login")
                }}
                className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
              >
                SIGNOUT
              </button>
            </div>
          )}
        </div>

        {/* mobile view */}
        <div className="flex gap-3 md:hidden">
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="flex text-sm md:text-base items-center px-3 py-2 border-2 rounded"
          >
            <GiHamburgerMenu />
          </button>
        </div>
        <div
          className={`${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full "
            } fixed inset-0 md:hidden transform transition-all duration-300 overflow-hidden flex flex-col h-screen ease-in-out bg-black z-20`}
        >
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="text-white flex justify-end text-2xl p-4"
          >
            <IoClose className="border rounded-lg text-white h-8 w-8 p-1 text-2xl" />
          </button>
          <div className="my-auto">
            <button
              onClick={() => {
                router.push("/products");
                setOpen(false);
              }}
              className="text-white text-center cursor-pointer text-lg p-3 w-full"
            >
              MODELS
            </button>
            <button
              onClick={() => {
                router.push("/accessories");
                setOpen(false);
              }}
              className="text-white text-center cursor-pointer text-lg p-3 w-full"
            >
              ACCESSORIES
            </button>
            <button
              onClick={() => {
                router.push("/about");
                setOpen(false);
              }}
              className="text-white text-center cursor-pointer text-lg p-3 w-full"
            >
              ABOUT
            </button>
            <button
              onClick={() => {
                router.push("/contact");
                setOpen(false);
              }}
              className="text-white text-center cursor-pointer text-lg p-3 w-full"
            >
              CONTACT
            </button>
            {!user ? (
              <div>
                <button
                  onClick={() => {
                    router.push("/login");
                    setOpen(false);
                  }}
                  className="text-white text-center cursor-pointer text-lg p-3 w-full"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => {
                    router.push("/signup");
                    setOpen(false);
                  }}
                  className="text-white text-center cursor-pointer text-lg p-3 w-full"
                >
                  SIGN UP
                </button>
              </div>
            ) : (
              <div className="flex">
                <button
                  onClick={() => router.push("/profile")}
                  className="text-white text-center cursor-pointer text-lg p-3 w-full"
                >
                  Profile
                </button>
                <button
                  onClick={async () => {
                    await signOut(); // wait for signOut to complete
                    toast.success("LOGGED OUT SUCCESSFULLY!");
                    router.push('/login'); // redirect to login page
                  }}
                  className="text-white text-center cursor-pointer text-lg p-3 w-full"
                >
                  Signout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

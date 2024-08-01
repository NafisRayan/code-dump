import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./provider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Provider from "./context/user";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CMM Portal",
  description: "User portal for CMM",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <Provider>
            <div className="">
              {/* <SideBar className="w-36 bg-gray-50 border-r border-gray-200 h-screen fixed left-0 top-0 flex-shrink-0" /> */}
              <div className=" ">
                <Navbar className="bg-white shadow-md fixed top-0 left-0 right-0 z-10" />
                <ToastContainer theme="colored" />
                {children}
              </div>
            </div>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}

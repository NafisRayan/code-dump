"use client";

import { SessionProvider } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const AuthProvider = ({ children }) => {
  return <SessionProvider session={authOptions}>{children}</SessionProvider>;
};

"use client";

import { getSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext({});

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function myFunction() {
    const sessionget = await getSession();
    if (sessionget) {
      setUser(sessionget.user);
    }
  }
  
  useEffect(() => {
    myFunction();
  }, [loading])
  

  const exposed = {
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <GlobalContext.Provider value={exposed}>{children}</GlobalContext.Provider>
  );
};

export default Provider;

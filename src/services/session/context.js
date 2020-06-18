import React, { createContext, useState } from "react";
import { getToken } from "../auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(() => (getToken() ? true : false));

  async function handleLogin() {
    setSigned(true);
  }

  async function handleLogout() {
    setSigned(false);
  }

  return (
    <AuthContext.Provider value={{ signed, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

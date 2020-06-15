import React, { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);

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

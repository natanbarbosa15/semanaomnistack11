import React, { useState, useEffect } from "react";
import Firebase from "./firebase";

const FirebaseContext = React.createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [firebase] = useState(new Firebase());
  const [signed, setSigned] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    firebase
      .isSignedIn()
      .then((result) => {
        setSigned(result);
      })
      .then(() => {
        setLoadingUser(false);
      });
  }, [firebase, signed]);

  function setLogin() {
    setSigned(true);
  }

  function setLogout() {
    setSigned(true);
  }

  return (
    <FirebaseContext.Provider
      value={{ firebase, signed, loadingUser, setLogin, setLogout }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;

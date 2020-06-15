import React from "react";
import Firebase from "./firebase";

const FirebaseContext = React.createContext(null);

export const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider value={new Firebase()}>
    {children}
  </FirebaseContext.Provider>
);

export default FirebaseContext;

import React from "react";
import Routes from "./routes";

import "./global.css";

import { FirebaseProvider } from "./services/firebase";
import { AuthProvider } from "./services/session";

const App = () => (
  <FirebaseProvider>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </FirebaseProvider>
);
export default App;

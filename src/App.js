import React from "react";
import Routes from "./routes";

import "./global.css";

import { FirebaseProvider } from "./services/firebase";

const App = () => (
  <FirebaseProvider>
    <Routes />
  </FirebaseProvider>
);
export default App;

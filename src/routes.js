import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import About from "./pages/about";
import Useterms from "./pages/useTerms";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/about" component={About} />
      <Route path="/useterms" component={Useterms} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Index from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import About from "./pages/about";
import UseTerms from "./pages/useTerms";
import PrivacyTerms from "./pages/privacyTerms";
import Profile from "./pages/profile";
import NewIncident from "./pages/newIncident";
import NotFound from "./pages/notFound";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/about" component={About} />
      <Route path="/useterms" component={UseTerms} />
      <Route path="/privacyterms" component={PrivacyTerms} />
      <PrivateRoute path="/app/profile" component={Profile} />
      <PrivateRoute path="/app/profile/newincident" component={NewIncident} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import routes from "./constants/routes.js";

import FirebaseContext from "./services/firebase";

import Index from "./pages/index";
import Incidents from "./pages/incidents/index";
import Login from "./pages/login";
import Register from "./pages/ongs/create";
import About from "./pages/about";
import UseTerms from "./pages/useTerms";
import PrivacyTerms from "./pages/privacyTerms";
import Profile from "./pages/profile";
import UpdateProfile from "./pages/ongs/update";
import UpdatePassword from "./pages/ongs/password";
import NewIncident from "./pages/incidents/create";
import UpdateIncident from "./pages/incidents/update";
import NotFound from "./pages/notFound";
import Loading from "./pages/loading";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <FirebaseContext.Consumer>
    {({ signed, loadingUser }) => (
      <Route
        {...rest}
        render={(props) =>
          loadingUser ? (
            <Loading />
          ) : signed ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    )}
  </FirebaseContext.Consumer>
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.home} component={Index} />
      <Route path={routes.incidents} component={Incidents} />
      <Route path={routes.login} component={Login} />
      <Route path={routes.register} component={Register} />
      <Route path={routes.about} component={About} />
      <Route path={routes.useTerms} component={UseTerms} />
      <Route path={routes.privacyTerms} component={PrivacyTerms} />
      <PrivateRoute exact path={routes.profile} component={Profile} />
      <PrivateRoute exact path={routes.newIncident} component={NewIncident} />
      <PrivateRoute
        exact
        path={routes.updateIncident + "/:id"}
        component={UpdateIncident}
      />
      <PrivateRoute
        exact
        path={routes.updateProfile}
        component={UpdateProfile}
      />
      <PrivateRoute
        exact
        path={routes.updatePassword}
        component={UpdatePassword}
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

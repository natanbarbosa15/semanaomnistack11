import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import routes from "./constants/routes.js";

import FirebaseContext from "./services/firebase";

import Loading from "./pages/loading";
import ErrorBoundary from "./components/errorBoundary";

const Index = React.lazy(() => import("./pages/index"));
const Incidents = React.lazy(() => import("./pages/incidents/index"));
const ReadIncident = React.lazy(() =>
  import("./pages/incidents/read/index.js")
);
const Login = React.lazy(() => import("./pages/login"));
const Register = React.lazy(() => import("./pages/ongs/create"));
const About = React.lazy(() => import("./pages/about"));
const Tutorial = React.lazy(() => import("./pages/tutorial"));
const UseTerms = React.lazy(() => import("./pages/useTerms"));
const PrivacyTerms = React.lazy(() => import("./pages/privacyTerms"));
const Profile = React.lazy(() => import("./pages/profile"));
const UpdateProfile = React.lazy(() => import("./pages/ongs/update"));
const UpdatePassword = React.lazy(() => import("./pages/ongs/password"));
const NewIncident = React.lazy(() => import("./pages/incidents/create"));
const UpdateIncident = React.lazy(() => import("./pages/incidents/update"));
const NotFound = React.lazy(() => import("./pages/notFound"));

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
    <ErrorBoundary>
      <Suspense fallback={Loading()}>
        <Switch>
          <Route exact path={routes.home} component={Index} />
          <Route exact path={routes.incidents} component={Incidents} />
          <Route
            exact
            path={routes.incidents + "/:id"}
            component={ReadIncident}
          />
          <Route path={routes.login} component={Login} />
          <Route path={routes.register} component={Register} />
          <Route path={routes.about} component={About} />
          <Route path={routes.tutorial} component={Tutorial} />
          <Route path={routes.useTerms} component={UseTerms} />
          <Route path={routes.privacyTerms} component={PrivacyTerms} />
          <PrivateRoute exact path={routes.profile} component={Profile} />
          <PrivateRoute
            exact
            path={routes.newIncident}
            component={NewIncident}
          />
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
      </Suspense>
    </ErrorBoundary>
  </BrowserRouter>
);

export default Routes;

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { UNAUTHENTICATED_ROUTES } from "../constant/routeConstant";

const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const SignUp = React.lazy(() => import("../pages/auth/SignUp"));

export default function Unauthenticated() {
  return (
    <div className="App">
      <Switch>
        <Route path={UNAUTHENTICATED_ROUTES.SIGN_IN} exact component={SignIn} />
        <Route path={UNAUTHENTICATED_ROUTES.SIGN_UP} exact component={SignUp} />
        <Route exact path="*" component={SignIn}>
          <Redirect to={UNAUTHENTICATED_ROUTES.SIGN_IN} />
        </Route>
      </Switch>
    </div>
  );
}

import React from "react";
import { Redirect, Route, Switch, } from "react-router-dom";
import BrainStormCards from "../components/brainstorm/BrainStormCards";
import OutlineCards from "../components/cards/OutlineCards";
import TimelineCards from "../components/cards/TimelineCards";
import OutlineDetail from "../pages/screen/OutlineDetail";
import PlotlineDetail from "../components/plotline/Plotline-detail";

import { AUTHENTICATED_ROUTES } from "../constant/routeConstant";
import BrainstormDetails from "../pages/screen/BrainStormDetails";
import PlotlineCards from "../components/plotline/PlotlineCards";
import Unauthenticated from "./unauthenticated";
import BookofSeriesCards, { BookofSeriesDashboard } from "../components/BookofSeriesCards";
const Main = React.lazy(() => import("../components/layout/Main"));
const Chat = React.lazy(() => import("../pages/screen/Chat/index"));
const Books = React.lazy(() => import("../pages/screen/Books"));
const GetHelp = React.lazy(() => import("../pages/screen/GetHelp/GetHelp"));
const Settings = React.lazy(() => import("../pages/screen/Settings/index"));
const Calendar = React.lazy(() => import("../pages/screen/Calendar"));
const Dashboard = React.lazy(() => import("../pages/screen/Dashboard"));
const Shared = React.lazy(() => import("../pages/screen/Shared"));

const TimelineDetail = React.lazy(() =>
  import("../components/timeline/TimelineDetails")
);

const ProfileSettings = React.lazy(() =>
  import("../pages/screen/Settings/ProfileSetting")
);

const FirstPage = React.lazy(() => import("../pages/screen/FirstPage"));

export default function Authenticated({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Unauthenticated />;
  }
  return (
    <div className="App">
      <Switch>
        <Main>
          <Route
            exact
            path={AUTHENTICATED_ROUTES.DASHBOARD}
            component={Dashboard}
          />
          <Route exact path={AUTHENTICATED_ROUTES.CHAT} component={Chat} />
          <Route
            exact
            path={AUTHENTICATED_ROUTES.CALENDAR}
            component={Calendar}
          />
          <Route exact path={AUTHENTICATED_ROUTES.BOOKS} component={Books} />
          <Route
            exact
            path={AUTHENTICATED_ROUTES.BRAINSTORM}
            component={FirstPage}
          />
          <Route
            exact
            path={AUTHENTICATED_ROUTES.OUT_LINE}
            component={FirstPage}
          />
          <Route
            exact
            path={AUTHENTICATED_ROUTES.SHARED_WORKS}
            component={Shared}
          />
          <Route
            exact
            path={AUTHENTICATED_ROUTES.PLOT_LINE}
            component={FirstPage}
          />
          <Route
            exact
            path={AUTHENTICATED_ROUTES.TIME_LINE}
            component={FirstPage}
          />
          <Route
            exact
            path={AUTHENTICATED_ROUTES.SETTING}
            component={Settings}
          />
          <Route
            exact
            path={AUTHENTICATED_ROUTES.PROFILE_SETTING}
            component={ProfileSettings}
          />
          <Route
            exact
            path={AUTHENTICATED_ROUTES.GET_HELP}
            component={GetHelp}
          />
          <Route path="*" component={Dashboard}>
            <Redirect to={AUTHENTICATED_ROUTES.DASHBOARD} />
          </Route>
          <Route path="/plotline/:id" component={PlotlineDetail} />
          <Route path="/timeline/:id" component={TimelineDetail} />
          <Route path="/outline/:id" component={OutlineDetail} />
          <Route path="/brainstorm/:id" component={BrainstormDetails} />

          <Route path="/out-line/list/:id" component={OutlineCards} />
          <Route path="/time-line/list/:id" component={TimelineCards} />
          <Route path="/plot-line/list/:id" component={PlotlineCards} />
          <Route path="/brain-storm/list/:id" component={BrainStormCards} />


          <Route path="/series/out-line/:id" component={BookofSeriesCards} />

          <Route path="/series/plot-line/:id" component={BookofSeriesCards} />
          <Route path="/series/time-line/:id" component={BookofSeriesCards} />
          <Route path="/series/brain-storm/:id" component={BookofSeriesCards} />
          <Route path="/series/dashboard/:id" component={BookofSeriesDashboard} />

        </Main>
      </Switch>
      )
    </div>
  );
}

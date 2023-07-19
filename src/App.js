import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Authenticated from "./routes/authenticated";
import Unauthenticated from "./routes/unauthenticated";
import FullPageSpinner from "./components/loader/FullPageSpinner";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/Slice/AuthSlice";

const App = () => {
  const { auth, isLoggedIn, user } = useSelector((state) => state.auth);

  const [authenticated, setAuthenticated] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    dispatch(getCurrentUser());
  }, [auth]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {authenticated ? (
            <Authenticated isLoggedIn={isLoggedIn} />
          ) : (
            <Unauthenticated />
          )}

        </BrowserRouter>
      </QueryClientProvider>
    </React.Suspense>
  );
};

export default App;

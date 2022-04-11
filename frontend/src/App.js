//Importing pre made packages
import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { UserContextProvider } from "./Modules/Users/context";
import routes, { renderRoutes } from "./Routes";
import { JobsContextProvider } from "./Modules/Jobs/context";
import { SnackbarProvider } from "notistack";

const history = createBrowserHistory();

export default function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <SnackbarProvider>
      <JobsContextProvider>
        <UserContextProvider>
          <Router history={history}>{renderRoutes(routes)}</Router>
        </UserContextProvider>
      </JobsContextProvider>
    </SnackbarProvider>
  );
}

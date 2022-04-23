//Importing pre made packages
import React, { useEffect } from "react";
import { createTheme } from '@material-ui/core/styles';
import { Router } from "react-router-dom";
import { purple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from "history";
import { UserContextProvider } from "./Modules/Users/context";
import routes, { renderRoutes } from "./Routes";
import { JobsContextProvider } from "./Modules/Jobs/context";
import { SnackbarProvider } from "notistack";
import { ApplyContextProvider } from "./Modules/Apply/context";

const history = createBrowserHistory();

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

export default function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <SnackbarProvider>
        <ApplyContextProvider>
          <JobsContextProvider>
            <UserContextProvider>
              <Router history={history}>{renderRoutes(routes)}</Router>
            </UserContextProvider>
          </JobsContextProvider>
        </ApplyContextProvider>
    </SnackbarProvider>
  );
}

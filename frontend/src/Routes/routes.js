import React from "react";
import { routes } from "./path";
import Home from "../Views/Home/Home";
import Admin from "../Views/Home/Admin/index";
import AuthProtect from "../Global/authProtect";
import { ROLES } from "../Constants/index";
import { Redirect } from "react-router-dom";
import DashboardLayout from "../Layout";

const Routes = {
  path: "*",
  layout: DashboardLayout,
  routes: [
    {
      exact: true,
      path: routes.app,
      roles: [ROLES.USER, ROLES.ADMIN],
      guard: AuthProtect,
      heading: "Home",
      component: (props) => {
        return <Home {...props} />;
      },
    },

    {
      exact: true,
      path: routes.admin,
      roles: [ROLES.ADMIN],
      guard: AuthProtect,
      heading: "Admin",
      component: (props) => {
        return <Admin {...props} />;
      },
    },
    {
      component: () => <Redirect to="/404" />,
    },
  ],
};

export default Routes;

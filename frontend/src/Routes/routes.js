import React from "react";
import { pagePath, routes } from "./path";
import Home from "../Views/Home/Home";
import Admin from "../Views/Home/Admin/index";
import AuthProtect from "../Global/authProtect";
import { ROLES } from "../Constants/index";
import { Redirect } from "react-router-dom";
import DashboardLayout from "../Layout";
import Users from "../Modules/Users";
import Jobs from "../Modules/Jobs";
import Employers from "../Modules/Employeers";
import EmployerDetails from "../Modules/Employeers/details";
import Applications from "../Modules/Employeers/applications";
import ApplicationsTable from "../Modules/Jobseeker";
import Profile from "../Views/Home/profile";

const Routes = {
  path: "*",
  layout: DashboardLayout,
  routes: [
    {
      exact: true,
      path: routes.root,
      roles: [ROLES.JOBSEEKER, ROLES.EMPLOYEER, ROLES.ADMIN],
      guard: AuthProtect,
      heading: "Home",
      component: (props) => {
        return <Home {...props} />;
      },
    },
    {
      exact: true,
      path: pagePath.app.jobs,
      roles: [ROLES.JOBSEEKER, ROLES.EMPLOYEER, ROLES.ADMIN],
      guard: AuthProtect,
      heading: "Jobs",
      component: (props) => {
        return <Jobs {...props} />;
      },
    },
    {
      exact: true,
      path: routes.app,
      roles: [ROLES.JOBSEEKER, ROLES.EMPLOYEER, ROLES.ADMIN],
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
      heading: "Users",
      component: (props) => {
        return <Users{...props} />;
      },
    },
    {
      exact: true,
      path: routes.employer,
      roles: [ROLES.ADMIN, ROLES.EMPLOYEER],
      guard: AuthProtect,
      heading: "Users",
      component: (props) => {
        return <Employers{...props} />;
      },
    },
    {
      exact: true,
      path: pagePath.employer.applications,
      roles: [ROLES.ADMIN, ROLES.EMPLOYEER],
      guard: AuthProtect,
      heading: "Employe Detail",
      component: (props) => {
        return <Applications{...props} />;
      },
    },
    {
      path: pagePath.employer.details,
      roles: [ROLES.ADMIN, ROLES.EMPLOYEER],
      guard: AuthProtect,
      heading: "Employe Detail",
      component: (props) => {
        return <EmployerDetails{...props} />;
      },
    },
    {
      path: routes.employee,
      roles: [ROLES.JOBSEEKER, ROLES.EMPLOYEER],
      guard: AuthProtect,
      heading: "Employee Detail",
      component: (props) => {
        return <ApplicationsTable{...props} />;
      },
    },
    {
      path: routes.profile,
      roles: [ROLES.JOBSEEKER, ROLES.EMPLOYEER,ROLES.ADMIN],
      guard: AuthProtect,
      heading: "Profile",
      component: (props) => {
        return <Profile{...props} />;
      },
    },
    {
      component: () => <Redirect to="/404" />,
    },
  ],
};

export default Routes;

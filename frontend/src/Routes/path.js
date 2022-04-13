//function made for merging base and additional routes in a single path
function merge_path(base, sub_path) {
  return `${base}${sub_path}`;
}

export const routes = {
  root: "/",
  app: "/app",
  employer: "/employer",
  employee: "/employee",
  admin: "/admin",
  error: "/error",
};

export const pagePath = {
  app: {
    login: merge_path(routes.app, "/login"),
    register: merge_path(routes.app, "/register"),
    jobs: merge_path(routes.app, "/jobs"),
    employeer: merge_path(routes.app, "/employer"),
    employeerDetails: merge_path(routes.app, "/employer/:id"),
    employeerApplications: merge_path(routes.app, "/employer/applications"),
    waitForApproval: merge_path(routes.app, "/waitforapproval"),
  },
  employer:{
    details : merge_path(routes.employer, "/:id"),
    applications: merge_path(routes.employer, "/applications"),
  },
  admin: {
    users: merge_path(routes.admin, "/users"),
  },
};

export const homePath = {
  app: routes.app,
};

export const appPath = {
  root: routes.app,
};

//function made for merging base and additional routes in a single path
function merge_path(base, sub_path) {
  return `${base}${sub_path}`;
}

export const routes = {
  root: "/",
  app: "/app",
  admin: "/admin",
  employeer: "/employeer",
  error: "/error",
};

export const pagePath = {
  app: {
    login: merge_path(routes.app, "/login"),
    register: merge_path(routes.app, "/register"),
    jobs: merge_path(routes.app, "/jobs"),
    waitForApproval: merge_path(routes.app, "/waitforapproval"),
  },
  admin: {
    users: merge_path(routes.admin, "/users"),
  },
  employeer: {
    jobs: merge_path(routes.employeer, "/jobs"),
  },
};

export const homePath = {
  app: routes.app,
};

export const appPath = {
  root: routes.app,
};

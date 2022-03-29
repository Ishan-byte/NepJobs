//function made for merging base and additional routes in a single path
function merge_path(base, sub_path) {
  return `${base}${sub_path}`;
}

export const routes = {
  app: "/app",
  admin: "/admin",
  error: "/error",
};

export const pagePath = {
  app: {
    login: merge_path(routes.app, "/login"),
    register: merge_path(routes.app, "/register"),
    waitForApproval: merge_path(routes.app, "/waitforapproval"),
  },
};

export const homePath = {
  app: routes.app,
};

export const appPath = {
  root: routes.app,
};

import { ROLES } from "../Constants";
import { pagePath, routes } from "../Routes/path";
import AuthProtectNav from "./AuthProtectNav";

const Navconfig = [
  //For admin user

  //For normal user
  {
    guard: AuthProtectNav,
    roles: [ROLES.ADMIN, ROLES.EMPLOYEER],
    navs: [
      {
        title: "Home",
        href: routes.app,
      },
    ],
  },
  {
    guard: AuthProtectNav,
    roles: [ROLES.ADMIN],
    navs: [
      {
        title: "Admin",
        href: routes.admin,
      },
      {
        title: "Users",
        href: pagePath.admin.users,
      },
    ],
  },
];

export default Navconfig;

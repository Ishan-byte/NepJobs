import { ROLES } from "../Constants";
import { routes } from "../Routes/path";
import AuthProtectNav from "./AuthProtectNav";

const Navconfig = [
  //For admin user
  {
    guard: AuthProtectNav,
    roles: [ROLES.ADMIN],
    navs: [
      {
        title: "Admin",
        href: routes.admin,
      },
    ],
  },

  //For normal user
  {
    guard: AuthProtectNav,
    roles: [ROLES.ADMIN, ROLES.USER],
    navs: [
      {
        title: "Home",
        href: routes.app,
      },
    ],
  },
];

export default Navconfig;

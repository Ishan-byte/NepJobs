import { ROLES } from "../Constants";
import { pagePath, routes } from "../Routes/path";
import AuthProtectNav from "./AuthProtectNav";
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const Navconfig = [
  //For admin user

  //For normal user
  {
    guard: AuthProtectNav,
    roles: [ROLES.ADMIN, ROLES.EMPLOYEER, ROLES.JOBSEEKER],
    title: "App",
    navs: [
      {
        title: "Home",
        href: routes.app,
        icon: <HomeIcon/>
      },
      {
        title: "Jobs",
        href: pagePath.app.jobs,
        icon: <WorkIcon/>
      },
    ],
  },
  {
    guard: AuthProtectNav,
    roles: [ROLES.ADMIN],
    title: "Admin",
    navs: [
      {
        title: "Admin",
        href: routes.admin,
        icon: <PeopleAltIcon/>
      },
      {
        title: "Users",
        href: pagePath.admin.users,
        icon: <RecentActorsIcon/>
      },
    ],
  },
];

export default Navconfig;

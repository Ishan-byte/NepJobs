import authProtect from "../Global/authProtect";


const Navconfig = [
  //For normal user
  {
    guard: authProtect,
    roles: [],
  },
];

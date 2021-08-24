// import Cookie from "js-cookie";
// export const isAuth = () => {
//   const cookieChecked = Cookie.get("token");
//   if (typeof window !== "undefined") {
//     if (cookieChecked) {
//       if (localStorage.getItem("user")) {
//         return JSON.parse(localStorage.getItem("user"));
//       } else return false;
//     } else return false;
//   } else return false;
// };

export const isAuth = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else return false;
    } else return false;
  } else return false;
};

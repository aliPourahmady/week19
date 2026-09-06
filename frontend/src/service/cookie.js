import Cookies from "js-cookie";
import { FaTruckMedical } from "react-icons/fa6";

const TOKEN_KEY = "authToken";

const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7, path: "/" });
};

const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

const removeToken = () => {
  return Cookies.remove(TOKEN_KEY, { path: "/" });
};

const isAuth = () => {
  return !!getToken();
};

export { setToken, getToken, removeToken, isAuth };

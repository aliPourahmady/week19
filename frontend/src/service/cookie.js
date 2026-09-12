import Cookies from "js-cookie";

const TOKEN_KEY = "authToken";

const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 / 24, path: "/" });
};

const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (!token) removeToken();
  return token;
};

const removeToken = () => {
  return Cookies.remove(TOKEN_KEY, { path: "/" });
};

const isAuth = () => {
  return !!getToken();
};

export { setToken, getToken, removeToken, isAuth };

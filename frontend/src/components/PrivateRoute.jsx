import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { isAuth } from "../service/cookie";

const PrivateRoute = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

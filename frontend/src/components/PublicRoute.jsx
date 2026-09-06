import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { isAuth } from "../service/cookie";

const PublicRoute = () => {
  return isAuth() ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default PublicRoute;

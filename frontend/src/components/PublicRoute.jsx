import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../service/cookie";

const PublicRoute = () => {
  return isAuth() ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default PublicRoute;

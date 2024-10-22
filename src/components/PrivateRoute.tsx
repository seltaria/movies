import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.user) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;

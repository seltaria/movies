import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileDataQuery } from "../app/authApi";

const PrivateRoute = () => {
  const { data } = useGetProfileDataQuery({});
  if (!data) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;

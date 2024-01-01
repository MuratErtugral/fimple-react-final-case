import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const PrivateRouter = ({ Component, ...props }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Component {...props} />
  ) : (
    <Navigate to="/admin" replace />
  );
};
export default PrivateRouter;

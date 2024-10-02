import { Navigate } from "react-router-dom";
import AuthService from "./services/AuthServices";

const PrivateRoute = ({ Component }) => {
  const auth = AuthService.getInstance();
  // return <Component />; // Descomenta essa linha para não precisar fazer o login
  return auth.isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";
import AuthService from "./services/AuthServices";
import { isRoleHigher, UserRole } from "./pages/login/UserRole";

const PrivateRoute = (props: { role?: UserRole; redirectPath?: string}) => {
  const auth = AuthService.getInstance();
  // // Descomenta essas linha para não precisar fazer o login / Certas funcionalidades podem não funcionar
  // auth.setEmpresa({ uuid: "d6e7f8a9-b0c1-2c3d-1234-8a8b9c0d1e2f", nome: "NÃOLOGADO" });
  // auth.setToken({
  //   uuid: "d6e7f8a9-b0c1-2c3d-4321-8a8b9c0d1e2f",
  //   nome: "Anonimo",
  //   valid: true,
  //   tipoUsuario: UserRole.ADMIN
  // });
  // return <Outlet />;
  // //--- 


  const permision = auth.isAuthenticated() && (!props.role ||  isRoleHigher(auth.getRole() ?? UserRole.DEFAULT,props.role) )
    return permision ? <Outlet /> : <Navigate to={props.redirectPath ?? '/login'}  />;
};
export default PrivateRoute;

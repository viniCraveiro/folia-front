import { Navigate, Outlet } from "react-router-dom";
import AuthService from "./services/AuthServices";
import { isRoleHigher, UserRole } from "./models/UserRole";

const PrivateRoute = (props: { redirectPath?: string; roleHigher?: UserRole;  roleEquals?: UserRole}) => {
  const auth = AuthService.getInstance();
  // // Descomenta essas linha para não precisar fazer o login / Certas funcionalidades podem não funcionar
  // auth.setEmpresa({ uuid: "d6e7f8a9-b0c1-2c3d-1234-8a8b9c0d1e2f", nome: "NÃOLOGADO" });
  // auth.setToken({
  //   uuid: "d6e7f8a9-b0c1-2c3d-4321-8a8b9c0d1e2f",
  //   nome: "Anonimo",
  //   valid: true,
  //   tipoUsuario: UserRole.ADMIN
  // });
  // //--- 
  
  const userRole = auth.getRole();

  if(!userRole){
    return <Navigate to={props.redirectPath ?? '/login'}  />;
  }

  const permision = userHasPermision(userRole,props.roleHigher,props.roleEquals);
    return permision ? <Outlet /> : <Navigate to={props.redirectPath ?? '/'}  />;
};
export default PrivateRoute;

const userHasPermision = (userRole :UserRole, roleHigher?: UserRole, roleEquals?: UserRole) =>{

  if(roleHigher !=  undefined){
    return isRoleHigher(userRole,roleHigher);
  } 

  if(roleEquals !=  undefined){
    
    return (userRole  == roleEquals);
  } 

  return true;
}

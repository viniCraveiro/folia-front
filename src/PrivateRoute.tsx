import { Navigate, Outlet } from "react-router-dom";
import AuthService from "./services/AuthServices";
import { isRoleHigher, UserRole } from "./pages/login/UserRole";

const PrivateRoute = (props: { role?: UserRole; redirectPath?: string }) => {
  const auth = AuthService.getInstance();

  // Simula uma sessão autenticada para ignorar o login
  auth.setEmpresa({ uuid: "d6e7f8a9-b0c1-2c3d-1234-8a8b9c0d1e2f", nome: "teste pro início" });
  auth.setToken({
    uuid: "d6e7f8a9-b0c1-2c3d-4321-8a8b9c0d1e2f",
    nome: "Anonimo",
    valid: true,
    tipoUsuario: UserRole.ADMIN, 
  });

  // Habilita todas as permissões sem autenticação real
  const permision = true;

  return permision ? <Outlet /> : <Navigate to={props.redirectPath ?? '/login'} />;
};

export default PrivateRoute;

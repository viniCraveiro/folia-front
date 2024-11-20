import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthServices";
import { isRoleHigher, UserRole } from "../../models/UserRole";

const InicioRedirect = () => {
  const navigate = useNavigate();
  const auth = AuthService.getInstance();
  const role = auth.getRole();

  useEffect(() => {
    if (auth.getRole() && isRoleHigher(auth.getRole()!,UserRole.EMPRESA)) {
        navigate("/inicio/empresa", { replace: true });
    } else {
      navigate("/inicio/usuario", { replace: true });
    }
  }, [role, navigate, auth]);

  return null;
};

export default InicioRedirect;

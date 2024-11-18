import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthServices";
import { isRoleHigher, UserRole } from "../../models/UserRole";

const BoletoRedirect = () => {
  const navigate = useNavigate();
  const auth = AuthService.getInstance();
  const role = auth.getRole();

  useEffect(() => {
    if (auth.getRole() && isRoleHigher(auth.getRole()!,UserRole.EMPRESA)) {
        navigate("/boleto/empresa", { replace: true });
    } else {
      navigate("/boleto/usuario", { replace: true });
    }
  }, [role, navigate, auth]);

  return null;
};

export default BoletoRedirect;

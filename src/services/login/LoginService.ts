import { ILogin, UsuarioResponse } from "../../pages/login/ILogin";
import axiosClient from "../SuperService";

class LoginService{

    constructor(){}

    loginUser(credential: ILogin): Promise<UsuarioResponse>{
        return axiosClient.post("usuario/validarLogin",credential)
        .then((response) => {
            return response.data as UsuarioResponse;
        })
    }
}

export default LoginService

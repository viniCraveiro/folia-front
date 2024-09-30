import { ILogin, LoginToken } from "../../pages/login/ILoginData";
import axiosClient from "../SuperService";

class LoginService {

    constructor() { }

    loginUser(credential: ILogin): Promise<LoginToken> {
        return axiosClient.post("usuario/validarLogin", credential)
            .then((response) => {
                return response.data as LoginToken;
            });
    }
}

export default LoginService;

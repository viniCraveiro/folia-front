import { IEmpresaData } from "../../pages/login/IEmpresaData";
import { ILogin, LoginToken } from "../../pages/login/ILoginData";
import http from "../SuperService";

class LoginService {

    DEFAULT_URL = "usuario/";

    constructor() { }

    loginUser(credential: ILogin): Promise<LoginToken> {
        return http.post(`${this.DEFAULT_URL}validarLogin`, credential)
            .then((response) => {
                console.log(response)
                return response.data as LoginToken;
            });
    }

    getEmpresaVinculada(usuarioUUID: String): Promise<IEmpresaData> {
        return http.post(`${this.DEFAULT_URL}empresas/${usuarioUUID}`)
            .then((response) => {
                return response.data as IEmpresaData;
            });
    }
}

export default LoginService;

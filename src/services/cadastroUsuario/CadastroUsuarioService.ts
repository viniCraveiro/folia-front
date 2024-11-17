import { CadastroUsuarioForm } from "../../pages/gestao/CadastroUsuario";
import axiosClient from "../SuperService";

export interface UsuarioToken {
  token: string;
  mensagem: string;
}

class CadastroUsuarioService {
  private DEFAULT_URL = "usuarios/";

  constructor() { }

  cadastrar(usuario: CadastroUsuarioForm): Promise<UsuarioToken> {

    return axiosClient.post(`${this.DEFAULT_URL}`, usuario)
      .then((response) => {
        return response.data as UsuarioToken;  
      });
  }


}

export default CadastroUsuarioService;

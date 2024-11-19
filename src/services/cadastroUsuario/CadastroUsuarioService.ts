import { CadastroUsuarioForm } from "../../pages/gestao/CadastroUsuario";
import AuthService from "../AuthServices";
import http from "../SuperService";

export interface UsuarioToken {
  token: string;
  mensagem: string;
}

class CadastroUsuarioService {
  private DEFAULT_URL = "usuario";
  private empresaUiid = AuthService.getInstance().getEmpresa()?.uuid;

  async cadastrar(usuario: CadastroUsuarioForm): Promise<UsuarioToken> {
    try {
      const response = await http.post(`${this.DEFAULT_URL}/empresauuid:${this.empresaUiid}`, usuario);
      return response.data as UsuarioToken;
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error);
      throw new Error("Erro ao realizar o cadastro");
    }
  }
}

export default CadastroUsuarioService;

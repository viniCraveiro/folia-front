import { IAlertProps } from "../../pages/components/AlertProvider";
import { CadastroUsuarioForm } from "../../pages/gestao/detail/UsuarioDetail";
import { IFiltroUsuario, IUsuarioList } from "../../pages/gestao/listagem/UsuarioCollections";
import AuthService from "../AuthServices";
import http from "../SuperService";

export interface UsuarioToken {
    token: string;
    mensagem: string;
}

class UsuarioService {

    DEFAULT_URL = "usuario";
    empresaUiid = AuthService.getInstance().getEmpresa()?.uuid;

    constructor() { }

    filtrar(filtro: IFiltroUsuario, showAlert: (props: IAlertProps) => void): Promise<IUsuarioList[]> {
        return http.post(`${this.DEFAULT_URL}/filtrar`, filtro)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                showAlert({
                    message: error?.message || "Ocorreu um erro inesperado.",
                    title: error?.errorCode || "Erro",
                    type: "error",
                    hideDuration: 4000,
                });
            });
    }

    buscarBoleto(uuid: string, showAlert: (props: IAlertProps) => void): Promise<Any> {
        return http.get(`${this.DEFAULT_URL}/${uuid}`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                showAlert({
                    message: error?.message || "Ocorreu um erro inesperado.",
                    title: error?.errorCode || "Erro",
                    type: "error",
                    hideDuration: 4000,
                });
            });
    }


    async cadastrar(usuario: CadastroUsuarioForm): Promise<UsuarioToken> {
        try {
            const response = await http.post(`${this.DEFAULT_URL}/empresauuid:${this.empresaUiid}`, usuario);
            return response.data as UsuarioToken;
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            throw new Error("Erro ao realizar o cadastro");
        }
    }

    async find(uuid: string): Promise<CadastroUsuarioForm> {
        try {
            const response = await http.get(`${this.DEFAULT_URL}/buscarPorId:${uuid}`);
            return response.data as CadastroUsuarioForm;
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            throw new Error("Erro ao realizar o cadastro");
        }
    }

    async atualizar(uuid: string, usuario: CadastroUsuarioForm, showAlert: (props: IAlertProps) => void): Promise<CadastroUsuarioForm> {
        try {
            return http.put(`${this.DEFAULT_URL}/${uuid}`, usuario).then((response) => {
                console.log(response.data)
                showAlert({
                    title: "Usuario atualizado",
                    message: (`Usuario: ${response.data.nome} atualizado`) ,
                    type: "success",
                    hideDuration: 4000,
                });
                return response.data;
            }).catch((error) => {
                showAlert({
                    message: error?.message || "Ocorreu um erro inesperado.",
                    title: error?.errorCode || "Erro",
                    type: "error",
                    hideDuration: 4000,
                });
            });
        } catch (error) {

            console.error("Erro ao cadastrar usuário:", error);
            throw new Error("Erro ao realizar o cadastro");
        }
    }
}

export default UsuarioService;

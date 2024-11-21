import { IAlertProps } from "../../pages/components/AlertProvider";
import { IFiltroUsuario, IUsuarioList } from "../../pages/gestao/listagem/UsuarioCollections";
import http from "../SuperService";

class UsuarioService {

    DEFAULT_URL = "usuario";

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
}

export default UsuarioService;

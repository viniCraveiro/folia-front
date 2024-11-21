import { EmpresaBoletoData, IFiltroBoleto, UsuarioBoletoData } from "../../pages/Boleto/list/BoletoCollection";
import { StatusBoleto } from "../../pages/Boleto/StatusBoleto";
import { IAlertProps } from "../../pages/components/AlertProvider";
import http from "../SuperService";

class BoletoService {

    DEFAULT_URL = "boleto";

    constructor() { }

    filtrarBoletosUsuario(filtro: IFiltroBoleto, showAlert: (props: IAlertProps) => void): Promise<UsuarioBoletoData[]> {
        return http.post(`${this.DEFAULT_URL}/usuario/filtrar`, filtro)
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

    filtrarBoletosEmpresa(filtro: IFiltroBoleto, showAlert: (props: IAlertProps) => void): Promise<EmpresaBoletoData[]> {
        return http.post(`${this.DEFAULT_URL}/empresa/filtrar`, filtro)
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

    atualizarStatusBoleto(uuid: string, novoStatus: StatusBoleto, showAlert: (props: IAlertProps) => void): Promise<string> {
        return http.put(`${this.DEFAULT_URL}/${uuid}/status?novoStatus=${novoStatus}`)
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

export default BoletoService;

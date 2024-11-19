import { BoletoList, IFiltroBoletoUsuario } from "../../pages/Boleto/BoletoCollection";
import { IAlertProps } from "../../pages/components/AlertProvider";
import { IEmpresaData } from "../../pages/login/IEmpresaData";
import http from "../SuperService";

class BoletoService {

    DEFAULT_URL = "usuarioBoleto";

    constructor() { }

    filtrarBoletos(filtro: IFiltroBoletoUsuario, showAlert: (props: IAlertProps) => void): Promise<BoletoList[]> {
        return http.post(`${this.DEFAULT_URL}/filtrar`, filtro)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
                showAlert({
                    message: error?.message || "Ocorreu um erro inesperado.",
                    title: error?.errorCode || "Erro",
                    type: "error",
                    hideDuration: 4000,
                });
            });
    }

    getEmpresaVinculada(usuarioUUID: string): Promise<IEmpresaData> {
        return http.post(`${this.DEFAULT_URL}empresas/${usuarioUUID}`)
            .then((response) => {
                return response.data as IEmpresaData;
            });
    }
}

export default BoletoService;

import { BoletoList, IFiltroBoleto } from "../../pages/Boleto/BoletoCollection";
import { IEmpresaData } from "../../pages/login/IEmpresaData";
import axiosClient from "../SuperService";

class UsuarioBoletoService {

    DEFAULT_URL = "usuarioBoleto";

    constructor() { }

    filtrarBoletos(filtro: IFiltroBoleto): Promise<BoletoList[]> {
        return axiosClient.post(`${this.DEFAULT_URL}/filtrar`, filtro)
            .then((response) => {
                return response.data;
            });
    }

    getEmpresaVinculada(usuarioUUID: String): Promise<IEmpresaData> {
        return axiosClient.post(`${this.DEFAULT_URL}empresas/${usuarioUUID}`)
            .then((response) => {
                return response.data as IEmpresaData;
            });
    }
}

export default UsuarioBoletoService;

import { IEmpresaData } from "../../pages/login/IEmpresaData";
import LocalStorageService from "../LocalStorageService";
import axiosClient from "../SuperService";

class DashboardServices {

    constructor() { }

    getBoletosDataSet(): Promise<any> {
        const empresaUUID = LocalStorageService.getItem<IEmpresaData>("empresaKey")?.uuid;
        return axiosClient.get(`boleto/dadosBoletos/${empresaUUID}`)
            .then((response) => {
                return response.data;
            });
    }

}

export default DashboardServices;

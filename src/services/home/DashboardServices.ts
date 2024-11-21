import { IUserBoletosData } from "../../pages/home/DashboardCollections";
import { IEmpresaData } from "../../pages/login/IEmpresaData";
import LocalStorageService from "../LocalStorageService";
import http from "../SuperService";

class DashboardServices {

    constructor() { }

    getBoletosDataSet(): Promise<any> {
        const empresaUUID = LocalStorageService.getItem<IEmpresaData>("empresaKey")?.uuid;
        return http.get(`boleto/dadosBoletos/${empresaUUID}`)
            .then((response) => {
                return response.data;
            });
    }

    getUserDataSet(): Promise<IUserBoletosData[]> {
        const empresaUUID = LocalStorageService.getItem<IEmpresaData>("empresaKey")?.uuid;
        return http.get(`boleto/ultimosBoletos/${empresaUUID}`)
            .then((response) => {
                return response.data;
            });
    }

}

export default DashboardServices;

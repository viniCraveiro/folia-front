import { IBoletoList } from "../../pages/Boleto/BoletoCollection";
import { PaginatedBoletoResponse } from "../../pages/components/PaginatedList";
import AuthService from "../AuthServices";
import axiosClient from "../SuperService";

const auth = AuthService.getInstance();

class BoletoServices {

    DEFAULT_URL = "boleto/";

    constructor() { }

    getBoletosList(): Promise<any> {
        const usuarioUUID = auth.getUserUuid();
        return axiosClient.get(`${this.DEFAULT_URL}usuario/${usuarioUUID}`)
            .then((response) => {
                return response.data as PaginatedBoletoResponse<IBoletoList>;
            });
    }

}

export default BoletoServices;

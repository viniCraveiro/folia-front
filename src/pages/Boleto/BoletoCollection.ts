import { StatusBoleto } from "./StatusBoleto";


export interface IBoletoList {
    uuid: string;
    status: StatusBoleto;
    banco: string;
    parcela: string;
    vencimento: Date;
    valor: string;
}

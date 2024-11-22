import { Dayjs } from "dayjs";
import { StatusBoleto } from "../StatusBoleto";

export interface IBanco {
    nome: string;
    agencia: string;
    agenciaDigito: string;
    conta: string;
    contaDigito: string;
    id: string;
}

export class BoletoData {
    uuid: string;
    numero: string;
    banco: IBanco;
    estabelecimento: string;
    status: StatusBoleto;
    dataEmissao: Dayjs;
    dataVencimento: Dayjs;
    valor: number;
    parcela: string;
    totalParcelas: string;
    descricao?: string;
    url: string;

    constructor(
        uuid: string,
        banco: IBanco,
        estabelecimento: string,
        status: StatusBoleto,
        dataEmissao: Dayjs,
        dataVencimento: Dayjs,
        valor: number,
        parcela: string,
        totalParcelas: string,
        url: string,
        descricao?: string,
    ) {
        this.uuid = uuid;
        this.banco = banco;
        this.estabelecimento = estabelecimento;
        this.status = status;
        this.dataEmissao = dataEmissao;
        this.dataVencimento = dataVencimento;
        this.valor =  valor;
        this.parcela = parcela;
        this.totalParcelas = totalParcelas;
        this.url = url;
        this.descricao = descricao;
    }
}

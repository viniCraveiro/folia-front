import { StatusBoleto } from "./StatusBoleto";
import { Dayjs } from "dayjs";


export interface IFiltroBoleto {
    identificacao?: string;
    nome?: string;
    dataInicialEmissao?: Dayjs;
    dataFinalEmissao?: Dayjs;
    dataInicialVencimento?: Dayjs;
    dataFinalVencimento?: Dayjs;
    status?: StatusBoleto;
}


export class BoletoList {
    nome: string;
    usuario: string;
    banco: string;
    valor: string;
    parcela: string;
    dataEmissao: Dayjs;
    dataVencimento: Dayjs;
    status: StatusBoleto;

    constructor(
        nome: string,
        usuario: string,
        banco: string,
        valor: string,
        parcela: string,
        dataEmissao: Dayjs,
        dataVencimento: Dayjs,
        status: StatusBoleto
    ) {
        this.nome = nome;
        this.usuario = usuario;
        this.banco = banco;
        this.valor = valor;
        this.parcela = parcela;
        this.dataEmissao = dataEmissao;
        this.dataVencimento = dataVencimento;
        this.status = status;
    }
}



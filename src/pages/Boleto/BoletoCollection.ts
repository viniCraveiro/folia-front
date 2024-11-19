import { StatusBoleto } from "./StatusBoleto";
import { Dayjs } from "dayjs";


export interface IFiltroBoletoUsuario {
    userUuid: string | null;
    banco: string | null;
    dataInicialEmissao: Dayjs | null;
    dataFinalEmissao: Dayjs | null;
    dataInicialVencimento: Dayjs | null;
    dataFinalVencimento: Dayjs | null;
    status: StatusBoleto | null;
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

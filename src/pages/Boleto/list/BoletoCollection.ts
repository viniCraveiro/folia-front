import { Dayjs } from "dayjs";
import { StatusBoleto } from "../StatusBoleto";

export interface IFiltroBoleto {
    usuarioUUID: string | null;
    empresaUUID: string | null;
    banco: string | null;
    nome: string | null;
    identificacao: string | null;
    numero: string | null;
    dataInicialEmissao: Dayjs | null;
    dataFinalEmissao: Dayjs | null;
    dataInicialVencimento: Dayjs | null;
    dataFinalVencimento: Dayjs | null;
    status: StatusBoleto | null;
}

export const newFiltro = () => {
    return {
        usuarioUUID: null,
        empresaUUID: null,
        nome: "",
        identificacao: "",
        numero: "",
        banco: "",
        dataInicialEmissao: null,
        dataFinalEmissao: null,
        dataInicialVencimento: null,
        dataFinalVencimento: null,
        status: null,
    };
};

export class UsuarioBoletoData {
    uuid: string;
    nome: string;
    usuario: string;
    banco: string;
    valor: string;
    parcela: string;
    dataEmissao: Dayjs;
    dataVencimento: Dayjs;
    url: string;
    status: StatusBoleto;

    constructor(
        uuid: string,
        nome: string,
        usuario: string,
        banco: string,
        valor: string,
        parcela: string,
        dataEmissao: Dayjs,
        dataVencimento: Dayjs,
        url: string,
        status: StatusBoleto
    ) {
        this.uuid = nome;
        this.nome = nome;
        this.usuario = usuario;
        this.banco = banco;
        this.valor = valor;
        this.parcela = parcela;
        this.dataEmissao = dataEmissao;
        this.dataVencimento = dataVencimento;
        this.url = url;
        this.status = status;
    }
}

export class EmpresaBoletoData {
    uuid: string;
    identificacao: string;
    nome: string;
    usuario: string;
    banco: string;
    valor: string;
    parcela: string;
    dataEmissao: Dayjs;
    dataVencimento: Dayjs;
    status: StatusBoleto;
    url: string;

    constructor(
        uuid: string,
        identificacao: string,
        nome: string,
        usuario: string,
        banco: string,
        valor: string,
        parcela: string,
        dataEmissao: Dayjs,
        dataVencimento: Dayjs,
        url: string,
        status: StatusBoleto
    ) {
        this.uuid = nome;
        this.identificacao = usuario;
        this.nome = nome;
        this.usuario = usuario;
        this.banco = banco;
        this.valor = valor;
        this.parcela = parcela;
        this.dataEmissao = dataEmissao;
        this.dataVencimento = dataVencimento;
        this.url = url;
        this.status = status;
    }
}

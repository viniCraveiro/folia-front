import { UserRole } from "../../../models/UserRole";
import AuthService from "../../../services/AuthServices";

export enum ResumoStatus {
    RUIM = "#F93535",
    MEDIO = "#F9AB35",
    BOM = "#34C759"
}

export const getBarColor = (value: number) => {
    if (value < 33) {
        return ResumoStatus.RUIM; 
    }
    if (value < 66) {
        return ResumoStatus.MEDIO; 
    }
    return ResumoStatus.BOM; 

};

export interface IUsuarioList {
    id: string,
    identificacao: string,
    nome: string,
    boletosTotal: number,
    boletosPagos: number,
}

export interface IFiltroUsuario {
    empresaUUID: string | null,
    identificacao: string | null,
    nome: string | null,
    tipoUsuario: UserRole | null,
}

export const newFiltro = () => {
    return {
        empresaUUID: AuthService.getInstance().getEmpresa()?.uuid ?? null,
        nome: "",
        idendificacao: "",
        tipoUsuario: null,
    };
};

export interface IResumoHeader {
    cor: string,
    label: string,
}

export interface IBoletoData {
    total: number;
    abertos: number;
    vencidos: number;
    pagos: number;
}

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomName = (): string => {
    const names = ["João", "Maria", "Ana", "Lucas", "Paulo", "Fernanda", "Carlos", "Bruna", "Mateus", "Gabriela"];
    return names[getRandomInt(0, names.length - 1)];
};

const generateUsuarioList = (): IUsuarioList[] => {
    return Array.from({ length: 20 }, (_, index) => {
        const boletosTotal = getRandomInt(1, 50);
        const boletosPagos = getRandomInt(0, boletosTotal);

        return {
            idendificacao: `user_${index + 1}`,
            nome: getRandomName(),
            boletosTotal,
            boletosPagos,
        };
    });
};
//


export class UsuarioList {
    protected usuarioList: IUsuarioList[];

    constructor() {
        this.usuarioList = generateUsuarioList();
    }

    get list() {
        return this.usuarioList;
    }
}

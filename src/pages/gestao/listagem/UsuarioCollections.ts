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
    idendificacao: string,
    nome: string,
    boletosTotal: number,
    boletosPagos: number,
}

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

const BoletoHeader: Record<string, IResumoHeader> = {
    total: { cor: "#34C759", label: "Total" },
    abertos: { cor: "#F9AB35", label: "Abertos" },
    vencidos: { cor: "#356CF9", label: "Vencidos" },
    pagos: { cor: "#F93535", label: "Pagos" },
};

// Helpers de test:
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

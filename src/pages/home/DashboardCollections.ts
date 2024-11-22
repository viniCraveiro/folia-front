
interface IBoletoStatus {
    cor: string;
    status: string;
}

const BoletoStatusConfig: Record<string, IBoletoStatus> = {
    pagos: { cor: "#34C759", status: "Pagos:" },
    proximosDoVencimento: { cor: "#F9AB35", status: "Próximos do Vencimento:" },
    emAberto: { cor: "#356CF9", status: "Em Aberto:" },
    vencidos: { cor: "#F93535", status: "Vencidos:" },
};

const BalancoStatusConfig: Record<string, IBoletoStatus> = {
    total: { cor: "#000000", status: "Total de boletos" },
    pagos: { cor: "#29CB97", status: "Total pagos" },
    cancelados: { cor: "#B558F6", status: "Total cancelados" },
    vencidos: { cor: "#DA6560", status: "Total vencidos" },
};

export enum TimeRangeEnum {
    mes = "mes",
    semana = "semana",
    ano = "ano",
}

export enum GraficoTypeEnum {
    bar = "bar",
    line = "line",
    pie = "pie",
}

export interface IBoletosData {
    quantidadeBoletos: number;
    quantidadeBoletosAberto: number;
    quantidadeBoletosVencido: number;
    quantidadeBoletosProximosVencimento: number;
}

export interface IUserBoletosData {
    identificacao: string;
    nome: string;
    usuario: string;
    quantidadeBoletos: number;
    quantidadeBoletosAbertos: number;
    quantidadeBoletosVencidos: number;
}

export class DashboardDataSet {
    public data: IBoletosData;

    constructor() {
        this.data = {
            quantidadeBoletos: 0,
            quantidadeBoletosAberto: 0,
            quantidadeBoletosVencido: 0,
            quantidadeBoletosProximosVencimento: 0
        };
    }

    get dataSet() {
        const dataGraph = [
            { id: 0, color: BoletoStatusConfig["pagos"].cor, value: this.data.quantidadeBoletos - this.data.quantidadeBoletosAberto, label: BoletoStatusConfig["pagos"].status },
            { id: 1, color: BoletoStatusConfig["proximosDoVencimento"].cor, value: this.data.quantidadeBoletosProximosVencimento, label: BoletoStatusConfig["proximosDoVencimento"].status },
            { id: 2, color: BoletoStatusConfig["emAberto"].cor, value: this.data.quantidadeBoletosAberto, label: BoletoStatusConfig["emAberto"].status },
            { id: 3, color: BoletoStatusConfig["vencidos"].cor, value: this.data.quantidadeBoletosVencido, label: BoletoStatusConfig["vencidos"].status }
        ];
        return dataGraph;
    }

    get balancodataSet() {
        const dataGraph = [
            { id: 0, color: BalancoStatusConfig["total"].cor, value: this.data.quantidadeBoletos, label: BalancoStatusConfig["total"].status },
            { id: 1, color: BalancoStatusConfig["pagos"].cor, value: this.data.quantidadeBoletos - this.data.quantidadeBoletosAberto, label: BalancoStatusConfig["pagos"].status },
            { id: 3, color: BalancoStatusConfig["vencidos"].cor, value: this.data.quantidadeBoletosVencido, label: BalancoStatusConfig["vencidos"].status }
        ];
        return dataGraph;
    }
}

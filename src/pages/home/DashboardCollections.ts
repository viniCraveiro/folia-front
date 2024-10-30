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
}

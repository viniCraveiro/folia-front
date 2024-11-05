import { Dayjs } from "dayjs";

export interface IUsuarioFiltro {
    idendificacao?: string;
    nome?: string;
    dataInicial?: Dayjs;
    dataFinal?: Dayjs;
}

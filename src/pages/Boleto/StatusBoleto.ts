
export enum StatusBoleto {
    PAGO = "PAGO",
    VENCIDO = "VENCIDO",
    ABERTO = "ABERTO",
    RENEGOCIADO = "RENEGOCIADO"
}

export const handleStyleChips = (status: StatusBoleto) => {
    switch (status) {
      case StatusBoleto.ABERTO:
        return "default";
      case StatusBoleto.PAGO:
        return "success";
      case StatusBoleto.VENCIDO:
        return "error";
      default:
        return "default";
    }
  };

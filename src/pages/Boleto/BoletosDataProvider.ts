import { StatusBoleto } from "./StatusBoleto";

export const boletos = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    status: [
        StatusBoleto.ABERTO,
        StatusBoleto.PAGO,
        StatusBoleto.VENCIDO
    ][Math.floor(Math.random() * 3)], // Randomly assign status
    descricao: `Descrição do boleto ${index + 1}`,
    numero: (Math.floor(Math.random() * 90000) + 10000).toString(), // Random 5-digit number
    banco: ['Banco do Brasil', 'Itaú', 'Caixa', 'Santander', 'Bradesco'][Math.floor(Math.random() * 5)], // Random bank
    parcela: Math.floor(Math.random() * 5) + 1, // Random installment between 1 and 5
    vencimento: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0], // Random due date in 2024
    valor: (Math.random() * 1000).toFixed(2), // Random value between 0 and 1000
}));

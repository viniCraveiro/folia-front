import { Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => {
            let color:  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
            switch (params.value) {
                case 'Pendente':
                    color = 'warning';
                    break;
                case 'Pago':
                    color = 'success';
                    break;
                case 'Atrasado':
                    color = 'error';
                    break;
                default:
                    color = 'default';
            }
            return <Chip label={params.value} color={color} />;
        },
    },
    { field: 'descricao', headerName: 'Descrição', width: 300 },
    { field: 'numero', headerName: 'Número', width: 100 },
    { field: 'banco', headerName: 'Banco', width: 100 },
    { field: 'parcela', headerName: 'Parcela', width: 75 },
    { field: 'vencimento', headerName: 'Vencimento', width: 120 },
    { field: 'valor', headerName: 'Valor', width: 120, type: 'number' },
    { field: 'acoes', headerName: 'Ações', width: 100 },
];

const rows = [
    {
        id: 1,
        status: 'Pendente',
        descricao: 'Pagamento de fatura de cartão',
        numero: '12345',
        banco: 'Banco do Brasil',
        parcela: 1,
        vencimento: '2024-10-01',
        valor: 150.00,
        acoes: 'Editar',
    },
    {
        id: 2,
        status: 'Pago',
        descricao: 'Compra na loja',
        numero: '54321',
        banco: 'Itaú',
        parcela: 2,
        vencimento: '2024-09-15',
        valor: 250.00,
        acoes: 'Ver',
    },
    {
        id: 3,
        status: 'Atrasado',
        descricao: 'Pagamento de conta de luz',
        numero: '67890',
        banco: 'Caixa',
        parcela: 1,
        vencimento: '2024-08-20',
        valor: 75.00,
        acoes: 'Remover',
    },
    {
        id: 4,
        status: 'Pendente',
        descricao: 'Pagamento de seguro',
        numero: '09876',
        banco: 'Santander',
        parcela: 3,
        vencimento: '2024-09-30',
        valor: 100.00,
        acoes: 'Editar',
    },
    {
        id: 5,
        status: 'Pago',
        descricao: 'Mensalidade da escola',
        numero: '11223',
        banco: 'Bradesco',
        parcela: 1,
        vencimento: '2024-09-10',
        valor: 300.00,
        acoes: 'Ver',
    },
];



const Boleto = () => {
    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                sx={{ border: 0, maxHeight: '60vh', minHeight: '60vh' }}
            ></DataGrid>
        </>
    );
};

export default Boleto;

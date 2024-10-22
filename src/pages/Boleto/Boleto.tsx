import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { boletos } from './BoletosDataProvider';
import { StatusBoleto } from './StatusBoleto';

const columns: GridColDef[] = [
    { field: 'status', headerName: 'Status' },
    { field: 'descricao', headerName: 'Descrição', width: 300 },
    { field: 'numero', headerName: 'Número', width: 200 },
    { field: 'banco', headerName: 'Banco', width: 100 },
    { field: 'parcela', headerName: 'Parcela', width: 75 },
    { field: 'vencimento', headerName: 'Vencimento', width: 120 },
    { field: 'valor', headerName: 'Valor', width: 120, type: 'number' },
    { field: 'acoes', headerName: '', cellClassName: 'justify-end' },
];

const handleStyleChips = (status: StatusBoleto) => {
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

const Boleto = () => {

    return (
        <TableContainer component={Paper} sx={{ minHeight: '80vh', maxHeight: '80vh', border: '1px solid red', maxWidth: '100%' }} >
            <Table sx={{}} size='small'>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            return <TableCell key={column.field} className={column.cellClassName as string}>{column.headerName}</TableCell>;
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {boletos.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" className='w-10'>
                                <Chip label={row.status} color={handleStyleChips(row.status)} />
                            </TableCell>
                            <TableCell >{row.descricao}</TableCell>
                            <TableCell>{row.numero}</TableCell>
                            <TableCell>{row.banco}</TableCell>
                            <TableCell>{row.parcela}</TableCell>
                            <TableCell>{row.vencimento}</TableCell>
                            <TableCell sx={{ textAlign: 'end' }}>R$ {row.valor}</TableCell>
                            <TableCell sx={{ textAlign: 'end', width: 150 }}>
                                <IconButton size='small' sx={{ width: 35 }}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton size='small' sx={{ width: 35 }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton size='small' sx={{ width: 35 }}>
                                    <DownloadIcon />
                                </IconButton>
                                <IconButton size='small' sx={{ width: 35 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default Boleto;

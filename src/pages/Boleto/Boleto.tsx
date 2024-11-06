import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Box,
    Button,
    Chip,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import TableHeader from "../components/TableHeader";
import { FiltroAvancadoUsuario } from "../gestao/listagem/FiltroAvancadoUsuario";
import { boletos } from "./BoletosDataProvider";
import { StatusBoleto } from "./StatusBoleto";

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 120 },
  { field: "descricao", headerName: "Descrição", width: 200 },
  { field: "numero", headerName: "Número", width: 120 },
  { field: "banco", headerName: "Banco", width: 120 },
  { field: "parcela", headerName: "Parcela", width: 75 },
  { field: "vencimento", headerName: "Vencimento", width: 120 },
  { field: "valor", headerName: "Valor", width: 120, type: "number" },
  { field: "acoes", headerName: "", cellClassName: "justify-end", width: 120 },
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
  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFiter = () => setFilterOpen(false);

  return (
    <Box className="p-8">
      <Box className="mb-2 gap-4 grid grid-cols-2 justify-between items-center">
        <Box>
          <TextField
            fullWidth
            id="search"
            label="Buscar por número"
            name="filsearchtro"
            variant="standard"
            size="small"
            color="primary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton className="mb-4">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className="grid grid-cols-2 gap-2">
          <Box>
            <IconButton
              size="small"
              sx={{ width: 35 }}
              onClick={() => {
                handleOpenFilter();
              }}
            >
              <FilterAltIcon
                sx={{
                  alignContent: "center",
                  color: "primary.main",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              />
            </IconButton>
            <div>
              <FiltroAvancadoUsuario
                open={isFilterOpen}
                onClose={handleCloseFiter}
                title="Custom Modal Title"
                description="Custom modal description here."
              />
            </div>
          </Box>
          <Box>
            <Box className="gap-2 flex flex-row-reverse items-center">
              <Button
                className="w-2/5"
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  borderRadius: 4,
                  p: 1,
                }}
              >
                <Typography variant="body2">Ações</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          border: "2px solid",
          borderColor: "primary.main",
          borderRadius: 1,
        }}
      >
        <Box
          component={Paper}
          sx={{
            maxWidth: "100%",
          }}
        >
          <TableHeader columns={columns} />
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            minHeight: "76vh",
            maxHeight: "76vh",
            maxWidth: "100%",
          }}
          className="rounded-b-lg mt-1"
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.field}
                      style={{ width: column.width }}
                      className="p-0"
                    ></TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {boletos.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Chip
                    
                      label={row.status}
                      color={handleStyleChips(row.status)}
                    />
                  </TableCell>
                  <TableCell>{row.descricao}</TableCell>
                  <TableCell>{row.numero}</TableCell>
                  <TableCell>{row.banco}</TableCell>
                  <TableCell>{row.parcela}</TableCell>
                  <TableCell>{row.vencimento}</TableCell>
                  <TableCell>R$ {row.valor}</TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    <IconButton
                      size="small"
                      sx={{ width: 20, height: 20, p: 0, m: 0, mr: 1.5 }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ width: 20, height: 20, p: 0, m: 0, mr: 1.5 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ width: 20, height: 20, p: 0, m: 0, mr: 1.5 }}
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ width: 20, height: 20, p: 0, m: 0, mr: 1.5 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Boleto;

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
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
import theme from "../../../layout/Theme";
import { normalise, ProgressBar } from "../../components/ProgressBar";
import { getBarColor, UsuarioList } from "./UsuarioCollections";

const columns: GridColDef[] = [
  { field: "idendificacao", headerName: "Idendificação", width: 100 },
  { field: "nome", headerName: "Nome", width: 300 },
  { field: "abertos", headerName: "Boletos pagos", width: 30 },
  { field: "total", headerName: "Total de Boletos", width: 30 },
  { field: "balanco", headerName: "Resumo de Boletos", width: 300 },
  { field: "acoes", headerName: "", cellClassName: "justify-end", width: 50 },
];

const ListagemUsuario = () => {
  const [listUsuario] = useState<UsuarioList>(new UsuarioList());

  return (
    <Box className="p-8">
      <Box className="mb-4 gap-2 grid grid-cols-2 justify-between items-center">
        <Box>
          <TextField
            fullWidth
            id="search"
            label="Buscar por nome ou idendificação"
            name="filsearchtro"
            variant="standard"
            size="small"
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
            <Button
              className="items-center"
              variant="contained"
              startIcon={<FilterAltIcon />}
              sx={{ maxWidth: 100 }}
            />
          </Box>
          <Box>
            <Box className="gap-4 flex flex-row items-center">
              <Button
                className="w-1/2"
                variant="contained"
                startIcon={<AddCircleIcon />}
              >
                <Typography variant="body2">Criar usuário</Typography>
              </Button>
              <Button
                className="w-1/2"
                variant="contained"
                startIcon={<SearchIcon />}
              >
                <Typography variant="body2">Ações</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          minHeight: "80vh",
          maxHeight: "80vh",
          border: "1px solid red",
          maxWidth: "100%",
        }}
      >
        <Table sx={{}} size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.field}
                    style={{ width: column.width }}
                    className={column.cellClassName as string}
                    sx={{
                      backgroundColor: theme.palette.grey[300],
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {listUsuario.list.map((row) => (
              <TableRow
                key={row.idendificacao}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.idendificacao}</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.boletosPagos}</TableCell>
                <TableCell>{row.boletosTotal}</TableCell>
                <TableCell>
                  <Stack spacing={0} sx={{ flexGrow: 11 }}>
                    <Box className="flex flex-row  justify-between items-center">
                      <Typography
                        variant="body2"
                        className="items-center"
                        sx={{ color: "text.secondary" }}
                      >
                        Boletos Pagos
                      </Typography>
                      <Typography
                        variant="body2"
                        className="items-center"
                        sx={{ color: "text.secondary", mr: 6 }}
                      >
                        Total de Boletos
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <ProgressBar
                          barcolor={getBarColor(
                            normalise(row.boletosPagos, row.boletosTotal)
                          )}
                          barheight={8}
                          variant="determinate"
                          value={normalise(row.boletosPagos, row.boletosTotal)}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >{`${Math.round(
                          normalise(row.boletosPagos, row.boletosTotal)
                        )}%`}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ textAlign: "end" }}>
                  <IconButton size="small" sx={{ width: 35 }}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ width: 35 }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListagemUsuario;

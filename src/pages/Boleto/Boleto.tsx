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
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AuthService from "../../services/AuthServices";
import BoletoService from "../../services/boletos/BoletoService";
import { useAlert } from "../components/AlertProvider";
import TableHeader from "../components/TableHeader";
import { BoletoList, IFiltroBoletoUsuario } from "./BoletoCollection";
import { FiltroBoletosUsuario } from "./FiltroBoletosUsuario";
import { handleStyleChips } from "./StatusBoleto";

const boletoService = new BoletoService();

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 100 },
  { field: "banco", headerName: "Banco", width: 200 },
  { field: "parcela", headerName: "Parcela", width: 100 },
  { field: "dataEmissao", headerName: "Data de emissão", width: 140 },
  { field: "dataVencimento", headerName: "Data de vencimento", width: 140 },
  { field: "valor", headerName: "Valor", width: 80, type: "number" },
  { field: "acoes", headerName: "", cellClassName: "justify-end", width: 130 },
];



const Boleto = () => {
  const userUuid = AuthService.getInstance().getUserUuid();
  const defaultFilter = {
    userUuid: userUuid,
    banco: null,
    dataInicialEmissao: null,
    dataFinalEmissao: null,
    dataInicialVencimento: null,
    dataFinalVencimento: null,
    status: null,
  }
  const [list, setList] = useState<BoletoList[]>([]);
  const [filtroBoleto, setFiltroBoleto] = useState<IFiltroBoletoUsuario>(defaultFilter);

  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFiter = () => setFilterOpen(false);
  const { showAlert } = useAlert();

  const filter = (filtro: IFiltroBoletoUsuario) => {
    boletoService.filtrarBoletos(filtro, showAlert).then((response) => {
      if (response) {
        if (response.length === 0) {
          showAlert({
            message: "Verifique seus filtros",
            title: "Nenhum resultado encontrado.",
            type: "info",
            hideDuration: 2000,
          });
          return;
        }
        setList(response);
      }
    });
  };

  const resetFilter = () => {
    setFiltroBoleto(defaultFilter);
    filter(filtroBoleto);
    handleCloseFiter();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        boletoService.filtrarBoletos(filtroBoleto , showAlert).then((response) => {
          if (response) {
            setList(response);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
              <FiltroBoletosUsuario
                open={isFilterOpen}
                onReset={resetFilter}
                onClose={handleCloseFiter}
                filtroProps={filtroBoleto}
                onSubmit={filter}
                uuidUser={userUuid}
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
        <TableContainer
          component={Paper}
          sx={{
            minHeight: "76vh",
            maxHeight: "76vh",
            maxWidth: "100%",
          }}
          className="rounded-b-lg mt-1"
        >
          <Table stickyHeader size="small">
            <TableHeader columns={columns} />
            <TableBody
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {list.map((row, index) => (
                <TableRow key={row.nome + index}>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={handleStyleChips(row.status)}
                      sx={{
                        maxWidth: 90,
                        minWidth: 90,
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.banco}</TableCell>
                  <TableCell>{row.parcela}</TableCell>
                  <TableCell>
                    {dayjs(row.dataEmissao).format("DD/MM/YYYY").toString()}
                  </TableCell>
                  <TableCell>
                    {dayjs(row.dataVencimento).format("DD/MM/YYYY").toString()}
                  </TableCell>
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

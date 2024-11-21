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
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthServices";
import UsuarioService from "../../../services/usuario/UsuarioService";
import { useAlert } from "../../components/AlertProvider";
import { normalise, ProgressBar } from "../../components/ProgressBar";
import TableHeader from "../../components/TableHeader";
import {
  getBarColor,
  IFiltroUsuario,
  IUsuarioList,
  newFiltro,
  UsuarioList,
} from "./UsuarioCollections";

const columns: GridColDef[] = [
  { field: "idendificacao", headerName: "Idendificação", width: 180 },
  { field: "nome", headerName: "Nome", width: 400 },
  { field: "abertos", headerName: "Boletos pagos", width: 150 },
  { field: "total", headerName: "Total de Boletos", width: 150 },
  { field: "balanco", headerName: "Resumo de Boletos", width: 300 },
  { field: "acoes", headerName: "", cellClassName: "justify-end", width: 100 },
];

const usuarioService = new UsuarioService();

const ListagemUsuario = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [listUsuario, setListUsuario] = useState<IUsuarioList[]>([]);
  const [filtroUsuario, setFiltroUsuario] = useState<IFiltroUsuario>(newFiltro());

  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFilter = () => setFilterOpen(false);

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const empresaUuid = AuthService.getInstance().getEmpresa()?.uuid ?? null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      filter(filtroUsuario);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFiltroUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filter = (filtro: IFiltroUsuario) => {
    filtro.empresaUUID = empresaUuid;
    usuarioService.filtrar(filtro, showAlert).then((response) => {
      if (response) {
        setListUsuario(response);
        if (response.length === 0) {
          showAlert({
            message: "Verifique seus filtros",
            title: "Nenhum resultado encontrado.",
            type: "info",
            hideDuration: 2000,
          });
        }
      }
    });
  };

  const resetFilter = () => {
    setFiltroUsuario(newFiltro());
    filter(filtroUsuario);
    handleCloseFilter();
  };

  useEffect(() => {
    filter(filtroUsuario);
  }, []);

  return (
    <Box className="p-8">
      <Box className="mb-2 gap-4 grid grid-cols-2 justify-between items-center">
        <Box>
          <TextField
            fullWidth
            id="search"
            label="Buscar por nome ou idendificação"
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
              <Button
                className="w-2/5"
                variant="contained"
                startIcon={<AddCircleIcon />}
                sx={{
                  borderRadius: 4,
                  p: 1,
                }}
                onClick={() => {}}
              >
                <Typography variant="body2">Criar usuário</Typography>
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
        >
          <Table stickyHeader size="small">
            <TableHeader columns={columns} />
            <TableBody
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {listUsuario.map((row, index) => (
                <TableRow key={row.identificacao + index}>
                  <TableCell>{row.identificacao}</TableCell>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.boletosPagos}</TableCell>
                  <TableCell>{row.boletosTotal}</TableCell>
                  <TableCell>
                    <Stack spacing={0} sx={{ flexGrow: 2 }}>
                      <Box className="flex flex-row justify-between items-center">
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            p: 0,
                            m: 0,
                            mb: -1.05,
                          }}
                        >
                          Boletos Pagos
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: "100%", mr: 1 }}>
                          <ProgressBar
                            barcolor={getBarColor(
                              normalise(row.boletosPagos, row.boletosTotal)
                            )}
                            barheight={4}
                            variant="determinate"
                            value={normalise(
                              row.boletosPagos,
                              row.boletosTotal
                            )}
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

export default ListagemUsuario;

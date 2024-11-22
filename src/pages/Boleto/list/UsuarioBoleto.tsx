import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
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
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthServices";
import BoletoService from "../../../services/boletos/BoletoService";
import { useAlert } from "../../components/AlertProvider";
import { monetarioValue } from "../../components/MonetarioUtil";
import TableHeader from "../../components/TableHeader";
import { downloadURL } from "../../components/UrlAPIUtil";
import { BoletoStatusModal, IBoletoStatus } from "../BoletoStatusModal";
import { FiltroBoletosUsuario } from "../FiltroBoletosUsuario";
import { handleStyleChips, StatusBoleto } from "../StatusBoleto";
import {
  IFiltroBoleto,
  newFiltro,
  UsuarioBoletoData,
} from "./BoletoCollection";

const boletoService = new BoletoService();

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 150 ,sortable: true},
  { field: "banco", headerName: "Banco", width: 200 ,sortable: true},
  { field: "parcela", headerName: "Parcela", width: 150 ,sortable: true},
  { field: "dataEmissao", headerName: "Data de emissão", width: 150 ,sortable: true},
  { field: "dataVencimento", headerName: "Data de vencimento", width: 150 ,sortable: true},
  { field: "valor", headerName: "Valor", width: 150, type: "number" ,sortable: true},
  { field: "acoes", headerName: "", cellClassName: "justify-end", width: 120 ,sortable: false},
];

const UsuarioBoletoList = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const empresaUuid = AuthService.getInstance().getUserUuid();
  const [list, setList] = useState<UsuarioBoletoData[]>([]);
  const [filtroBoleto, setFiltroBoleto] = useState<IFiltroBoleto>(newFiltro());
  const [statusBoletoModal, setStatusBoletoModal] = useState<IBoletoStatus>({
    novoStatus: StatusBoleto.ABERTO,
    uuid: "",
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");

  const handleCloseFiter = () => setFilterOpen(false);
  const handleCloseStatus = () => setStatusOpen(false);
  const handleOpenFilter = () => setFilterOpen(true);
  const handleOpenStatus = (status: StatusBoleto, uuid: string) => {
    setStatusBoletoModal({
      novoStatus: status,
      uuid: uuid,
    });
    setStatusOpen(true);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      filter(filtroBoleto);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFiltroBoleto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSort = (column: string) => {
    if (orderBy === column) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrderDirection("asc");
    }
  };
  const filter = (filtro: IFiltroBoleto) => {
    filtro.usuarioUUID = empresaUuid;
    boletoService.filtrarBoletosUsuario(filtro, showAlert).then((response) => {
      if (response) {
        if (response.length === 0) {
          showAlert({
            message: "Verifique seus filtros",
            title: "Nenhum resultado encontrado.",
            type: "info",
            hideDuration: 2000,
          });
        }
        setList(response);
      }
    });
  };

  const resetFilter = () => {
    setFiltroBoleto(newFiltro());
    filter(filtroBoleto);
    handleCloseFiter();
  };

  useEffect(() => {
    filter(filtroBoleto);
  }, [statusBoletoModal]);

  const sortedList = useMemo(() => {
    if (!orderBy) return list;
  
    return [...list].sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
  
      if (valueA < valueB) return orderDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return orderDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [list, orderBy, orderDirection]);

  return (
    <Box className="p-8">
      <div>
        <BoletoStatusModal
          open={statusOpen}
          onClose={handleCloseStatus}
          boletosProps={statusBoletoModal}
          filter={() => filter(filtroBoleto)}
        />
      </div>
      <Box className="mb-2 gap-4 grid grid-cols-2 justify-between items-center">
        <Box>
          <TextField
            fullWidth
            id="identificacao"
            label="Buscar por banco"
            name="banco"
            variant="standard"
            size="small"
            color="primary"
            value={filtroBoleto.banco}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="mb-4"
                    onClick={() => filter(filtroBoleto)}
                  >
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
                open={filterOpen}
                onReset={resetFilter}
                onClose={handleCloseFiter}
                filtroProps={filtroBoleto}
                onSubmit={filter}
              />
            </div>
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
            <TableHeader
              columns={columns}
              orderBy={orderBy}
              orderDirection={orderDirection}
              onSort={handleSort}
            />
            <TableBody
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {sortedList.map((row, index) => (
                <TableRow key={row.uuid + index}>
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
                  <TableCell>
                    {row.parcela} / {row.totalParcelas}
                  </TableCell>
                  <TableCell>
                    {dayjs(row.dataEmissao).format("DD/MM/YYYY").toString()}
                  </TableCell>
                  <TableCell>
                    {dayjs(row.dataVencimento).format("DD/MM/YYYY").toString()}
                  </TableCell>
                  <TableCell>{monetarioValue(row.valor)}</TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    <IconButton
                      size="small"
                      sx={{ width: 20, height: 20, p: 0, m: 0, mr: 1.5 }}
                      onClick={() =>
                        navigate("/boleto/detail", {
                          state: { uuid: row.uuid },
                        })
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ width: 20, height: 20, p: 0, m: 0, mr: 1.5 }}
                      onClick={() => handleOpenStatus(row.status, row.uuid)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ width: 20, height: 20, p: 0, m: 0, mr: 1.5 }}
                      onClick={() => downloadURL(row.url, showAlert)}
                    >
                      <DownloadIcon />
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

export default UsuarioBoletoList;

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
import { ChangeEvent, useEffect, useState } from "react";
import AuthService from "../../../services/AuthServices";
import BoletoService from "../../../services/boletos/BoletoService";
import { useAlert } from "../../components/AlertProvider";
import TableHeader from "../../components/TableHeader";
import { BoletoStatusModal, IBoletoStatus } from "../BoletoStatusModal";
import { FiltroBoletosEmpresa } from "../FiltroBoletosEmpresa";
import { handleStyleChips, StatusBoleto } from "../StatusBoleto";
import {
  EmpresaBoletoData,
  IFiltroBoleto,
  newFiltro,
} from "./BoletoCollection";

const boletoService = new BoletoService();

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 100 },
  { field: "identificacao", headerName: "Identificação", width: 120 },
  { field: "nome", headerName: "Nome", width: 250 },
  { field: "banco", headerName: "Banco", width: 200 },
  { field: "parcela", headerName: "Parcela", width: 60 },
  { field: "dataEmissao", headerName: "Data de emissão", width: 140 },
  { field: "dataVencimento", headerName: "Data de vencimento", width: 140 },
  { field: "valor", headerName: "Valor", width: 80, type: "number" },
  { field: "acoes", headerName: "", cellClassName: "justify-end", width: 130 },
];

const EmpresaBoletoList = () => {
  const { showAlert } = useAlert();
  const empresaUuid = AuthService.getInstance().getEmpresa()?.uuid ?? null;
  const [list, setList] = useState<EmpresaBoletoData[]>([]);
  const [filtroBoleto, setFiltroBoleto] = useState<IFiltroBoleto>(newFiltro());
  const [statusBoletoModal, setStatusBoletoModal] = useState<IBoletoStatus>({
    novoStatus: StatusBoleto.ABERTO,
    uuid: "",
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const handleOpenFilter = () => setFilterOpen(true);
  const handleOpenStatus = (status: StatusBoleto, uuid: string) => {
    setStatusBoletoModal({
      novoStatus: status,
      uuid: uuid,
    });
    setStatusOpen(true);
  };
  const handleCloseFilter = () => setFilterOpen(false);
  const handleCloseStatus = () => setStatusOpen(false);
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
  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {},
      });

      if (!response.ok) {
        throw new Error("Erro ao baixar o arquivo");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "arquivo.pdf";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      showAlert({
        title: "Erro ao baixar o arquivo",
        message: `O boleto não esta em um formato valido: ${url}`,
        type: "warning",
        hideDuration: 3000,
      });
      console.error("Erro ao baixar o arquivo:", error);
    }
  };

  const filter = (filtro: IFiltroBoleto) => {
    filtro.empresaUUID = empresaUuid;
    boletoService.filtrarBoletosEmpresa(filtro, showAlert).then((response) => {
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
    handleCloseFilter();
  };

  useEffect(() => {
    filter(filtroBoleto);
  }, [statusBoletoModal]);

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
            label="Buscar por identificação"
            name="identificacao"
            variant="standard"
            size="small"
            color="primary"
            value={filtroBoleto.identificacao}
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
              <FiltroBoletosEmpresa
                open={filterOpen}
                onReset={resetFilter}
                onClose={handleCloseFilter}
                filtroProps={filtroBoleto}
                onSubmit={filter}
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
                  <TableCell>{row.identificacao}</TableCell>
                  <TableCell>{row.nome}</TableCell>
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
                      onClick={() => handleOpenStatus(row.status, row.uuid)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ width: 20, height: 20, p: 0, m: 0, mr: 1.5 }}
                      onClick={() => handleDownload(row.url)}
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

export default EmpresaBoletoList;

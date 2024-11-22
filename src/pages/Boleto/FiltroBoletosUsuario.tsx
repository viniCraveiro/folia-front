import CancelIcon from "@mui/icons-material/Cancel";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import theme from "../../layout/Theme";
import { IFiltroBoleto } from "./list/BoletoCollection";
import { StatusBoleto } from "./StatusBoleto";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1 / 2,
  bgcolor: "background.paper",
  border: "2px solid" + theme.palette.primary.main,
  boxShadow: 16,
  borderRadius: 4,
  p: 4,
};

interface FiltroAvancadoBoletosProps {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  onSubmit: (filtro: IFiltroBoleto) => void;
  filtroProps: IFiltroBoleto;
}

export const FiltroBoletosUsuario = ({
  open,
  onClose,
  onReset,
  onSubmit,
  filtroProps,
}: FiltroAvancadoBoletosProps) => {
  const [filtro, setFiltro] = useState<IFiltroBoleto>({
    usuarioUUID: filtroProps.usuarioUUID,
    empresaUUID: filtroProps.empresaUUID,
    nome: filtroProps.nome,
    numero: filtroProps.numero,
    banco: filtroProps.banco ?? "",
    identificacao: filtroProps.identificacao ?? "",
    dataInicialEmissao: filtroProps.dataInicialEmissao ?? null,
    dataFinalEmissao: filtroProps.dataFinalEmissao ?? null,
    dataInicialVencimento: filtroProps.dataInicialVencimento ?? null,
    dataFinalVencimento: filtroProps.dataFinalVencimento ?? null,
    status: filtroProps.status,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFiltro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (key: string, value: Dayjs | null) => {
    setFiltro((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(filtro);
    onClose();
  };

  const handleReset = () => {
    const filtroInicial: IFiltroBoleto = {
      usuarioUUID: null,
      empresaUUID: null,
      nome: "",
      identificacao: "",
      numero: "",
      banco: "",
      dataInicialEmissao: null,
      dataFinalEmissao: null,
      dataInicialVencimento: null,
      dataFinalVencimento: null,
      status: null,
    };
    setFiltro(filtroInicial);
    onReset();
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box>
              <TextField
                fullWidth
                id="banco"
                label="Buscar por banco"
                name="banco"
                variant="standard"
                size="small"
                color="primary"
                value={filtro?.banco}
                onChange={handleChange}
                autoFocus
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                mt: 1,
                justifyContent: "space-between",
              }}
            >
              <DatePicker
                name="dataInicial"
                className="leading-normal"
                label={"Emissão de"}
                views={["day", "month", "year"]}
                onChange={(value) =>
                  handleDateChange("dataInicialEmissao", value)
                }
                value={filtro.dataInicialEmissao}
                sx={{
                  width: 1 / 2,
                }}
              />
              <DatePicker
                name="dataFinal"
                className="leading-normal"
                label={"Emissão até"}
                views={["day", "month", "year"]}
                onChange={(value) =>
                  handleDateChange("dataFinalEmissao", value)
                }
                value={filtro.dataFinalEmissao}
                sx={{
                  width: 1 / 2,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                mt: 1,
                justifyContent: "space-between",
              }}
            >
              <DatePicker
                name="dataInicial"
                className="leading-normal"
                label={"Vencimento de"}
                views={["day", "month", "year"]}
                onChange={(value) =>
                  handleDateChange("dataInicialVencimento", value)
                }
                value={filtro.dataInicialVencimento}
                sx={{
                  width: 1 / 2,
                }}
              />
              <DatePicker
                name="dataFinal"
                className="leading-normal"
                label={"Vencimento até"}
                views={["day", "month", "year"]}
                onChange={(value) =>
                  handleDateChange("dataFinalVencimento", value)
                }
                value={filtro.dataFinalVencimento}
                sx={{
                  width: 1 / 2,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                mt: 1,
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 1 / 2,
                }}
              >
                <InputLabel id="status-label" sx={{ mt: 1 }}>
                  Status
                </InputLabel>
                <Select
                  name="status"
                  labelId="status-label"
                  id="status-select"
                  value={filtro.status}
                  label="Status"
                  variant="standard"
                  sx={{ width: 1 / 2 }}
                  onChange={(e) =>
                    setFiltro((prevState) => ({
                      ...prevState,
                      status: e.target.value as StatusBoleto,
                    }))
                  }
                >
                  {Object.values(StatusBoleto).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Box
                sx={{
                  alignContent: "center",
                }}
              >
                <Button
                  className="w-20 flex-initial"
                  variant="outlined"
                  startIcon={<FilterAltOffIcon />}
                  color="info"
                  sx={{
                    borderRadius: 4,
                    p: 1,
                    width: 200,
                  }}
                  onClick={handleReset}
                >
                  <Typography variant="body2">Resetar</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                mt: 6,
                justifyContent: "space-between",
              }}
            >
              <Button
                className="w-20 flex-initial"
                variant="contained"
                startIcon={<CancelIcon />}
                color="error"
                sx={{
                  borderRadius: 4,
                  p: 1,
                  width: 200,
                }}
                onClick={onClose}
              >
                <Typography variant="body2">Voltar</Typography>
              </Button>
              <Button
                className="w-20 flex-initial"
                variant="contained"
                startIcon={<SearchIcon />}
                color="success"
                sx={{
                  borderRadius: 4,
                  p: 1,
                  width: 200,
                }}
                onClick={handleSubmit}
              >
                <Typography variant="body2">Filtrar</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

import CancelIcon from "@mui/icons-material/Cancel";
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
import dayjs from "dayjs";
import { useState } from "react";
import theme from "../../../layout/Theme";
import { IFiltroBoletoUsuario } from "../../Boleto/BoletoCollection";
import { StatusBoleto } from "../../Boleto/StatusBoleto";

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

export const FiltroAvancadoBoletosUsuario = ({ open, onClose, onSubmit }) => {
  const [filtro, setFiltro] = useState<IFiltroBoletoUsuario>({status: StatusBoleto.ABERTO});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFiltro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (key, value) => {
    setFiltro((prevState) => ({
      ...prevState,
      [key]: value ? dayjs(value).format("MMMM/YYYY") : "",
    }));
    console.log(filtro);
  };

  const handleSubmit = () => {
    console.log(filtro)
    onSubmit(filtro);
    onClose();
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
                id="search"
                label="Buscar por banco"
                name="filsearchbanco"
                variant="standard"
                size="small"
                color="primary"
                value={filtro.banco}
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
                sx={{
                  width: 1 / 2,
                }}
              />
              <DatePicker
                name="dataFinal"
                className="leading-normal"
                label={"Emissão até"}
                views={["day", "month", "year"]}
                onChange={(value) => handleDateChange("dataFinal", value)}
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
                sx={{
                  width: 1 / 2,
                }}
              />
            </Box>
            <InputLabel id="status" sx={{ mt: 1}}> Status</InputLabel>
            <Select
              name="status"
              labelId="status"
              id="status-select"
              value={filtro.status}
              label="Selecionar Período"
              onChange={handleChange}
              variant="standard"
              sx={{ width: 1 / 2 }}
            >
              {Object.values(StatusBoleto).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
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
                  width: 1 / 5,
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
                  width: 1 / 5,
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

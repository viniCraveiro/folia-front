import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import theme from "../../../layout/Theme";
import { IUsuarioFiltro } from "./UsuarioFiltroDTO";
import dayjs from "dayjs";

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

export const FiltroAvancadoUsuario = ({ open, onClose, onSubmit }) => {
  const [filtro, setFiltro] = useState<IUsuarioFiltro>({});

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
    onSubmit();
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <TextField
                fullWidth
                id="search"
                label="Buscar por nome"
                name="filsearchnome"
                variant="standard"
                size="small"
                color="primary"
                value={filtro.nome}
                onChange={handleChange}
                autoFocus
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                id="search"
                label="Buscar por idendificação"
                name="filsearchtroiden"
                variant="standard"
                size="small"
                color="primary"
                value={filtro.idendificacao}
                onChange={handleChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                mt: 2,
                justifyContent: "space-between",
              }}
            >
              <DatePicker
                name="dataInicial"
                className="leading-normal"
                label={"De"}
                views={["month", "year"]}
                onChange={(value) => handleDateChange("dataInicial", value)}
                sx={{
                  width: 1/2
                }}
              />
              <DatePicker
                name="dataFinal"
                className="leading-normal"
                label={"Até"}
                views={["month", "year"]}
                onChange={(value) => handleDateChange("dataFinal", value)}
                sx={{
                  width: 1/2
                }}
              />
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

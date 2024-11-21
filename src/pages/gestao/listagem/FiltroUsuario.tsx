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
import { ChangeEvent, useState } from "react";
import theme from "../../../layout/Theme";
import { UserRole } from "../../../models/UserRole";
import { IFiltroUsuario } from "./UsuarioCollections";

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

interface FiltroAvancadoProps {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  onSubmit: (filtro: IFiltroUsuario) => void;
  filtroProps: IFiltroUsuario;
}

export const FiltroUsuario = ({
  open,
  onClose,
  onReset,
  onSubmit,
  filtroProps,
}: FiltroAvancadoProps) => {
  const [filtro, setFiltro] = useState<IFiltroUsuario>({
    empresaUUID: filtroProps.empresaUUID,
    identificacao: filtroProps.identificacao ?? "",
    nome: filtroProps.nome ?? "",
    tipoUsuario: filtroProps.tipoUsuario ?? UserRole.USER,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFiltro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(filtro);
    onClose();
  };

  const handleReset = () => {
    const filtroInicial: IFiltroUsuario = {
      empresaUUID: null,
      identificacao: filtroProps.identificacao ?? "",
      nome: filtroProps.nome ?? "",
      tipoUsuario: filtroProps.tipoUsuario ?? UserRole.USER,
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
                id="identificacao"
                label="Buscar por identificação"
                name="identificacao"
                variant="standard"
                size="small"
                color="primary"
                value={filtro?.identificacao}
                onChange={handleChange}
                autoFocus
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                id="nome"
                label="Buscar por nome"
                name="nome"
                variant="standard"
                size="small"
                color="primary"
                value={filtro?.nome}
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
                  name="tipoUsuario"
                  labelId="tipoUsuario-label"
                  id="tipoUsuario-select"
                  value={filtro.tipoUsuario}
                  label="Tipo usuario"
                  variant="standard"
                  sx={{ width: 1 }}
                  onChange={(e) =>
                    setFiltro((prevState) => ({
                      ...prevState,
                      tipoUsuario: e.target.value as UserRole,
                    }))
                  }
                >
                  {Object.values(UserRole).map((value) => (
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

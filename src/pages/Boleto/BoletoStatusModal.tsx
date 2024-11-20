import CancelIcon from "@mui/icons-material/Cancel";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import theme from "../../layout/Theme";
import BoletoService from "../../services/boletos/BoletoService";
import { useAlert } from "../components/AlertProvider";
import { StatusBoleto } from "./StatusBoleto";

const boletoService = new BoletoService();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1 / 4,
  bgcolor: "background.paper",
  border: "2px solid" + theme.palette.primary.main,
  boxShadow: 16,
  borderRadius: 4,
  p: 4,
};

interface IStatusBoletoProps {
  open: boolean;
  onClose: () => void;
  boletosProps: IBoletoStatus;
  filter: () => void;
}

export interface IBoletoStatus {
  uuid: string;
  novoStatus: StatusBoleto;
}

export const BoletoStatusModal = ({
  open,
  onClose,
  boletosProps,
  filter,
}: IStatusBoletoProps) => {
  const [novoStatus, setNovoStatus] = useState<IBoletoStatus>({
    uuid: boletosProps.uuid,
    novoStatus: boletosProps.novoStatus,
  });
  const { showAlert } = useAlert();

  const handleSubmit = () => {
    try {
      boletoService
        .atualizarStatusBoleto(novoStatus.uuid, novoStatus.novoStatus, showAlert)
        .then(() => {
          showAlert({
            title: "Sucesso",
            message: "Status do boleto atualizado",
            type: "success",
            hideDuration: 3000,
          });
          filter();
        });
    } catch (error) {
      showAlert({
        title: "Erro ao alterar Status",
        message: "Erro:" + error,
        type: "info",
        hideDuration: 3000,
      });
    }
    onClose();
  };

  useEffect(() => {
    setNovoStatus({
      uuid: boletosProps.uuid,
      novoStatus: boletosProps.novoStatus,
    });
  }, [boletosProps]);

  return (
    <Box>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box>
              <Box>
                <InputLabel id="status-label" sx={{ mt: 1 }}>
                  Status
                </InputLabel>
                <Select
                  name="status"
                  labelId="status-label"
                  id="status-select"
                  value={novoStatus.novoStatus}
                  label="Selecionar Período"
                  variant="standard"
                  sx={{ width: 1 }}
                  onChange={(e) =>
                    setNovoStatus((prevState) => ({
                      ...prevState,
                      novoStatus: e.target.value as StatusBoleto,
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
                <Typography variant="body2">Cancelar</Typography>
              </Button>
              <Button
                className="w-20 flex-initial"
                variant="contained"
                startIcon={<SaveAsIcon />}
                color="success"
                sx={{
                  borderRadius: 4,
                  p: 1,
                  width: 200,
                }}
                onClick={handleSubmit}
              >
                <Typography variant="body2">Salvar</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

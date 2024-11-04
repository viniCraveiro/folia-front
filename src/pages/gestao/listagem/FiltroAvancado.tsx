import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField/TextField";
import theme from "../../../layout/Theme";
import { Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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

export const FiltroAvancado = ({ open, onClose }) => {
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
              />
            </Box>
          </Box>
          <Box className="gap-2 w-full flex flex-row justify-between">
            <Button
              className="w-1/2"
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                borderRadius: 4,
                p: 1,
              }}
            >
              <Typography variant="body2">Filtrar</Typography>
            </Button>
            <Button
              className="w-1/2"
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                borderRadius: 4,
                p: 1,
              }}
            >
              <Typography variant="body2">Voltar</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

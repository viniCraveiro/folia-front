import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import {
  Box,
  Button,
  Chip,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import QRCodeComponent from "../../components/QRCodeComponent";
import { handleStyleChips, StatusBoleto } from "../StatusBoleto";

const BoletoDetail = () => {
  return (
    <Box className="p-8">
      <Box className="flex justify-center">
        <Typography variant="h5" gutterBottom>
          Boleto
        </Typography>
      </Box>
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        component={Paper}
        elevation={4}
        sx={{
          mx: "auto",
          backgroundColor: "#fff",
        }}
      >
        <Box
          className="mb-5 gap-5 grid grid-cols-2 justify-between p-4"
          component="form"
          noValidate
          autoComplete="off"
        >
          <Box className="gap-5 grid grid-cols-1 justify-between">
            <Box className="gap-5 grid grid-cols-2">
              <TextField
                id="search"
                label="Numero"
                defaultValue="123"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="search"
                label="Estabelecimento"
                defaultValue="Teclado.INC"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-2">
              <TextField
                id="search"
                label="Banco"
                defaultValue="ITAU"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="search"
                label="Agencia"
                defaultValue="12345"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-5">
              <TextField
                id="search"
                label="Conta"
                defaultValue="12345"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
                className="col-span-4"
              />
              <TextField
                id="search"
                label="Digito"
                defaultValue="2"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-3">
              <Box className="flex justify-center w-full">
                <Chip
                  className="flex justify-center w-4/5"
                  label={StatusBoleto.ABERTO}
                  color={handleStyleChips(StatusBoleto.ABERTO)}
                  sx={{
                    minHeight: 40,
                  }}
                />
              </Box>
              <TextField
                id="search"
                label="Emissao"
                defaultValue="2024-11-18"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="search"
                label="Vencimento"
                defaultValue="2024-11-18"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-2">
              <TextField
                id="search"
                label="Valor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                  readOnly: true,
                }}
                defaultValue="250,00"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
              />
              <TextField
                id="search"
                label="Parcela"
                defaultValue="1 / 12"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-1">
              <TextField
                id="search"
                label="Descricao"
                defaultValue="123"
                name="filsearchtro"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </Box>

          <Box className="gap-5 grid grid-cols-1 justify-center">
            <Box className="flex justify-center">
              <QRCodeComponent url="https://homologacao.plugboleto.com.br/api/v1/boletos/impressao/a0ed95e0-920d-b8f9-6330-7e9e1a597452" />
            </Box>
            <Box
              className="flex justify-center"
              sx={{
                gap: 5,
              }}
            >
              <Button
                className="flex-initial w-1/4"
                variant="outlined"
                color="primary"
                startIcon={<ContentCopyIcon />}
                sx={{
                  borderRadius: 4,
                  p: 1,
                  minHeight: 40,
                  maxHeight: 40,
                }}
              >
                <Typography variant="body1">Copiar</Typography>
              </Button>

              <Button
                className="flex-initial  w-1/4"
                variant="outlined"
                color="primary"
                startIcon={<PrintIcon />}
                sx={{
                  borderRadius: 4,
                  p: 1,
                  minHeight: 40,
                  maxHeight: 40,
                }}
              >
                <Typography variant="body1">Imprimir</Typography>
              </Button>

              <Button
                className="flex-initial w-1/4"
                variant="outlined"
                color="primary"
                startIcon={<DownloadIcon />}
                sx={{
                  borderRadius: 4,
                  p: 1,
                  minHeight: 40,
                  maxHeight: 40,
                }}
              >
                <Typography variant="body1">Download</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default BoletoDetail;

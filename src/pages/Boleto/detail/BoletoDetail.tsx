import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import theme from "../../../layout/Theme";
import BoletoService from "../../../services/boletos/BoletoService";
import { useAlert } from "../../components/AlertProvider";
import QRCodeComponent from "../../components/QRCodeComponent";
import {
  copiarUrl,
  downloadURL,
  imprimirURL,
} from "../../components/UrlAPIUtil";
import { handleStyleChips, StatusBoleto } from "../StatusBoleto";
import { BoletoData } from "./BoletoDetailCollection";

const boletoService = new BoletoService();

const BoletoDetail = () => {
  const location = useLocation();
  const { uuid } = location.state || {};
  const { showAlert } = useAlert();
  const [boletoData, setBoletoData] = useState<BoletoData>();
  const [loading, setLoading] = useState({
    download: false,
    imprimir: false,
  });

  const buscarBoleto = () => {
    boletoService.buscarBoleto(uuid, showAlert).then((response) => {
      if (response) {
        setBoletoData(response);
      }
    });
  };

  useEffect(() => {
    console.log(uuid);
    if (uuid) {
      buscarBoleto();
    }
  }, [uuid]);

  return (
    <Box className="p-8">
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
                id="Numero"
                label="Numero"
                name="Numero"
                variant="standard"
                size="small"
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
                value={boletoData?.uuid ?? ""}
                InputLabelProps={{
                  shrink: !!uuid,
                }}
              />
              <TextField
                id="estabelecimento"
                label="Estabelecimento"
                name="estabelecimento"
                variant="standard"
                size="small"
                color="primary"
                value={boletoData?.estabelecimento ?? ""}
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-2">
              <TextField
                id="banco"
                label="Banco"
                name="banco"
                variant="standard"
                size="small"
                color="primary"
                value={boletoData?.banco.nome ?? ""}
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="agencia"
                label="Agencia"
                name="agencia"
                variant="standard"
                size="small"
                color="primary"
                value={`${boletoData?.banco.agencia ?? ""} - ${
                  boletoData?.banco.agenciaDigito ?? ""
                }`}
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-5">
              <TextField
                id="conta"
                label="Conta"
                name="conta"
                variant="standard"
                size="small"
                color="primary"
                value={boletoData?.banco.conta ?? ""}
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
                className="col-span-4"
              />
              <TextField
                id="digito"
                label="Digito"
                name="digito"
                variant="standard"
                size="small"
                color="primary"
                value={boletoData?.banco.contaDigito ?? ""}
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-3 items-center">
              <Box className="flex justify-center w-full">
                <Chip
                  className="flex justify-center w-4/5"
                  label={boletoData?.status ?? "ERROR"}
                  color={handleStyleChips(
                    boletoData?.status ?? StatusBoleto.ABERTO
                  )}
                  sx={{
                    minHeight: 35,
                  }}
                />
              </Box>
              <TextField
                id="emissao"
                label="Emissao"
                name="emissao"
                variant="standard"
                size="small"
                color="primary"
                value={
                  boletoData
                    ? dayjs(boletoData.dataEmissao)
                        .format("DD/MM/YYYY")
                        .toString()
                    : ""
                }
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="vencimento"
                label="Vencimento"
                name="vencimento"
                variant="standard"
                size="small"
                color="primary"
                value={
                  boletoData
                    ? dayjs(boletoData.dataVencimento)
                        .format("DD/MM/YYYY")
                        .toString()
                    : ""
                }
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-2">
              <TextField
                id="valor"
                label="Valor"
                name="valor"
                variant="standard"
                size="small"
                color="primary"
                value={
                  boletoData
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(boletoData.valor))
                    : ""
                }
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="parcela"
                label="Parcela"
                name="parcela"
                variant="standard"
                size="small"
                color="primary"
                value={`${boletoData?.parcela ?? "0"} / ${
                  boletoData?.totalParcelas ?? "0"
                }`}
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="gap-5 grid grid-cols-1">
              <TextField
                id="descricao"
                label="Descrição"
                name="descricao"
                variant="standard"
                size="small"
                color="primary"
                value={boletoData?.descricao ?? ""}
                InputLabelProps={{
                  shrink: !!uuid,
                }}
                InputProps={{
                  readOnly: true,
                }}
                multiline
                rows={3}
              />
            </Box>
          </Box>

          <Box className="gap-4 grid grid-cols-1 justify-center">
            <Box>
              <Box className="flex justify-center">
                <QRCodeComponent url={boletoData?.url ?? ""} />
              </Box>
            </Box>
            <Box
              className="flex justify-center"
              sx={{
                gap: 4,
              }}
            >
              <Button
                className="flex-initial w-1/4"
                variant="outlined"
                color="secondary"
                startIcon={<ContentCopyIcon />}
                sx={{
                  borderRadius: 4,
                  p: 1,
                  minHeight: 40,
                  maxHeight: 40,
                }}
                onClick={() => copiarUrl(boletoData?.url ?? "", showAlert)}
              >
                <Typography variant="body1">Copiar</Typography>
              </Button>

              <Box className="flex-initial w-1/4 justify-center">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PrintIcon />}
                  sx={{
                    borderRadius: 4,
                    p: 1,
                    minHeight: 40,
                    maxHeight: 40,
                  }}
                  disabled={loading.imprimir}
                  onClick={() => imprimirURL(boletoData?.url ?? "", showAlert)}
                >
                  <Typography variant="body1">Imprimir</Typography>
                  {loading.imprimir && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: theme.palette.secondary.main,
                        position: "absolute",
                      }}
                    />
                  )}
                </Button>
              </Box>

              <Button
                className="flex-initial w-1/4"
                variant="outlined"
                color="secondary"
                startIcon={<DownloadIcon />}
                sx={{
                  borderRadius: 4,
                  p: 1,
                  minHeight: 40,
                  maxHeight: 40,
                }}
                disabled={loading.download}
                onClick={() => {
                  setLoading((prevState) => ({ ...prevState, download: true }));
                  downloadURL(boletoData?.url ?? "", showAlert).then(() => {
                    setLoading((prevState) => ({
                      ...prevState,
                      download: false,
                    }));
                  });
                }}
              >
                <Typography variant="body1">Download</Typography>
                {loading.download && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: theme.palette.secondary.main,
                      position: "absolute",
                    }}
                  />
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
export default BoletoDetail;

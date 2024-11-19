import { Box, TextField, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AuthService from "../../../services/AuthServices";
import BoletoService from "../../../services/boletos/BoletoUsuarioService";
import { useAlert } from "../../components/AlertProvider";
import { BoletoList, IFiltroBoletoUsuario } from "../BoletoCollection";

const boletoService = new BoletoService();

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 100 },
  { field: "banco", headerName: "Banco", width: 200 },
  { field: "parcela", headerName: "Parcela", width: 100 },
  { field: "dataEmissao", headerName: "Data de emissão", width: 140 },
  { field: "dataVencimento", headerName: "Data de vencimento", width: 140 },
  { field: "valor", headerName: "Valor", width: 80, type: "number" },
  { field: "acoes", headerName: "", cellClassName: "justify-end", width: 130 },
];

const BoletoDetail = () => {
  const userUuid = AuthService.getInstance().getUserUuid();
  const defaultFilter = {
    userUuid: userUuid,
    banco: null,
    dataInicialEmissao: null,
    dataFinalEmissao: null,
    dataInicialVencimento: null,
    dataFinalVencimento: null,
    status: null,
  };
  const [list, setList] = useState<BoletoList[]>([]);
  const [filtroBoleto, setFiltroBoleto] =
    useState<IFiltroBoletoUsuario>(defaultFilter);

  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFiter = () => setFilterOpen(false);
  const { showAlert } = useAlert();

  const filter = (filtro: IFiltroBoletoUsuario) => {
    boletoService.filtrarBoletos(filtro, showAlert).then((response) => {
      if (response) {
        if (response.length === 0) {
          showAlert({
            message: "Verifique seus filtros",
            title: "Nenhum resultado encontrado.",
            type: "info",
            hideDuration: 2000,
          });
          return;
        }
        setList(response);
      }
    });
  };

  const resetFilter = () => {
    setFiltroBoleto(defaultFilter);
    filter(filtroBoleto);
    handleCloseFiter();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        boletoService
          .filtrarBoletos(filtroBoleto, showAlert)
          .then((response) => {
            if (response) {
              setList(response);
            }
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /*
   "id": 228,
      "uuid": "033014c3-e171-492e-9201-450e5cfa2fb1",
      "bancoNome": "ITAÚ UNIBANCO S.A.",
      "bancoAgencia": "0233",
      "bancoConta": 37223,
      "bancoContaDigito": "4",
      "valor": 50,
      "dataVencimento": "2024-11-18T12:00:00Z",
      "dataEmissao": "2024-11-18T12:00:00Z",
      "carteira": "109",
      "pessoaIdentificacao": "72366875000112",
      "pessoaNome": "AVIAMENTOS VERA CRUZ LTDA",
      "estabelecimentoNome": "VINICIUS CRAVEIRO TECNOLOGIA",
      "estabelecimentoIdentificacao": "96834234000103",
      "totalParcela": 1,
      "descricaoCobranca": "COMPRA DE DOMINIO",
      "numeroDocumento": 10,
      "parcela": 1,
      "parcelaDescricao": "1/1",
      "statusParcela": "ABERTA",
      "urlBoleto": "https://homologacao.plugboleto.com.br/api/v1/boletos/impressao/a0ed95e0-920d-b8f9-6330-7e9e1a597452",
      "saldo": 50
    },
    {
  */

  return (
    <Box className="p-8">
      <Box className="flex justify-center">
        <Typography variant="h5" gutterBottom>
          Boleto
        </Typography>
      </Box>
      <Box
        className="gap-4 grid grid-cols-2 justify-between"
        component="form"
        noValidate
        autoComplete="off"
      >
        <Box className="gap-4 grid grid-cols-1 justify-between items-center">
          <Box>
            <TextField
              fullWidth
              id="search"
              label="Banco"
              defaultValue="Hello World"
              name="filsearchtro"
              variant="standard"
              size="small"
              color="primary"
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Box className="gap-4 grid grid-cols-2 justify-between">
            <TextField
              fullWidth
              id="search"
              label="Agencia"
              defaultValue="Hello World"
              name="filsearchtro"
              variant="standard"
              size="small"
              color="primary"
              InputProps={{
                readOnly: true,
              }}
            />
            <Box className="gap-4 grid grid-cols-5">
              <TextField
                id="search"
                label="Conta"
                defaultValue="Hello World"
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
                defaultValue="Hello World"
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
          <Box>
            <TextField
              fullWidth
              id="search"
              label="Buscar por número"
              defaultValue="Hello World"
              name="filsearchtro"
              variant="standard"
              size="small"
              color="primary"
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="search"
              label="Digito"
              defaultValue="Hello World"
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
        <Box className="gap-4 grid grid-cols-1 justify-between items-center">
          <TextField
            fullWidth
            id="search"
            label="Agencia"
            defaultValue="Hello World"
            name="filsearchtro"
            variant="standard"
            size="small"
            color="primary"
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            fullWidth
            id="search"
            label="Agencia"
            defaultValue="Hello World"
            name="filsearchtro"
            variant="standard"
            size="small"
            color="primary"
            InputProps={{
              readOnly: true,
            }}
          />

          <Box className="gap-4 grid grid-cols-2">
            <TextField
              id="search"
              label="Conta"
              defaultValue="Hello World"
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
              label="Digito"
              defaultValue="Hello World"
              name="filsearchtro"
              variant="standard"
              size="small"
              color="primary"
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          <Box className="gap-4 grid grid-cols-2">
            <TextField
              id="search"
              label="Conta"
              defaultValue="Hello World"
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
              label="Digito"
              defaultValue="Hello World"
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
      </Box>
    </Box>
  );
};

export default BoletoDetail;

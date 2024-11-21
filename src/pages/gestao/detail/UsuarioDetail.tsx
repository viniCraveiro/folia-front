import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserRole } from "../../../models/UserRole";
import UsuarioService from "../../../services/usuario/UsuarioService";

export interface CadastroUsuarioForm {
  identificacao: string;
  nome: string;
  email: string;
  usuario: string;
  senha: string;
  confirmarSenha: string;
  tipoUsuario: UserRole;
}

const usuarioService = new UsuarioService();

export default function UsuarioDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEdit, isView, uuid } = location.state || {};

  const [form, setForm] = useState<CadastroUsuarioForm>({
    identificacao: "",
    nome: "",
    email: "",
    usuario: "",
    senha: "",
    confirmarSenha: "",
    tipoUsuario: UserRole.USER,
  });

  const [alertState, setAlertState] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const findUser = () => {
    usuarioService.find(uuid).then((response) => {
      if (response) {
        setForm(response);
      }
    });
  };

  useEffect(() => {
    if (uuid) {
      findUser();
    }
  }, [uuid]);

  const validarSenha = (senha: string): boolean => {
    const temNumero = /\d/; // Verifica se contém números
    const temMaiuscula = /[A-Z]/; // Verifica se contém letras maiúsculas
    return temNumero.test(senha) && temMaiuscula.test(senha);
  };

  const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false; // Verifica se tem 11 dígitos e não é uma sequência repetida
    }

    // Validação dos dígitos verificadores
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.identificacao ||
      !form.nome ||
      !form.email ||
      !form.usuario ||
      !form.senha ||
      !form.confirmarSenha
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!validarCPF(form.identificacao)) {
      alert("CPF inválido.");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!validarSenha(form.senha)) {
      alert("A senha deve conter pelo menos um número e uma letra maiúscula.");
      return;
    }

    try {
      if (isEdit) {
        const response = await usuarioService.atualizar(uuid,form);
        setSuccessMessage(response.mensagem);
        setAlertState(true);
        return;
      }
      const response = await usuarioService.cadastrar(form);

      setSuccessMessage(response.mensagem);
      setAlertState(true);

      setForm({
        identificacao: "",
        nome: "",
        email: "",
        usuario: "",
        senha: "",
        confirmarSenha: "",
        tipoUsuario: UserRole.USER,
      });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Ocorreu um erro ao realizar o cadastro. Tente novamente.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleClose = () => {
    setAlertState(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "80%",
        mx: "auto",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        mt: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Identificação (CPF)"
            name="identificacao"
            value={form.identificacao}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: !!uuid,
            }}
            InputProps={{
              readOnly: !isEdit,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: !!uuid,
            }}
            InputProps={{
              readOnly: !isEdit,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: !!uuid,
            }}
            InputProps={{
              readOnly: !isEdit,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="tipoUsuario-label">Tipo de Usuário</InputLabel>
            <Select
              labelId="tipoUsuario-label"
              id="tipoUsuario"
              name="tipoUsuario"
              value={form.tipoUsuario}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  tipoUsuario: e.target.value as UserRole,
                }))
              }
              label="Tipo de Usuário"
              disabled={!isEdit}
            >
              {Object.values(UserRole).map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Usuário"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: !!uuid,
            }}
            InputProps={{
              readOnly: !isEdit,
            }}
          />
        </Grid>
      </Grid>
      {isEdit && (
        <Grid container spacing={2} className="mt-1">
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Senha"
              name="senha"
              type="password"
              value={form.senha}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: !!uuid,
              }}
              InputProps={{
                readOnly: !isEdit,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              value={form.confirmarSenha}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: !!uuid,
              }}
              InputProps={{
                readOnly: !isEdit,
              }}
            />
          </Grid>
        </Grid>
      )}
      {/* Caixa para os botões */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Box sx={{ display: "flex", gap: 85 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            sx={{ minWidth: "175px" }}
          >
            {isEdit ? "Cancelar" : "Voltar"}
          </Button>
          {isEdit && (
            <Button
              variant="contained"
              type="submit"
              sx={{ minWidth: "175px" }}
            >
              Cadastrar
            </Button>
          )}
        </Box>
      </Box>

      {/* Mensagem de sucesso */}
      <Snackbar open={alertState} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

import React, { useState } from 'react';
import { TipoUsuario } from './TipoUsuario'; 
import { Grid, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CadastroUsuarioService from "../../services/cadastroUsuario/CadastroUsuarioService";

export interface CadastroUsuarioForm {
  identificacao: string;
  nome: string;
  email: string;
  usuario: string;
  senha: string;
  confirmarSenha: string; 
  tipoUsuario: TipoUsuario;
}

export default function CadastroUsuario() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CadastroUsuarioForm>({
    identificacao: "",
    nome: "",
    email: "",
    usuario: "",
    senha: "",
    confirmarSenha: "", 
    tipoUsuario: TipoUsuario.DEFAULT,
  });

  const [alertState, setAlertState] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value as TipoUsuario | string,
    }));
  };

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
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!form.identificacao || !form.nome || !form.email || !form.usuario || !form.senha || !form.confirmarSenha) {
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
      const cadastroService = new CadastroUsuarioService();
      const response = await cadastroService.cadastrar(form);
      
      setSuccessMessage(response.mensagem);
      setAlertState(true);
  
      setForm({
        identificacao: "",
        nome: "",
        email: "",
        usuario: "",
        senha: "",
        confirmarSenha: "",
        tipoUsuario: TipoUsuario.DEFAULT,
      });
    } catch (error: any) {
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
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '80%', mx: 'auto', p: 2, border: '1px solid #ccc', borderRadius: '8px', mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Identificação (CPF)"
            name="identificacao"
            value={form.identificacao}
            onChange={handleChange}
            required
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
              onChange={handleChange}
              label="Tipo de Usuário"
            >
              {Object.values(TipoUsuario).map((tipo) => (
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Senha"
            name="senha"
            type="password"
            value={form.senha}
            onChange={handleChange}
            required
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
          />
        </Grid>
      </Grid>
      {/* Caixa para os botões */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Box sx={{ display: 'flex', gap: 85 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            sx={{ minWidth: '175px' }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ minWidth: '175px' }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>

      {/* Mensagem de sucesso */}
      <Snackbar open={alertState} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

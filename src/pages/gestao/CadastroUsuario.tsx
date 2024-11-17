import React, { useState } from 'react';
import { TipoUsuario } from './TipoUsuario'; 
import { Grid, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    
    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    
    console.log("Formulário enviado:", form);
    setSuccessMessage("Cadastro realizado com sucesso!");
    setAlertState(true);
    
    
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  const handleClose = () => {
    setAlertState(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '80%', mx: 'auto', p: 2, border: '1px solid #ccc', borderRadius: '08px', mt: 5, }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Identificação"
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



      
      {/*mensagem de sucesso */}
      <Snackbar open={alertState} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

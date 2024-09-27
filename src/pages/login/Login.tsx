import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import LoginService from "../../services/login/LoginService";
import { ILogin, LoginToken } from "./ILoginData";
import "./LoginStyle.css";

const service = new LoginService();

export default function Login() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState<ILogin>({
    identificacao: "",
    senha: "",
  });

  const [token, setToken] = useState<LoginToken | null>(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submitted");
    event.preventDefault();

    service
      .loginUser(loginForm)
      .then((response: LoginToken) => {
        console.log("Service response:", response);
        setToken(response);
        if (response.valid) {
          navigate("/");
        } else {
          console.error("Usuario Não Valido!");
        }
      })
      .catch((err) => {
        console.error("Erro:", err);
      });
  };

  return (
    <div className="grid grid-cols-2">
      <div className="background">
        <Grid
          container
          component="main"
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex",
            px: 3,
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            component={Paper}
            elevation={4}
            sx={{
              mx: "auto",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Box
              sx={{
                my: 4,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img className="mb-2" src={logo} alt="Logo Folia" />
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="identificacao"
                  label="Identificação"
                  name="identificacao"
                  value={loginForm.identificacao}
                  onChange={handleChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="senha"
                  label="Senha"
                  type="password"
                  value={loginForm.senha}
                  onChange={handleChange}
                  id="senha"
                  autoComplete="current-password"
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="lembre-se de mim"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Entrar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      <span className="font-bold"> Esqueceu a Senha?</span>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
      <div></div>
    </div>
  );
}

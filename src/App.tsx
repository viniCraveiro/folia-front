import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import theme from "./layout/Theme";
import TopBar from "./layout/topbar/TopBar";
import { UserRole } from "./models/UserRole";
import Acompanhamento from "./pages/Acompanhamento";
import BoletoRedirect from "./pages/Boleto/BoletoRedirect";
import BoletoDetail from "./pages/Boleto/detail/BoletoDetail";
import EmpresaBoleto from "./pages/Boleto/list/EmpresaBoleto";
import UsuarioBoleto from "./pages/Boleto/list/UsuarioBoleto";
import Cadastro from "./pages/cadastro/Cadastro";
import AppProviders from "./pages/components/AppProviders";
import ListagemUsuario from "./pages/gestao/listagem/ListagemUsuario";
import HomePage from "./pages/home/HomePage";
import HomePageAdmin from "./pages/home/HomePageAdmin";
import InicioRedirect from "./pages/home/InicioRedirect";
import Login from "./pages/login/Login";
import NotaFiscal from "./pages/NotaFiscal";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import UsuarioDetail from "./pages/gestao/detail/UsuarioDetail";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProviders>
          <CssBaseline />
          <AppContent />
        </AppProviders>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hiddenTopBarRoutes = ["/login", "/page-not-found"];
  const hideTopBar = hiddenTopBarRoutes.includes(location.pathname);

  return (
    <>
      {!hideTopBar && <TopBar />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/nota-fiscal" element={<NotaFiscal />} />
          <Route path="/acompanhamento" element={<Acompanhamento />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/boleto" element={<BoletoRedirect />} />
          <Route path="/boleto/detail" element={<BoletoDetail />} />
          <Route path="/" element={<InicioRedirect />} />
        </Route>

        <Route element={<PrivateRoute roleHigher={UserRole.EMPRESA} />}></Route>

        <Route element={<PrivateRoute roleHigher={UserRole.ADMIN} />}>
          <Route path="/usuario" element={<ListagemUsuario />} />
          <Route path="/usuario/detail" element={<UsuarioDetail />} />
        </Route>

        <Route element={<PrivateRoute roleHigher={UserRole.EMPRESA} />}>
          <Route path="/inicio/empresa" element={<HomePageAdmin />} />
          <Route path="/boleto/empresa" element={<EmpresaBoleto />} />
        </Route>

        <Route element={<PrivateRoute roleHigher={UserRole.USER} />}>
          <Route path="/inicio/usuario" element={<HomePage />} />
          <Route path="/boleto/usuario" element={<UsuarioBoleto />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;

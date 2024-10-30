import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import theme from "./layout/Theme";
import TopBar from "./layout/topbar/TopBar";
import Acompanhamento from "./pages/Acompanhamento";
import Boleto from "./pages/Boleto/Boleto";
import Cadastro from "./pages/cadastro/Cadastro";
import AppProviders from "./pages/components/AppProviders";
import CadastroUsuario from "./pages/gestao/CadastroUsuario";
import ListagemUsuario from "./pages/gestao/ListagemUsuario";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import { UserRole } from "./pages/login/UserRole";
import NotaFiscal from "./pages/NotaFiscal";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProviders>
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
          <Route path="/" element={<HomePage />} />
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/boleto" element={<Boleto />} />
          <Route path="/nota-fiscal" element={<NotaFiscal />} />
          <Route path="/acompanhamento" element={<Acompanhamento />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Route>

        <Route element={<PrivateRoute role={UserRole.ADMIN} />}>
          <Route path="/listagemusuario" element={<ListagemUsuario />} />
          <Route path="/cadastrousuario" element={<CadastroUsuario />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;

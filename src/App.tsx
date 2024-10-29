import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import theme from "./layout/Theme";
import TopBar from "./layout/topbar/TopBar";
import Acompanhamento from "./pages/Acompanhamento";
import Boleto from "./pages/Boleto/Boleto";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import NotaFiscal from "./pages/NotaFiscal";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import Cadastro from "./pages/cadastro/Cadastro";
import ListagemUsuario from "./pages/gestao/ListagemUsuario";
import CadastroUsuario from "./pages/gestao/CadastroUsuario";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContent />
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
          <Route path="/listagemusuario" element={<ListagemUsuario />} />
          <Route path="/cadastrousuario" element={<CadastroUsuario />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;

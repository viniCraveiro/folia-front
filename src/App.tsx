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
  const hideTopBar = location.pathname === "/login" || location.pathname === "/page-not-found";
  return (
    <>
      {!hideTopBar && <TopBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<PrivateRoute Component={HomePage} />} />
        <Route path="/inicio" element={<PrivateRoute Component={HomePage} />} />
        <Route path="/boleto" element={<PrivateRoute Component={Boleto} />} />
        <Route path="/nota-fiscal" element={<PrivateRoute Component={NotaFiscal} />} />
        <Route path="/acompanhamento" element={<PrivateRoute Component={Acompanhamento} />} />
        <Route path="/cadastro" element={<PrivateRoute Component={Cadastro} />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;

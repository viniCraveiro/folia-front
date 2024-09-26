import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import theme from "./layout/Theme";
import TopBar from "./layout/topbar/TopBar";
import Acompanhamento from "./pages/Acompanhamento";
import Boleto from "./pages/Boleto";
import HomePage from "./pages/HomePage";
import Login from "./pages/login/Login";
import NotaFiscal from "./pages/NotaFiscal";

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
  const hideTopBar = location.pathname === "/login";
  return (
    <>
      {!hideTopBar && <TopBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/boleto" element={<Boleto />} />
        <Route path="/nota-fiscal" element={<NotaFiscal />} />
        <Route path="/acompanhamento" element={<Acompanhamento />} />
      </Routes>
    </>
  );
};

export default App;

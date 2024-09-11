import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import TopBar from "./layout/topbar/TopBar";
import Acompanhamento from "./pages/Acompanhamento";
import Boleto from "./pages/Boleto";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NotaFiscal from "./pages/NotaFiscal";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideTopBar = location.pathname === "/";
  return (
    <>
        {!hideTopBar && <TopBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/boleto" element={<Boleto />} />
        <Route path="/nota-fiscal" element={<NotaFiscal />} />
        <Route path="/acompanhamento" element={<Acompanhamento />} />
      </Routes>
    </>
  );
};

export default App;

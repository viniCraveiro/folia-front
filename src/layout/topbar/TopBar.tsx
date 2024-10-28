import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RequestPageIcon from "@mui/icons-material/RequestPage";

import {
    AppBar,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../pages/login/UserRole";
import AuthService from "../../services/AuthServices";
import "./TopBar.css";

const TopBar = () => {
  const auth = AuthService.getInstance();
  const empresaNome = auth.getEmpresa();

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="bg-white shadow-md">
      <Toolbar className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/src/assets/logo/logo.svg"
            alt="Logo"
            className="h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div
            className="flex items-center space-x-2 cursor-pointer border-r border-gray-300 pr-4"
            onClick={() => navigate("/inicio")}
          >
            <HomeIcon className="" />
            <Typography variant="h6" className="">
              Início
            </Typography>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer border-r border-gray-300 pr-4"
            onClick={() => navigate("/boleto")}
          >
            <ReceiptIcon className="" />
            <Typography variant="h6" className="">
              Boleto
            </Typography>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer border-r border-gray-300 pr-4"
            onClick={() => "navigate('/nota-fiscal')"}
          >
            <RequestPageIcon className="" />
            <Typography variant="h6" className="">
              Nota Fiscal
            </Typography>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer border-r border-gray-300 pr-4 green"
            onClick={() => "navigate('/acompanhamento')"}
          >
            <AssignmentIcon className="" />
            <Typography variant="h6" className="">
              Acompanhamento
            </Typography>
          </div>
          <Typography variant="h6" className="pl-4 ">
            {empresaNome!.nome}
          </Typography>
        </div>
        <div className="flex order- items-center space-x-4"></div>
        <div className="flex items-center space-x-2 order-1">
          <div>
            {auth.getRole() === UserRole.ADMIN && (
              <div
                className="flex items-center space-x-2 cursor-pointer border-r border-gray-300 pr-4 green"
                onClick={() => navigate("/gestao")}
              >
                <BadgeIcon className="" />
                <Typography variant="h6" className="">
                  Gestão
                </Typography>
              </div>
            )}
          </div>
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              className="p-0"
            >
              <AccountCircle className="text-salmon" />
              <ArrowDropDownIcon className="text-salmon" />
            </IconButton>
          </div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Manutenção do Usuário</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/login");
              }}
            >
              Sair
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

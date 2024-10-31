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

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElGestao, setAnchorElGestao] = useState(null);
  const navigate = useNavigate();

  const handleMenuUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  const handleMenuGestao = (event) => {
    setAnchorElGestao(event.currentTarget);
  };

  const handleCloseGestao = () => {
    setAnchorElGestao(null);
  };

  const handleLogout = () => {
    auth.clearToken();
  };

  const MenuLink = ({ icon: Icon, label, onClick }) => (
    <div
      className="flex items-center space-x-2 cursor-pointer border-r border-gray-300 pr-4"
      onClick={onClick}
    >
      <Icon />
      <Typography variant="h6">{label}</Typography>
    </div>
  );

  const menuItems = [
    { icon: HomeIcon, label: "Início", path: "/inicio" },
    { icon: ReceiptIcon, label: "Boleto", path: "/boleto" },
    { icon: RequestPageIcon, label: "Nota Fiscal", path: "/nota-fiscal" },
    { icon: AssignmentIcon, label: "Acompanhamento", path: "/acompanhamento" },
  ];

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
          {menuItems.map(({ icon, label, path }) => (
            <MenuLink
              key={label}
              icon={icon}
              label={label}
              onClick={() => navigate(path)}
            />
          ))}
          <div>
            {auth.getRole() === UserRole.ADMIN && (
              <div className="w-28">
                <div
                  className="flex items-center space-x-2 cursor-pointer border-r border-gray-300 pr-4"
                  onClick={handleMenuGestao}
                >
                  <BadgeIcon className="" />
                  <Typography variant="h6" className="">
                    Gestão
                  </Typography>
                </div>
                <Menu
                  slotProps={{
                    paper: {
                      style: {
                        width: "7rem",
                      },
                    },
                  }}
                  className="w-full"
                  id="menu-gestao"
                  anchorEl={anchorElGestao}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorElGestao)}
                  onClose={handleCloseGestao}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseGestao();
                      navigate("/listagemusuario");
                    }}
                  >
                    Usuários
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 border-r border-gray-300 pr-4">
            <Typography variant="h6">
              {empresaNome ? empresaNome.nome : ""}
            </Typography>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuUser}
              className="p-0"
            >
              <AccountCircle className="text-salmon" />
              <ArrowDropDownIcon className="text-salmon" />
            </IconButton>
          </div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUser}
          >
            <MenuItem onClick={handleCloseUser}>Manutenção do Usuário</MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseUser();
                handleLogout();
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

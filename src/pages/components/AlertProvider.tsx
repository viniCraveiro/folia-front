import { AlertColor, AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createContext, ReactNode, useContext, useState } from "react";

export interface IAlertProps {
  message: string;
  title?: string;
  type: AlertColor;
  hideDuration?: number; 
}

interface AlertContextProps {
  showAlert: (props: IAlertProps) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert deve ser usado dentro de um AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertState, setAlertState] = useState(false);
  const [alertProps, setAlertProps] = useState<IAlertProps>({
    message: "",
    type: "error",
  });

  const showAlert = (props: IAlertProps) => {
    setAlertProps(props);
    setAlertState(true);
  };

  const handleClose = () => {
    setAlertState(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alertState}
        autoHideDuration={alertProps.hideDuration ?? 6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertProps.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertProps.title && <AlertTitle>{alertProps.title}</AlertTitle>}
          {alertProps.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

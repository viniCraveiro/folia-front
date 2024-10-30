import { ReactNode } from "react";
import { AlertProvider } from "./AlertProvider";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/pt-br';

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
      <AlertProvider>
        {children}
      </AlertProvider>
    </LocalizationProvider>
  );
};

export default AppProviders;

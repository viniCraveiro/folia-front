import { Box } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import theme from "../../layout/Theme";

interface QRCodeProps {
  url: string;
}

const QRCodeComponent = ({ url }: QRCodeProps) => {
  return (
    <Box
    sx={{
      borderRadius: 4 ,
      outline: 4, 
      outlineColor: theme.palette.secondary.main
    }}>
      <div className="flex justify-center items-center p-4 border rounded-md shadow-lg bg-white">
        <QRCodeSVG
          value={url}
          size={256}
          bgColor="#ffffff"
          fgColor={theme.palette.secondary.main}
          level="H"
        />
      </div>
    </Box>
  );
};

export default QRCodeComponent;

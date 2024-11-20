import { QRCodeSVG } from "qrcode.react";
import theme from "../../layout/Theme";

interface QRCodeProps {
  url: string;
}

const QRCodeComponent = ({ url }: QRCodeProps) => {
  return (
    <div className="flex justify-center items-center p-4 border rounded-md shadow-lg bg-white">
      <QRCodeSVG
        value={url}
        size={256}
        bgColor="#ffffff"
        fgColor= {theme.palette.primary.main}
        level="H"
      />
    </div>
  );
};

export default QRCodeComponent;

import { IAlertProps } from "./AlertProvider";

export const downloadURL = async (url: string | undefined, showAlert: (props: IAlertProps) => void) => {
  if (!url) {
    showAlert({
      title: "Erro na url",
      message: `Nenhuma url informada`,
      type: "error",
      hideDuration: 3000,
    });
    return;
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {},
    });

    if (!response.ok) {
      throw new Error("Erro ao baixar o arquivo");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "arquivo.pdf";
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    showAlert({
      title: "Erro ao baixar o arquivo",
      message: `O boleto não esta em um formato valido: ${url}`,
      type: "warning",
      hideDuration: 3000,
    });
    console.error("Erro ao baixar o arquivo:", error);
  }
};

export const copiarUrl = (url: string | undefined, showAlert: (props: IAlertProps) => void) => {
  if (!url) {
    showAlert({
      title: "Erro na url",
      message: `Nenhuma url informada para copiar`,
      type: "error",
      hideDuration: 3000,
    });
    return;
  };
  navigator.clipboard.writeText(url)
    .then(() => {
      showAlert({
        title: "URL copiada",
        message: `A URL foi copiada para a área de transferência.`,
        type: "success",
        hideDuration: 3000,
      });
    })
    .catch((err) => {
      showAlert({
        title: "Erro ao copiar URL",
        message: `Erro ao copiar a URL: ${err}`,
        type: "error",
        hideDuration: 3000,
      });
    });

};

export const imprimirURL = (url: string | undefined, showAlert: (props: IAlertProps) => void) => {
  if (!url) {
    showAlert({
      title: "Erro na url",
      message: `Nenhuma url informada para impressão`,
      type: "error",
      hideDuration: 3000,
    });
    return;
  }

  try {
    const printWindow = window.open(url, '_blank', 'width=800,height=600');
    
    printWindow?.addEventListener('load', () => {
      printWindow?.print();
      printWindow?.close();
    });
  } catch (error) {
    console.error("Erro ao tentar imprimir:", error);
  }
};

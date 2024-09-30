import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";

enum timeRangeEnum {
  mes = "mes",
  semana = "semana",
  ano = "ano",
}

enum graficoTypeEnum {
  bar = "bar",
  line = "line",
  pie = "pie",
}

const timeRangeLabels: Record<timeRangeEnum, string> = {
  [timeRangeEnum.mes]: "Nos últimos 30 Dias",
  [timeRangeEnum.semana]: "Na última Semana",
  [timeRangeEnum.ano]: "No último Ano",
};

const graficoTypeLabels: Record<graficoTypeEnum, string> = {
  [graficoTypeEnum.bar]: "Comparativo em barras",
  [graficoTypeEnum.line]: "Comparativo em linhas",
  [graficoTypeEnum.pie]: "Comparativo em pizza",
};

const HomePage = () => {
  const data = [
    { id: 0, value: 10 },
    { id: 1, value: 15 },
    { id: 2, value: 20 },
    { id: 3, value: 20 },
  ];

  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  const [timeRange, setTimeRange] = useState<string>(timeRangeEnum.mes);
  const [graficoType, setGraficoType] = useState<string>(graficoTypeEnum.bar);

  const handleTimeRange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value as timeRangeEnum);
  };

  const handleGraficoType = (event: SelectChangeEvent<string>) => {
    setGraficoType(event.target.value as graficoTypeEnum);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 p-6">
      <div className="md:w-1/3 w-full">
        <InputLabel id="time-range"> </InputLabel>
        <Select
          labelId="time-range"
          id="time-range-select"
          value={timeRange}
          label="Selecionar Período"
          onChange={handleTimeRange}
          variant="standard"
          sx={{ minWidth: 200 }}
        >
          {Object.values(timeRangeEnum).map((value) => (
            <MenuItem key={value} value={value}>
              {timeRangeLabels[value]}
            </MenuItem>
          ))}
        </Select>
        <div className="mt-6 flex justify-center items-center relative">
          <PieChart
            series={[
              {
                data: data,
                innerRadius: 80,
                paddingAngle: 2,
                highlightScope: { fade: "global", highlight: "item" },
                faded: { additionalRadius: -10, color: "gray" },
                cx: "60%",
              },
            ]}
            
            width={400}
            height={200}
          />
          <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-xl font-bold text-gray-700">
              {totalValue}
            </span>
            <span className="text-xl font-bold text-gray-700">Boletos</span>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 w-full">
        <InputLabel id="grafico-type"> </InputLabel>
        <Select
          labelId="grafico-type"
          id="grafico-type-select"
          value={graficoType}
          label="Tipo de Grafico"
          onChange={handleGraficoType}
          variant="standard"
          sx={{ minWidth: 200 }}
        >
          {Object.values(graficoTypeEnum).map((value) => (
            <MenuItem key={value} value={value}>
              {graficoTypeLabels[value]}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="md:w-1/3 w-full">
        <div className="bg-gray-100 p-4 rounded-lg">Terceira Coluna</div>
      </div>
    </div>
  );
};

export default HomePage;

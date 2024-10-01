import { Chip, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

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

  const data = [20, 15, 20, 20];
  const label = ['Pagos:', 'Próximos do Vencimento:', 'Em Aberto:', 'Vencidos:']

  const dataGraph = [
    { id: 0, value: data[0], label: label[0] },
    { id: 1, value: data[1], label: label[1] },
    { id: 2, value: data[2], label: label[2] },
    { id: 3, value: data[3], label: label[3] },
  ];

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
  }));

  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <>
        <StyledText className="font-bold text-4xl" x={left + width / 2} y={12 - top + height / 2}>
          {children}
        </StyledText>
        <StyledText className="font-light" x={left + width / 2} y={18 + top + height / 2}>
          Boletos
        </StyledText>
      </>
    );
  }

  const totalValue = dataGraph.reduce((sum, entry) => sum + entry.value, 0);

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
        <PieChart
          colors={['#34C759', '#F9AB35', '#356CF9', '#F93535']}
          className="mt-1"
          margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
          slotProps={{ legend: { hidden: true } }}
          series={[
            {
              data: dataGraph,
              innerRadius: 70,
              paddingAngle: 2,
              cornerRadius: 2,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { additionalRadius: -10, color: "gray" },
            },
          ]}
          width={400}
          height={200}
        >
          <PieCenterLabel>
            {totalValue}
          </PieCenterLabel>
        </PieChart>
        <div className="flex-row">
          {Object.values(label).map((value) => (
            <Typography variant="body1" component="h6">
              {value}
            </Typography>
          ))}

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

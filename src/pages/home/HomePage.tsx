import {
  Avatar,
  Box,
  InputLabel,
  LinearProgress,
  linearProgressClasses,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { useEffect, useState } from "react";
// import  styled from '@mui/material/styles';
import { styled as muiStyled, styled } from "@mui/material/styles";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Link } from "react-router-dom";
import SkeletonDefault from "../../layout/SkeletoComponent";
import DashboardServices from "../../services/home/DashboardServices";
import { DashboardDataSet } from "./DashboardDataSet";

// import styled from '@emotion/styled';

const dashboardServices = new DashboardServices();

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
  const [loading, setLoading] = useState(true);
  const [dashboardDataSet, setDashboardDataSet] = useState<DashboardDataSet>(
    new DashboardDataSet()
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dashboardServices.getBoletosDataSet().then((response) => {
          if (response) {
            console.log(response);
            dashboardDataSet.data = response;
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const clientesData = [
    { id: 0, name: "Pessoa 1", boletosTotal: 14, boletosPagos: 6 },
    { id: 1, name: "Pessoa 2", boletosTotal: 11, boletosPagos: 4 },
    { id: 2, name: "Pessoa 3", boletosTotal: 22, boletosPagos: 20 },
    { id: 3, name: "Pessoa 4", boletosTotal: 14, boletosPagos: 8 },
  ];

  const normalise = (valueInitial: number, valueMax: number) =>
    (valueInitial * 100) / valueMax;

  const StyledText = muiStyled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
  }));

  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <>
        <StyledText
          className="font-bold text-4xl"
          x={left + width / 2}
          y={12 - top + height / 2}
        >
          {children}
        </StyledText>
        <StyledText
          className="font-light"
          x={left + width / 2}
          y={18 + top + height / 2}
        >
          Boletos
        </StyledText>
      </>
    );
  }
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 32,
    borderRadius: 14,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[400],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 14,
      backgroundColor: "#00FF38",
    },
  }));

  const totalValue = dashboardDataSet.dataSet.reduce((sum, entry) => sum + entry.value, 0);

  const [timeRange, setTimeRange] = useState<string>(timeRangeEnum.mes);
  const [graficoType, setGraficoType] = useState<string>(graficoTypeEnum.bar);

  const handleTimeRange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value as timeRangeEnum);
  };

  const handleGraficoType = (event: SelectChangeEvent<string>) => {
    setGraficoType(event.target.value as graficoTypeEnum);
  };

  return !loading ? (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-4">
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
            className="mt-6 mb-4"
            margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
            slotProps={{ legend: { hidden: true } }}
            series={[
              {
                data: dashboardDataSet.dataSet,
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
            <PieCenterLabel>{totalValue}</PieCenterLabel>
          </PieChart>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small" aria-label="Boletos table">
              <TableHead></TableHead>
              <TableBody>
                {Object.values(dashboardDataSet.dataSet).map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" component="th" scope="row">
                      <Box
                        style={{ backgroundColor: data.color }}
                        className="rounded-sm w-4 h-4 flex items-center justify-center"
                      ></Box>
                    </TableCell>
                    <TableCell align="left">
                      {data.label}{" "}
                      {((data.value * 100) / totalValue).toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">Total de {data.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex-row"></div>
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
          <div className="flex flex-col mt-6">
            {Object.values(dashboardDataSet.dataSet).map((data) => (
              <div key={data.id} className="flex items-center">
                <Gauge
                  className="flex-none mb-2"
                  cornerRadius="15%"
                  width={120}
                  height={84}
                  value={data.value}
                  valueMax={totalValue}
                  startAngle={90}
                  endAngle={-5}
                  innerRadius="78%"
                  outerRadius="100%"
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 20,
                      transform: "translate(10px, -10px)",
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: data.color,
                    },
                  }}
                />
                <Typography
                  variant="body1"
                  className="ml-2 text-wrap pl-12 mr-12"
                >
                  Aumento de {((data.value * 100) / totalValue / 5).toFixed(2)}%
                  do último mês
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/3 w-full">
          <div className="flex flex-row mt-2 justify-between items-center">
            <Typography variant="body1" className="items-center">
              Clientes
            </Typography>
            <Link href="#"> {"Ver Todos >"} </Link>
          </div>
          {Object.values(clientesData).map((cliente, index) => (
            <Box key={index} className="rounded-md w-full h-16 mt-6">
              <Box className="columns-3 flex">
                <Box>
                  <Avatar
                    className="ml-2 h-14 w-14 mr-4 items-center flex-none"
                    alt={cliente.name}
                    src="/static/images/avatar/1.jpg"
                  />
                </Box>
                <Box className="h-16 flex-1">
                  <Typography variant="h6" className="">
                    {cliente.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    {`${cliente.boletosPagos} de ${cliente.boletosTotal} boletos pagos.`}
                  </Typography>
                </Box>

                <Box className="flex h-16 w-16 items-center">
                  <Stack spacing={4} sx={{ flexGrow: 4 }}>
                    <BorderLinearProgress
                      variant="determinate"
                      value={normalise(
                        cliente.boletosPagos,
                        cliente.boletosTotal
                      )}
                    />
                  </Stack>
                </Box>
              </Box>
            </Box>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <SkeletonDefault></SkeletonDefault>
  );
};

export default HomePage;

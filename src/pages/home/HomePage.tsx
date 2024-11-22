/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { LinearProgress, Typography, Box, Divider } from '@mui/material';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays, subMonths, subYears } from 'date-fns';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale'; 
import "react-datepicker/dist/react-datepicker.css";

const generateRandomData = (numPoints: number, labels: string[]) => {
  const data = [];
  let lastValue = 20;

  for (let i = 0; i < numPoints; i++) {
    const randomChange = Math.floor(Math.random() * 20) - 5;
    lastValue = Math.max(0, lastValue + randomChange);
    data.push({ label: labels[i], value: lastValue });
  }

  return data;
};

const HomePage: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('Últimos 5 anos');
  const [selectedMonth, setSelectedMonth] = useState('Janeiro 2024');
  const [dataLineChart, setDataLineChart] = useState([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Estado para a data selecionada

  const monthlyData = {
    'Novembro 2023': { totalValue: 11, totalOpen: 0, totalPaid: 2, totalOverdue: 1 },
    'Dezembro 2023': { totalValue: 7, totalOpen: 1, totalPaid: 3, totalOverdue: 2 },
    'Janeiro 2024': { totalValue: 22, totalOpen: 13, totalPaid: 6, totalOverdue: 2 },
    'Fevereiro 2024': { totalValue: 5, totalOpen: 2, totalPaid: 4, totalOverdue: 2 },
    'Março 2024': { totalValue: 6, totalOpen: 0, totalPaid: 5, totalOverdue: 3 },
    'Abril 2024': { totalValue: 12, totalOpen: 2, totalPaid: 6, totalOverdue: 4 },
    'Maio 2024': { totalValue: 14, totalOpen: 0, totalPaid: 8, totalOverdue: 8 },
    'Junho 2024': { totalValue: 11, totalOpen: 0, totalPaid: 9, totalOverdue: 5 },
    'Julho 2024': { totalValue: 2, totalOpen: 2, totalPaid: 225, totalOverdue: 4 },
    'Agosto 2024': { totalValue: 3, totalOpen: 3, totalPaid: 1, totalOverdue: 1 },
    'Setembro 2024': { totalValue: 4, totalOpen: 2, totalPaid: 2, totalOverdue: 5 },
    'Outubro 2024': { totalValue: 16, totalOpen: 5, totalPaid: 3, totalOverdue: 7 },
  };

  const [totalValue, setTotalValue] = useState(monthlyData[selectedMonth]?.totalValue || 0);
  const [totalOpen, setTotalOpen] = useState(monthlyData[selectedMonth]?.totalOpen || 0);
  const [totalPaid, setTotalPaid] = useState(monthlyData[selectedMonth]?.totalPaid || 0);
  const [totalOverdue, setTotalOverdue] = useState(monthlyData[selectedMonth]?.totalOverdue || 0);

  // Geração de dados para o gráfico
  useEffect(() => {
    const today = new Date();
    let numPoints = 0;
    let newLabels: string[] = [];

    switch (selectedRange) {
      case 'Últimos 5 anos':
        numPoints = 5;
        newLabels = Array.from({ length: numPoints }, (_, i) => format(subYears(today, numPoints - i - 1), 'yyyy'));
        break;
      case 'Último ano':
        numPoints = 12;
        newLabels = Array.from({ length: numPoints }, (_, i) => format(subMonths(today, numPoints - i - 1), 'MMM'));
        break;
      case 'Últimos 30 dias':
        numPoints = 30;
        newLabels = Array.from({ length: numPoints }, (_, i) => format(subDays(today, numPoints - i - 1), 'dd'));
        break;
      case 'Última semana':
        numPoints = 7;
        newLabels = Array.from({ length: numPoints }, (_, i) => format(subDays(today, numPoints - i - 1), 'EEE', { locale: ptBR }));
        break;
      default:
        numPoints = 12;
        newLabels = Array.from({ length: numPoints }, (_, i) => format(subMonths(today, numPoints - i - 1), 'MMM'));
    }

    setLabels(newLabels);
    setDataLineChart(generateRandomData(numPoints, newLabels));
  }, [selectedRange]);

  useEffect(() => {
    if (monthlyData[selectedMonth]) {
      setTotalValue(monthlyData[selectedMonth].totalValue);
      setTotalOpen(monthlyData[selectedMonth].totalOpen);
      setTotalPaid(monthlyData[selectedMonth].totalPaid);
      setTotalOverdue(monthlyData[selectedMonth].totalOverdue);
    }
  }, [selectedMonth]);

  const formatDate = (date: Date) => {
    return format(date, 'dd \'de\' MMMM, yyyy', { locale: ptBR });
  };

  return (
    <div className="flex p-6">
      <div className="flex-1 w-2/3">
        <Box className="bg-white rounded-lg shadow-md p-4 mb-6 relative">
          <Typography variant="h6">Total boletos</Typography>
          <Box className="relative h-48">
            {dataLineChart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataLineChart} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <XAxis dataKey="label" />
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#FF9A9A"
                    strokeWidth={2}
                    dot={<CustomDot />}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography>Carregando gráfico...</Typography>
            )}
          </Box>
          <Typography variant="caption" className="text-gray-500 absolute top-4 right-4">
            <select
              className="border border-gray-300 p-1 rounded text-sm"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
            >
              <option value="Últimos 5 anos">Últimos 5 anos</option>
              <option value="Último ano">Últimos 12 meses</option>
              <option value="Últimos 30 dias">Últimos 30 dias</option>
              <option value="Última semana">Últimos 7 dias</option>
            </select>
          </Typography>
        </Box>

        <Box className="bg-white rounded-lg shadow-md p-4">
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6">Balanço</Typography>
            <select
              className="border border-gray-300 p-1 rounded text-sm"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {Object.keys(monthlyData).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </Box>
          <Divider className="my-2" />
          <ProgressBar label="Total" value={totalValue} color="#000000" isTotal />
          <ProgressBar label="Total em aberto" value={totalOpen} color="#1976d2" />
          <ProgressBar label="Total pagos" value={totalPaid} color="#388e3c" />
          <ProgressBar label="Total vencidos" value={totalOverdue} color="#d32f2f" />
        </Box>
      </div>

      <div className="w-1/3">
        <Box className="bg-white rounded-lg shadow-md p-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            dateFormat="MMMM dd, yyyy"
            className="w-full p-2 rounded text-sm"
            inline
            locale={ptBR}
            dayClassName={(date) => {
              const today = new Date();
              const isSelectedDay = selectedDate && date.getDate() === selectedDate.getDate();
              const isCurrentMonth = date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
              if (isSelectedDay) return "bg-[#ffabab]"; // Dia selecionado
            }}
            calendarClassName="border-none"
            previousMonthButtonLabel="←"
            nextMonthButtonLabel="→"
            shouldCloseOnSelect={false}
            renderDayContents={(day) => <span>{day}</span>}
            customInput={<input className="hidden" />}
            popperClassName="hidden"
          />

          {selectedDate && (
            <Box className="mt-4">
              <Typography variant="body2" style={{ fontSize: '0.875rem', color: '#555' }}>
                {formatDate(selectedDate)}
              </Typography>
            </Box>
          )}

          <Box className="mt-4">
            <Typography variant="body2" style={{ fontSize: '0.875rem', color: '#555' }}>
              Boletos gerados
            </Typography>
            <Typography variant="body2" style={{ fontSize: '0.875rem', color: '#555' }}>
              Boletos abertos
            </Typography>
            <Typography variant="body2" style={{ fontSize: '0.875rem', color: '#555' }}>
              Boletos pagos
            </Typography>
            <Typography variant="body2" style={{ fontSize: '0.875rem', color: '#555' }}>
              Boletos vencidos
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

const CustomDot = (props: any) => {
  const { cx, cy, active } = props;
  if (!active) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#FFFFFF" />
      <circle cx={cx} cy={cy} r={8} fill="none" stroke="#FF9A9A" strokeWidth={2} />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded p-2">
        <Typography>{`${payload[0].payload.label}: ${payload[0].payload.value}`}</Typography>
      </div>
    );
  }
  return null;
};

const ProgressBar = ({ label, value, color, isTotal }: { label: string; value: number; color: string, isTotal?: boolean }) => {
  return (
    <div className="mb-4">
      <LinearProgress
        variant="determinate"
        value={isTotal ? 100 : (value / 22) * 100}
        style={{ backgroundColor: '#D3D3D3', height: 6 }}
        sx={{ '& .MuiLinearProgress-bar': { backgroundColor: color } }}
      />
      <Box className="flex justify-between items-center">
        <Typography variant="subtitle2" style={{ color: '#A9A9A9' }}>{label}</Typography>
        <Typography variant="caption" style={{ fontWeight: 'bold', color: '#000000' }}>
          {value}
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;

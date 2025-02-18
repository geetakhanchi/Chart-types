import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// component import
import CandleStick from "./CandleStick";

// mui imports
import {
  Box,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// Chart Data for Line, Bar, and Mixed charts
const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Sales",
      data: [30, 50, 40, 60, 70, 50, 90],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

// Mixed Chart Data
const mixedChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      type: "bar",
      label: "Bar Dataset",
      data: [30, 50, 40, 60, 70, 50, 90],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
    {
      type: "line",
      label: "Line Dataset",
      data: [40, 60, 45, 70, 80, 60, 100],
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
    },
  ],
};

// Dual Axis Chart Data
const dualAxisChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Revenue",
      data: [100, 200, 150, 250, 300, 200, 350],
      borderColor: "blue",
      backgroundColor: "rgba(0, 0, 255, 0.5)",
      yAxisID: "y",
    },
    {
      label: "Profit",
      data: [10, 30, 20, 40, 50, 30, 60],
      borderColor: "green",
      backgroundColor: "rgba(0, 255, 0, 0.5)",
      yAxisID: "y1",
    },
  ],
};

export default function ChartComponent() {
  const [chartType, setChartType] = useState<string>("line");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const chartTypes = [
    { value: "line", label: "Line Chart" },
    { value: "bar", label: "Bar Chart" },
    { value: "mixed", label: "Mixed Chart" },
    { value: "dualAxis", label: "Double Axis Chart" },
    { value: "candlestick", label: "Candlestick Chart" },
  ];

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setChartType(event.target.value as string);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchTerm(search);

    const matchedChart = chartTypes.find((chart) =>
      chart.label.toLowerCase().includes(search.toLowerCase())
    );
    if (matchedChart) {
      setChartType(matchedChart.value);
    }
  };

  return (
    <Box p={4}>
      <Box display="flex" gap={10} mb={4}>
        <TextField
          placeholder="Search Chart Type"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              height: "5vh",
            },
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <CandlestickChartIcon />
          <Select
            value={chartType}
            onChange={handleChange}
            variant="standard"
            style={{ height: "5vh", marginLeft: "5px" }}
          >
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="mixed">Mixed Chart</MenuItem>
            <MenuItem value="dualAxis">Double Axis Chart</MenuItem>
            <MenuItem value="candlestick">Candlestick Chart</MenuItem>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "10px",
          }}
        >
          <EditIcon style={{ fontSize: "1.2rem" }} />
          <span>Draw</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <InfoIcon style={{ fontSize: "1.2rem" }} />
          <span>Info</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <ArticleIcon style={{ fontSize: "1.2rem" }} />
          <span>Table View</span>
        </div>
        <div
          style={{
            color: "#361f7a",
            display: "flex",
            alignItems: "center",
            fontWeight: "500",
            fontSize: "1.2rem",
          }}
        >
          Selected Chart :{" "}
          {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
        </div>
      </Box>

      {chartType === "line" && (
        <Line data={chartData} options={{ responsive: true }} />
      )}
      {chartType === "bar" && (
        <Bar data={chartData} options={{ responsive: true }} />
      )}
      {chartType === "mixed" && (
        <Bar data={mixedChartData} options={{ responsive: true }} />
      )}
      {chartType === "dualAxis" && (
        <Line
          data={dualAxisChartData}
          options={{
            responsive: true,
            scales: {
              y: {
                type: "linear",
                position: "left",
                title: { display: true, text: "Revenue" },
              },
              y1: {
                type: "linear",
                position: "right",
                title: { display: true, text: "Profit" },
                grid: { drawOnChartArea: false },
              },
            },
          }}
        />
      )}
      {chartType === "candlestick" && <CandleStick />}
    </Box>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, useMediaQuery } from "@mui/material";
import { COLORS } from "../../constants/insex";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  // responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "March",
  "April",
  "May",
  "June",
  "July",
];
function generateRandomDataPoints(count: number) {
  const dataPoints = [];

  for (let i = 0; i < count; i++) {
    const randomX = i * 2; // Adjust as needed based on your x-axis values
    const randomY = Math.random() * 100; // Adjust the range based on your y-axis values

    dataPoints.push([randomX, randomY]);
  }

  return dataPoints;
}

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      lineTension: 0.4, // Set tension to control the curve

      data: generateRandomDataPoints(10),
      borderColor: COLORS.primary,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backgroundColor: (context: any) => {
        const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, " rgba(157, 128, 95, .8)"); // Start with the desired color
        gradient.addColorStop(0.5, "rgba(157, 128, 95, .5)"); // Start with the desired color

        gradient.addColorStop(0.7, "rgba(157, 128, 95, .3)"); // Adjust the transparency or add more stops
        gradient.addColorStop(1, "rgba(157, 128, 95, 0)"); // Adjust the transparency or add more stops

        return gradient;
      },
    },
    {
      fill: true,
      label: "Dataset 1",
      lineTension: 0.4, // Set tension to control the curve

      data: generateRandomDataPoints(10),
      borderColor: COLORS.secondary,
      backgroundColor: "transparent",
    },
  ],
};

export function AreaChartSimple() {
  const isSmallScreen = useMediaQuery("(max-width:700px)");

  return (
    <Box sx={{ height: isSmallScreen ? "300px" : "400px", width: "100% " }}>
      <Line options={options} data={data} />
    </Box>
  );
}

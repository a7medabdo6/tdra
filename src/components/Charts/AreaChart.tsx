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

const labels = [
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];
// function generateRandomDataPoints(count: number) {
//   const dataPoints = [];

//   for (let i = 0; i < count; i++) {
//     const randomX = i * 2; // Adjust as needed based on your x-axis values
//     const randomY = Math.random() * 100; // Adjust the range based on your y-axis values

//     dataPoints.push([randomX, randomY]);
//   }

//   return dataPoints;
// }

export function AreaChartSimple({
  data,
  type = "percentage",
  title = "",
}: any) {
  const options = {
    // responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: { title: { display: true, text: "Month" } },
      y: {
        title: { display: true, text: "Succeed Count" },
        ticks: {
          beginAtZero: true,
          min: 0,
          callback: function (value: any) {
            return value + (type == "normal" ? "" : " %");
          },
        },
      },
    },

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const succeedData = data?.succeedCounts;
  const failedData = data?.failedCounts;
  console.log(data?.succeedCounts, "data?.succeedCounts");

  const maxSucceed = succeedData ? Math.max(...succeedData) : 0;
  const maxFailed = failedData ? Math.max(...failedData) : 0;

  const maxY = Math.max(maxSucceed, maxFailed) + 10;
  console.log(maxY, "MAXXX");

  const dataChart = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: "Succeed",
        lineTension: 0.4, // Set tension to control the curve

        data: data?.succeedCounts,
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
        label: "Failed ",
        lineTension: 0.4, // Set tension to control the curve

        data: data?.failedCounts,
        borderColor: COLORS.secondary,
        backgroundColor: "transparent",
      },
    ],
    options: {
      scales: {
        x: { title: { display: true, text: "Month" } },
        y: {
          title: { display: true, text: "Succeed Count" },
          ticks: {
            beginAtZero: true,
            min: 0,
            callback: function (value: any) {
              return value + " %";
            },
          }, // Set min to 0 to hide negative values
        },
      },
    },
  };
  return (
    <Box sx={{ height: isSmallScreen ? "300px" : "400px", width: "100% " }}>
      <Line options={options} data={dataChart} />
    </Box>
  );
}

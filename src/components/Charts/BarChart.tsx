import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { COLORS } from "../../constants/insex";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  },
  cornerRadius: 20, // Adjust the border radius here
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

// Replace faker with your own dummy data
const generateDummyData = () => {
  return labels.map(() => Math.floor(Math.random() * 2000));
};

export const data = {
  labels,
  datasets: [
    {
      label: "Sent",
      data: generateDummyData(),
      backgroundColor: COLORS.primary,
      borderRadius: 20, // Add border radius to the bars
    },
    {
      label: "Received",
      data: generateDummyData(),
      backgroundColor: COLORS.secondary,
      borderRadius: 20, // Add border radius to the bars
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}

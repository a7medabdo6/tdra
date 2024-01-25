import React, { useEffect, useState } from "react";
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
import { useFetchCommunicationgetcommunicationspertypemonth } from "../../Api/Hooks/Dashboard";

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
      text: "",
    },
  },
  // responsive: true,
  maintainAspectRatio: false,

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

export function BarChart() {
  const { data } = useFetchCommunicationgetcommunicationspertypemonth();

  const [firstChart, setFirstChart] = useState<any>({});

  useEffect(() => {
    const months = data?.map((item: any) => item.month);
    const sentCount = data?.map((item: any) => item.sentCount);
    const receivedCount = data?.map((item: any) => item.receivedCount);
    setFirstChart({ months, sentCount, receivedCount });
  }, [data]);

  const datachart = {
    labels: firstChart?.months,
    datasets: [
      {
        label: "Sent",
        data: firstChart?.sentCount,
        backgroundColor: COLORS.primary,
        borderRadius: 20, // Add border radius to the bars
      },
      {
        label: "Received",
        data: firstChart?.receivedCount,
        backgroundColor: COLORS.secondary,
        borderRadius: 20, // Add border radius to the bars
      },
    ],
  };
  return <Bar options={options} data={datachart} />;
}

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

export function BarChart({ type, filters }: any) {
  const options = {
    plugins: {
      legend: {
        display: false,

        position: "top" as const,
      },
      title: {
        display: false,
        text: "Communication ( send / recieved ) Chart",
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
        ticks: {
          beginAtZero: true,
          min: 0,
          callback: function (value: any) {
            return value + (type == "normal" ? "" : " %");
          },
        },
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
  const { data } = useFetchCommunicationgetcommunicationspertypemonth({
    ...filters,
  });

  const [firstChart, setFirstChart] = useState<any>({});
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const datasucceed = labels.map((month) => {
      const monthData = data?.find((item: any) => item.month === month);
      return monthData ? monthData.sentCount : 0;
    });

    const datafailed = labels.map((month) => {
      const monthData = data?.find((item: any) => item.month === month);
      return monthData ? monthData.receivedCount : 0;
    });
    const months = data?.map((item: any) => item.month);
    // const sentCount = data?.map((item: any) => item.sentCount);
    // const receivedCount = data?.map((item: any) => item.receivedCount);
    setFirstChart({
      months,
      sentCount: datasucceed,
      receivedCount: datafailed,
    });
  }, [data]);

  const datachart = {
    labels: labels,
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

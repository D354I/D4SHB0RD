import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const SectorChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available to display.</p>;
  }

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFCD56",
    "#4DC0C0",
    "#C9CBCF",
    "#FF4500",
    "#40E0D0",
    "#8A2BE2",
    "#A52A2A",
    "#5F9EA0",
    "#FF6347",
    "#4682B4",
    "#D2691E",
    "#6495ED",
    "#DC143C",
  ];

  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: colors.slice(0, data.length),
      },
    ],
  };

  return (
    <div className="my-4">
      <h3>Insights by Sector</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default SectorChart;

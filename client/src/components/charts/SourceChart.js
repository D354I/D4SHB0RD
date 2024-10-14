import React from "react";
import {
  Chart,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const SourceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available to display.</p>;
  }

  const colors = ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0", "#9966FF"];

  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Insights by Source",
        data: data.map((d) => d.count),
        backgroundColor: colors.slice(0, data.length),
      },
    ],
  };

  return (
    <div className="my-4">
      <h3>Insights by Source</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default SourceChart;

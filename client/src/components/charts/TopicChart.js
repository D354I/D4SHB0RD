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

const TopicChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available to display.</p>;
  }

  const colors = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"];

  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Insights by Topic",
        data: data.map((d) => d.count),
        backgroundColor: colors.slice(0, data.length),
      },
    ],
  };

  const options = {
    indexAxis: "y",
  };

  return (
    <div className="my-4">
      <h3>Insights by Topic</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TopicChart;

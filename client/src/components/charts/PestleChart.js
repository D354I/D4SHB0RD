import React from "react";
import {
  Chart,
  RadarController,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LinearScale,
  RadialLinearScale,
} from "chart.js"; 
import { Radar } from "react-chartjs-2";

Chart.register(
  RadarController,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LinearScale,
  RadialLinearScale
);

const PestleChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available to display.</p>;
  }

  const chartData = {
    labels: data.map((d) => d._id), 
    datasets: [
      {
        label: "PESTLE Breakdown",
        data: data.map((d) => d.count),
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
      },
    ],
  };

  return (
    <div className="my-4">
      <h3>PESTLE Breakdown</h3>
      <Radar data={chartData} />
    </div>
  );
};

export default PestleChart;

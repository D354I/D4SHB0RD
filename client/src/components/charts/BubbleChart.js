import React from "react";
import {
  Chart,
  RadarController,
  PointElement,
  RadialLinearScale,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Radar } from "react-chartjs-2";

Chart.register(
  RadarController,
  PointElement,
  RadialLinearScale,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const BubbleChart = ({ data }) => {
  // Check if data
  if (!data || data.length === 0) {
    return <p>No data available to display.</p>; 
  }

  // Prepare chart
  const chartData = {
    labels: ["Likelihood", "Relevance", "Intensity"],
    datasets: data.map((d, index) => ({
      label: `Insight ${index + 1}`,
      data: [d.likelihood, d.relevance, d.intensity],
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.2)`,
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 1)`,
      borderWidth: 2,
    })),
  };

  return (
    <div className="my-4">
      <h3>Intensity, Likelihood, Relevance</h3>
      <Radar data={chartData} />
    </div>
  );
};

export default BubbleChart;

import React from "react";
import { Modal } from "react-bootstrap";
import CountryRegionChart from "../charts/CountryRegionChart";
import SectorChart from "../charts/SectorChart";
import TopicChart from "../charts/TopicChart";
import SourceChart from "../charts/SourceChart";
import PestleChart from "../charts/PestleChart";
import BubbleChart from "../charts/BubbleChart";

const MaximizeChartModal = ({ show, handleClose, activeChart, chartData }) => {
  const renderChart = () => {
    switch (activeChart) {
      case "CountryRegionChart":
        return <CountryRegionChart data={chartData.countryData} />;
      case "SectorChart":
        return <SectorChart data={chartData.sectorData} />;
      case "TopicChart":
        return <TopicChart data={chartData.topicData} />;
      case "SourceChart":
        return <SourceChart data={chartData.sourceData} />;
      case "PestleChart":
        return <PestleChart data={chartData.pestleData} />;
      case "BubbleChart":
        return <BubbleChart data={chartData.bubbleData} />;
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Maximized Chart View</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderChart()}</Modal.Body>
    </Modal>
  );
};

export default MaximizeChartModal;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { fetchData } from "../../services/api";
import SummaryCards from "./SummaryCards";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";
import InsightTable from "./InsightTable";
import MaximizeChartModal from "../modals/MaximizeChartModal";
import CountryRegionChart from "../charts/CountryRegionChart";
import SectorChart from "../charts/SectorChart";
import TopicChart from "../charts/TopicChart";
import SourceChart from "../charts/SourceChart";
import PestleChart from "../charts/PestleChart";
import BubbleChart from "../charts/BubbleChart";
import ChartCard from "./ChartCard";

// Custom Hook for Fetching Data
const useFetchInsights = (query, startYear, endYear) => {
  const [data, setData] = useState({
    insights: [],
    chartData: {
      countryData: [],
      sectorData: [],
      topicData: [],
      sourceData: [],
      pestleData: [],
      bubbleData: [],
    },
    summary: {},
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchInsights = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const result = await fetchData(query, startYear, endYear);
      setData({
        insights: result?.insights || [],
        chartData: result?.chartData || {},
        summary: result?.summary || {},
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("An error occurred while fetching data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [query, startYear, endYear]);

  useEffect(() => {
    fetchInsights();
    // eslint-disable-next-line
  }, [fetchInsights]);

  return { data, errorMessage, isLoading };
};

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeChart, setActiveChart] = useState(null);
  
  const itemsPerPage = 10;

  const { data, errorMessage, isLoading } = useFetchInsights(query, startYear, endYear);
  const { insights, chartData, summary } = data;

  const totalPages = useMemo(() => Math.ceil(insights.length / itemsPerPage), [insights.length]);
  const currentInsights = useMemo(() => {
    const indexOfLastInsight = currentPage * itemsPerPage;
    const indexOfFirstInsight = indexOfLastInsight - itemsPerPage;
    return insights.slice(indexOfFirstInsight, indexOfLastInsight);
  }, [insights, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleMaximize = (chart) => {
    setActiveChart(chart);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setActiveChart(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const isDataAvailable = useMemo(() => {
    return Object.values(summary).some(value => value > 0) ||
           Object.values(chartData).some(arr => arr.length > 0) ||
           insights.length > 0;
  }, [summary, chartData, insights]);

  return (
    <div className="container-fluid my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
      </nav>

      <SearchForm
        query={query}
        setQuery={setQuery}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
        onSearch={handleSearch}
      />

      {errorMessage && (
        <div className="alert alert-warning" style={{ position: "absolute", top: "20px", right: "20px", zIndex: 1050 }}>
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="alert alert-info" style={{ position: "absolute", top: "20px", right: "20px", zIndex: 1050 }}>
          Loading data, please wait...
        </div>
      ) : (
        <>
          {!isDataAvailable ? (
            <div className="alert alert-info" style={{ position: "absolute", top: "20px", right: "20px", zIndex: 1050 }}>
              No data available for this keyword search.
            </div>
          ) : (
            <>
              <SummaryCards summary={summary} keyword={query} />

              <div className="row row-cols-1 row-cols-md-2 g-4">
                {Object.entries(chartData).map(([key, data]) => (
                  <ChartCard
                    key={key}
                    chartComponent={
                      data.length > 0 ? React.createElement(getChartComponent(key), { data }) : <p>No data available for {key}</p>
                    }
                    handleMaximize={() => handleMaximize(key)}
                  />
                ))}
              </div>

              {insights.length > 0 ? (
                <InsightTable insights={currentInsights} />
              ) : (
                <p>No insights available to display.</p>
              )}

              {insights.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              )}

              <MaximizeChartModal
                show={showModal}
                activeChart={activeChart}
                chartData={chartData}
                handleClose={handleClose}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

// Function to map chart type to the respective chart component
const getChartComponent = (chartType) => {
  const chartMap = {
    countryData: CountryRegionChart,
    sectorData: SectorChart,
    topicData: TopicChart,
    sourceData: SourceChart,
    pestleData: PestleChart,
    bubbleData: BubbleChart,
  };

  return chartMap[chartType] || null;
};

export default Dashboard;

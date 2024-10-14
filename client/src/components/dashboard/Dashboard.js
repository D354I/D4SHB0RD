import React, { useState, useEffect } from "react";
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

const Dashboard = () => {
  const [insights, setInsights] = useState([]);
  const [chartData, setChartData] = useState({
    countryData: [],
    sectorData: [],
    topicData: [],
    sourceData: [],
    pestleData: [],
    bubbleData: [],
  });
  const [summary, setSummary] = useState({});
  const [query, setQuery] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeChart, setActiveChart] = useState(null);
  const [keyword, setKeyword] = useState("insights");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      setIsLoading(true);
      try {
        const data = await fetchData(query, startYear, endYear);

        setInsights(data?.insights || []);
        setChartData({
          countryData: data?.chartData?.countryData || [],
          sectorData: data?.chartData?.sectorData || [],
          topicData: data?.chartData?.topicData || [],
          sourceData: data?.chartData?.sourceData || [],
          pestleData: data?.chartData?.pestleData || [],
          bubbleData: data?.chartData?.bubbleData || [],
        });
        setSummary(data?.summary || {});
        setKeyword(query || "insights");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataOnLoad();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setErrorMessage("");

    if ((startYear || endYear) && !query) {
      setErrorMessage("Search query is required when filtering by year.");
      setIsLoading(false);
      return;
    }

    if ((startYear && !endYear) || (!startYear && endYear)) {
      setErrorMessage(
        "Both start year and end year must be provided for year-based search."
      );
      setIsLoading(false);
      return;
    }

    if (startYear && endYear && Number(startYear) > Number(endYear)) {
      setErrorMessage("Start year must be less than or equal to end year.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchData(query, startYear, endYear);

      if (data && data.insights && data.insights.length > 0) {
        setInsights(data.insights);
        setChartData({
          countryData: data.chartData?.countryData || [],
          sectorData: data.chartData?.sectorData || [],
          topicData: data.chartData?.topicData || [],
          sourceData: data.chartData?.sourceData || [],
          pestleData: data.chartData?.pestleData || [],
          bubbleData: data.chartData?.bubbleData || [],
        });
        setSummary(data.summary || {});
        setKeyword(query);
      } else {
        setInsights([]);
        setChartData({
          countryData: [],
          sectorData: [],
          topicData: [],
          sourceData: [],
          pestleData: [],
          bubbleData: [],
        });
        setSummary({});
        setErrorMessage("No data available for this keyword search.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage(
        "An error occurred while fetching data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(insights.length / itemsPerPage);

//   const pageNumbersToShow = () => {
//     const range = 3;
//     const start = Math.max(1, currentPage - Math.floor(range / 2));
//     const end = Math.min(totalPages, start + range - 1);

//     const adjustedStart = Math.max(1, end - range + 1);

//     return Array.from(
//       { length: end - adjustedStart + 1 },
//       (_, i) => adjustedStart + i
//     );
//   };

  const indexOfLastInsight = currentPage * itemsPerPage;
  const indexOfFirstInsight = indexOfLastInsight - itemsPerPage;
  const currentInsights = insights.slice(
    indexOfFirstInsight,
    indexOfLastInsight
  );

  const isDataAvailable = () => {
    const hasSummaryData = Object.values(summary || {}).some(
      (value) => value > 0
    );
    const hasChartData = Object.values(chartData || {}).some(
      (arr) => arr.length > 0
    );
    const hasInsightData = insights.length > 0;
    return hasSummaryData || hasChartData || hasInsightData;
  };

  return (
    <div className="container-fluid my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Dashboard
          </li>
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
        keyword={keyword}
      />

      {errorMessage && (
        <div
          className="alert alert-warning"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 1050,
          }}
        >
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div
          className="alert alert-info"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 1050,
          }}
        >
          Loading data, please wait...
        </div>
      ) : (
        <>
          {!isDataAvailable() ? (
            <div
              className="alert alert-info"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 1050,
              }}
            >
              No data available for this keyword search.
            </div>
          ) : (
            <>
              <SummaryCards summary={summary} keyword={query} />

              <div className="row row-cols-1 row-cols-md-2 g-4">
                <ChartCard
                  chartComponent={
                    chartData.countryData &&
                    chartData.countryData.length > 0 ? (
                      <CountryRegionChart data={chartData.countryData} />
                    ) : (
                      <p>No data available for countries</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("CountryRegionChart")}
                />
                <ChartCard
                  chartComponent={
                    chartData.sectorData && chartData.sectorData.length > 0 ? (
                      <SectorChart data={chartData.sectorData} />
                    ) : (
                      <p>No data available for sectors</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("SectorChart")}
                />
                <ChartCard
                  chartComponent={
                    chartData.topicData && chartData.topicData.length > 0 ? (
                      <TopicChart data={chartData.topicData} />
                    ) : (
                      <p>No data available for topics</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("TopicChart")}
                />
                <ChartCard
                  chartComponent={
                    chartData.sourceData && chartData.sourceData.length > 0 ? (
                      <SourceChart data={chartData.sourceData} />
                    ) : (
                      <p>No data available for sources</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("SourceChart")}
                />
                <ChartCard
                  chartComponent={
                    chartData.pestleData && chartData.pestleData.length > 0 ? (
                      <PestleChart data={chartData.pestleData} />
                    ) : (
                      <p>No data available for PESTLE</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("PestleChart")}
                />
                <ChartCard
                  chartComponent={
                    chartData.bubbleData && chartData.bubbleData.length > 0 ? (
                      <BubbleChart data={chartData.bubbleData} />
                    ) : (
                      <p>No data available for bubbles</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("BubbleChart")}
                />
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

export default Dashboard;

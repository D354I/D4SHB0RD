import React, { useState, useEffect, useMemo } from "react";
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
  const [state, setState] = useState({
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
    query: "",
    startYear: "",
    endYear: "",
    currentPage: 1,
    showModal: false,
    activeChart: null,
    keyword: "insights",
    errorMessage: "",
    isLoading: true,
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const data = await fetchData(state.query, state.startYear, state.endYear);

        setState((prevState) => ({
          ...prevState,
          insights: data?.insights || [],
          chartData: {
            countryData: data?.chartData?.countryData || [],
            sectorData: data?.chartData?.sectorData || [],
            topicData: data?.chartData?.topicData || [],
            sourceData: data?.chartData?.sourceData || [],
            pestleData: data?.chartData?.pestleData || [],
            bubbleData: data?.chartData?.bubbleData || [],
          },
          summary: data?.summary || {},
          keyword: state.query || "insights",
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    fetchDataOnLoad();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true, errorMessage: "" }));

    if ((state.startYear || state.endYear) && !state.query) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: "Search query is required when filtering by year.",
        isLoading: false,
      }));
      return;
    }

    if ((state.startYear && !state.endYear) || (!state.startYear && state.endYear)) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: "Both start year and end year must be provided for year-based search.",
        isLoading: false,
      }));
      return;
    }

    if (state.startYear && state.endYear && Number(state.startYear) > Number(state.endYear)) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: "Start year must be less than or equal to end year.",
        isLoading: false,
      }));
      return;
    }

    try {
      const data = await fetchData(state.query, state.startYear, state.endYear);

      if (data && data.insights && data.insights.length > 0) {
        setState((prevState) => ({
          ...prevState,
          insights: data.insights,
          chartData: {
            countryData: data.chartData?.countryData || [],
            sectorData: data.chartData?.sectorData || [],
            topicData: data.chartData?.topicData || [],
            sourceData: data.chartData?.sourceData || [],
            pestleData: data.chartData?.pestleData || [],
            bubbleData: data.chartData?.bubbleData || [],
          },
          summary: data.summary || {},
          keyword: state.query,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
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
          errorMessage: "No data available for this keyword search.",
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setState((prevState) => ({
        ...prevState,
        errorMessage: "An error occurred while fetching data. Please try again.",
      }));
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  const handleMaximize = (chart) => {
    setState((prevState) => ({ ...prevState, activeChart: chart, showModal: true }));
  };

  const handleClose = () => {
    setState((prevState) => ({ ...prevState, showModal: false, activeChart: null }));
  };

  const paginate = (pageNumber) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setState((prevState) => ({ ...prevState, currentPage: newPage }));
  };

  const totalPages = useMemo(() => Math.ceil(state.insights.length / itemsPerPage), [state.insights.length]);

  const indexOfLastInsight = state.currentPage * itemsPerPage;
  const indexOfFirstInsight = indexOfLastInsight - itemsPerPage;
  const currentInsights = useMemo(() => state.insights.slice(indexOfFirstInsight, indexOfLastInsight), [state.insights, state.currentPage]);

  const isDataAvailable = useMemo(() => {
    const hasSummaryData = Object.values(state.summary || {}).some((value) => value > 0);
    const hasChartData = Object.values(state.chartData || {}).some((arr) => arr.length > 0);
    const hasInsightData = state.insights.length > 0;
    return hasSummaryData || hasChartData || hasInsightData;
  }, [state.summary, state.chartData, state.insights]);

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
        query={state.query}
        setQuery={(query) => setState((prevState) => ({ ...prevState, query }))}
        startYear={state.startYear}
        setStartYear={(startYear) => setState((prevState) => ({ ...prevState, startYear }))}
        endYear={state.endYear}
        setEndYear={(endYear) => setState((prevState) => ({ ...prevState, endYear }))}
        onSearch={handleSearch}
        keyword={state.keyword}
      />

      {state.errorMessage && (
        <div className="alert alert-warning" style={{ position: "absolute", top: "20px", right: "20px", zIndex: 1050 }}>
          {state.errorMessage}
        </div>
      )}

      {state.isLoading ? (
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
              <SummaryCards summary={state.summary} keyword={state.query} />

              <div className="row row-cols-1 row-cols-md-2 g-4">
                <ChartCard
                  chartComponent={
                    state.chartData.countryData && state.chartData.countryData.length > 0 ? (
                      <CountryRegionChart data={state.chartData.countryData} />
                    ) : (
                      <p>No data available for countries</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("CountryRegionChart")}
                />
                <ChartCard
                  chartComponent={
                    state.chartData.sectorData && state.chartData.sectorData.length > 0 ? (
                      <SectorChart data={state.chartData.sectorData} />
                    ) : (
                      <p>No data available for sectors</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("SectorChart")}
                />
                <ChartCard
                  chartComponent={
                    state.chartData.topicData && state.chartData.topicData.length > 0 ? (
                      <TopicChart data={state.chartData.topicData} />
                    ) : (
                      <p>No data available for topics</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("TopicChart")}
                />
                <ChartCard
                  chartComponent={
                    state.chartData.sourceData && state.chartData.sourceData.length > 0 ? (
                      <SourceChart data={state.chartData.sourceData} />
                    ) : (
                      <p>No data available for sources</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("SourceChart")}
                />
                <ChartCard
                  chartComponent={
                    state.chartData.pestleData && state.chartData.pestleData.length > 0 ? (
                      <PestleChart data={state.chartData.pestleData} />
                    ) : (
                      <p>No data available for PESTLE</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("PestleChart")}
                />
                <ChartCard
                  chartComponent={
                    state.chartData.bubbleData && state.chartData.bubbleData.length > 0 ? (
                      <BubbleChart data={state.chartData.bubbleData} />
                    ) : (
                      <p>No data available for bubbles</p>
                    )
                  }
                  handleMaximize={() => handleMaximize("BubbleChart")}
                />
              </div>

              {currentInsights.length > 0 ? (
                <InsightTable insights={currentInsights} />
              ) : (
                <p>No insights available to display.</p>
              )}

              {currentInsights.length > 0 && (
                <Pagination
                  currentPage={state.currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              )}

              <MaximizeChartModal
                show={state.showModal}
                activeChart={state.activeChart}
                chartData={state.chartData}
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

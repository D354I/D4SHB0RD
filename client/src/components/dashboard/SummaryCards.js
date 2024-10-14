import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";

const SummaryCards = ({ summary = {}, keyword }) => {
  const getTooltipMessage = (key) => {
    const formattedKeyword = keyword || "insights";
    switch (key) {
      case "totalCountries":
        return `Total countries related to "${formattedKeyword}" fetched in our insights.`;
      case "totalRegions":
        return `Total regions relevant to "${formattedKeyword}" included in the data.`;
      case "totalSources":
        return `Total sources of information for "${formattedKeyword}" that we used.`;
      case "totalTopics":
        return `Total topics discussed about "${formattedKeyword}" in our insights.`;
      case "totalSectors":
        return `Total sectors associated with "${formattedKeyword}" represented in the analysis.`;
      case "totalPestle":
        return `Total categories impacting "${formattedKeyword}" insights (like Political, Economic, etc.).`;
      case "totalInsights":
        return `Total insights gathered regarding "${formattedKeyword}".`;
      default:
        return `Total count of relevant insights for "${formattedKeyword}".`;
    }
  };

  if (!Object.keys(summary).length) {
    return <div className="alert alert-info">No summary data available.</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mb-4">
      {Object.entries(summary).map(([key, value]) => (
        <div className="col" key={key}>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{getTooltipMessage(key)}</Tooltip>}
          >
            <div className="card h-100">
              <div className="card-body">
                <h5 className="text-muted fw-normal mt-0" title={key}>
                  {key.replace("total", "")}
                </h5>
                <h3 className="my-3">
                  {value !== undefined && value !== null
                    ? value.toLocaleString()
                    : "0"}
                </h3>
              </div>
            </div>
          </OverlayTrigger>
        </div>
      ))}
    </div>
  );
};

SummaryCards.propTypes = {
  summary: PropTypes.object.isRequired,
  keyword: PropTypes.string,
};

export default SummaryCards;

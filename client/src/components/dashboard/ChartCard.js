import React from "react";
import PropTypes from "prop-types";

const ChartCard = ({ chartComponent, handleMaximize }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          {chartComponent ? (
            chartComponent
          ) : (
            <div className="text-muted">No data available</div>
          )}
          {chartComponent && (
            <button className="btn btn-link" onClick={handleMaximize}>
              <i className="ri-fullscreen-line"></i> Maximize
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ChartCard.propTypes = {
  chartComponent: PropTypes.element,
  handleMaximize: PropTypes.func.isRequired,
};

export default ChartCard;

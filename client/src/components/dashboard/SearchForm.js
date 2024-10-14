import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const SearchForm = ({
  query,
  setQuery,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
  onSearch,
  keyword,
}) => {
  const clearForm = () => {
    setQuery("");
    setStartYear("");
    setEndYear("");
  };

  const handleQueryChange = (e) => {
    const value = e.target.value;
    // Using requestAnimationFrame to schedule the state update
    requestAnimationFrame(() => {
      setQuery(value);
    });
  };

  const handleStartYearChange = (e) => {
    const value = e.target.value;
    requestAnimationFrame(() => {
      setStartYear(value);
    });
  };

  const handleEndYearChange = (e) => {
    const value = e.target.value;
    requestAnimationFrame(() => {
      setEndYear(value);
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="mb-4"
    >
      <div className="row g-2">
        <div className="col-lg-6 col-md-5 position-relative">
          <input
            type="text"
            placeholder="You can search for insights by any word...."
            value={query}
            onChange={handleQueryChange} // Updated handler
            className="form-control"
            style={{ height: "40px" }}
          />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Including topics, regions, countries, and more. Just type your
                keyword and hit search!
              </Tooltip>
            }
          >
            <i
              className="bi bi-info-circle position-absolute"
              style={{
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            ></i>
          </OverlayTrigger>
        </div>

        <div className="col-lg-2 col-md-3">
          <select
            value={startYear}
            onChange={handleStartYearChange} // Updated handler
            className="form-select"
            style={{ height: "40px" }}
          >
            <option value="">Start Year</option>
            {[...Array(10).keys()].map((i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-lg-2 col-md-3">
          <select
            value={endYear}
            onChange={handleEndYearChange} // Updated handler
            className="form-select"
            style={{ height: "40px" }}
          >
            <option value="">End Year</option>
            {[...Array(10).keys()].map((i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-lg-1 col-md-6">
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ height: "40px" }}
          >
            Search
          </button>
        </div>

        <div className="col-lg-1 col-md-6">
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={clearForm}
            style={{ height: "40px" }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;

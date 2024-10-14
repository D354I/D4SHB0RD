import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbersToShow = () => {
    const range = 3;
    const start = Math.max(1, currentPage - Math.floor(range / 2));
    const end = Math.min(totalPages, start + range - 1);

    const adjustedStart = Math.max(1, end - range + 1);

    return Array.from(
      { length: end - adjustedStart + 1 },
      (_, i) => adjustedStart + i
    );
  };

  const pageNumbers = pageNumbersToShow();

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;&lt; {/* Previous Symbol */}
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;&gt; {/* Next Symbol */}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

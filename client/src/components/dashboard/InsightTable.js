import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InsightTable = ({ insights }) => {
  return (
    <div className="my-4">
      <h3>Insights Table</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Source</th>
            <th>Published Year</th>
            <th>Added Date</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {insights.map((insight, index) => (
            <tr key={index}>
              <td>{insight.title}</td>
              <td>{insight.source}</td>
              <td>{new Date(insight.published).getFullYear()}</td>
              <td>{new Date(insight.added).toLocaleDateString()}</td>
              <td>
                <a href={insight.url} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsightTable;

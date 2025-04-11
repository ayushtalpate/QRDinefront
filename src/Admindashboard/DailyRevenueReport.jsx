import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const RevenueReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/daily-reports`);
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch daily reports", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4">📈 Daily Revenue Report</h3>
      <div className="table-responsive shadow rounded-4">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Total Orders</th>
              <th>Total Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{new Date(report.date).toLocaleDateString()}</td>
                <td>{report.totalOrders}</td>
                <td>₹{report.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueReport;

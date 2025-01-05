import React from "react";
import './Dashboard.css';
import DataTable from './Table';
import Metrics from './Metrics';
import PieChart from './RiskRatingPieChart';
import BarChart from './BarChart';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="metrics-container">
        <Metrics />
      </div>
      <div className="chart-container">
        <BarChart />
        <PieChart />
      </div>
      <div className="table-container">
        <DataTable />
      </div>
    </div>
  );
};

export default Dashboard;

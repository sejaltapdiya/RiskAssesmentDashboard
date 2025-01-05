import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RiskRatingPieChart = () => {
    const [riskRatingCounts, setRiskRatingCounts] = useState({});

    useEffect(() => {
        const fetchRiskData = async () => {
            try {
                const response = await axios.get("http://localhost:9192/api/dashboard", { withCredentials: true });
                const riskData = response.data;

                // Count risk ratings
                const counts = riskData.reduce((acc, item) => {
                    acc[item.risk_rating] = (acc[item.risk_rating] || 0) + 1;
                    return acc;
                }, {});

                setRiskRatingCounts(counts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchRiskData();
    }, []); // Fetch data once when the component mounts

    // Prepare data for the chart
    const riskRatingsChartData = Object.keys(riskRatingCounts).map((rating) => ({
        name: rating,
        value: riskRatingCounts[rating],
    }));

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={riskRatingsChartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
            >
                {riskRatingsChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default RiskRatingPieChart;

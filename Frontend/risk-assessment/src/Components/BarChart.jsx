import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell } from "recharts";
import axios from "axios";

const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#00C49F", "#FF4560"];

const AverageLoanBarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchLoanData = async () => {
            try {
                const response = await axios.get("http://localhost:9192/api/dashboard", {
                    withCredentials: true,
                });
                
                const loanData = response.data.reduce((acc, item) => {
                    acc[item.loan_purpose] = (acc[item.loan_purpose] || 0) + item.loan_amount;
                    return acc;
                }, {});

                const formattedData = Object.keys(loanData).map((key) => ({
                    name: key,
                    value: loanData[key],
                }));

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching loan data:", error);
            }
        };

        fetchLoanData();
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h3>Average Loan Amount by Purpose</h3>
            <BarChart width={600} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" barSize={50}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    );
};

export default AverageLoanBarChart;

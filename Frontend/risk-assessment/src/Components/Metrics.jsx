import React, {useEffect, useState} from 'react'
import { Box, Grid2 as Grid, Typography, Paper} from "@mui/material";
import axios from 'axios';

export default function Metrics() {
  const [cardData, setCardData] = useState([
    { title: "Average Credit Score", number: "-", color: "#F7DFFF" },
    { title: "Average Loan Amount", number: "-", color: "#EEFF86" },
    { title: "Total Users", number: "-", color: "#CDD8FD" },
    { title: "Risk Rating Distribution", color: "#BDFFB2" },
  ]);
 
  const [riskRatings, setRiskRatings] = useState([]);
  const [riskData, setRiskData] = useState([]);
  useEffect(() => {
    fetchRiskData();
  }, []);
  const fetchRiskData = () => {
    axios
      .get("http://localhost:9192/api/dashboard", { withCredentials: true })
      .then((response) => setRiskData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    if (riskData.length > 0) {
      const totalUsers = riskData.length;
      const totalCreditScore = riskData.reduce((sum, item) => sum + item.credit_score, 0);
      const totalLoanAmount = riskData.reduce((sum, item) => sum + item.loan_amount, 0);
  
      const averageCreditScore = (totalCreditScore / totalUsers).toFixed(2);
      const averageLoanAmount = (totalLoanAmount / totalUsers).toFixed(2);
  
      const riskRatingCounts = riskData.reduce((acc, item) => {
        acc[item.risk_rating] = (acc[item.risk_rating] || 0) + 1;
        return acc;
      }, {});

      console.log(riskRatingCounts)
  
      const riskRatingsChartData = Object.keys(riskRatingCounts).map((rating) => ({
        name: rating,
        value: riskRatingCounts[rating],
      }));
      setCardData([
        { title: "Average Credit Score", number: averageCreditScore , color: "#F7DFFF" },
        { title: "Average Loan Amount", number: averageLoanAmount, color: "#EEFF86" },
        { title: "Total Users", number: totalUsers, color: "#CDD8FD" },
      ]);
  
      setRiskRatings(riskRatingsChartData);
    }
  }, [riskData]);
  return (
    <div>
      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: "20px"
  }}
>
  <Grid container spacing={2} justifyContent="center">
    {cardData.map((card, index) => (
      <Grid 
        item 
        key={index} 
        xs={12} sm={6} md={4} lg={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "300px",  // Fixed width
            height: "150px", // Fixed height
            padding: "20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: card.color,
            boxSizing: "border-box",
            borderRadius: "10px",
          }}
        >
           <img src={card.image} alt={card.title} />
          <Typography variant="h4" sx={{ fontWeight: "bold", wordWrap: "break-word" }}>
            {card.number}
          </Typography>
          <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
            {card.title}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>
    </div>
  )
}

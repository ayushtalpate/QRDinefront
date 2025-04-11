import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminHomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/analytics/dashboard-summary`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      }
    };

    fetchSummary();
  }, []);

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  const chartData = Array.isArray(data.revenueData)
    ? data.revenueData.map((report) => ({
        date: new Date(report.date).toLocaleDateString(),
        revenue: report.totalRevenue,
        sales: report.totalOrders || 0,
      }))
    : [];

  const StatCard = ({ title, value, color, growth }) => (
    <Card elevation={2} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Avatar sx={{ bgcolor: color, width: 24, height: 24 }}>
              {growth >= 0 ? (
                <ArrowUpwardIcon fontSize="small" sx={{ color: "#fff" }} />
              ) : (
                <ArrowDownwardIcon fontSize="small" sx={{ color: "#fff" }} />
              )}
            </Avatar>
            <Typography variant="subtitle2" color={growth >= 0 ? "green" : "error"}>
              {growth >= 0 ? "+" : ""}
              {growth}%
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Vidited Users"
            value={data.totalUsers || 36}
            growth={70}
            color="#00c49f"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Orders"
            value={data.totalOrders}
            growth={44}
            color="#0088fe"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Revenue (₹)"
            value={`₹${data.totalRevenue?.toLocaleString?.() ?? "0"}`}
            growth={30}
            color="#ffbb28"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Your Earnings
              </Typography>
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  border: "16px solid #e0e0e0",
                  borderTopColor: "#3f51b5",
                  borderRightColor: "#3f51b5",
                  borderBottomColor: "#3f51b5",
                  borderLeftColor: "#e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  my: 2,
                }}
              >
                <Box textAlign="center">
                  <Typography variant="subtitle2" color="#3f51b5" fontWeight={500}>
                    Earnings
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ₹{data.currentMonthRevenue?.toLocaleString() ?? "0"}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 1 }}
              >
                From last month
              </Typography>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color:
                    data.growthPercentage > 0
                      ? "green"
                      : data.growthPercentage < 0
                      ? "red"
                      : "gray",
                }}
              >
                {data.growthPercentage > 0 ? "+" : ""}
                {data.growthPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#333" }}>
                📈 Daily Revenue Trend
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#005eff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#005eff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#005eff"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={3}
                    dot={{ stroke: "#005eff", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#00c49f"
                    strokeWidth={2}
                    dot={{ stroke: "#00c49f", strokeWidth: 2, r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminHomePage;

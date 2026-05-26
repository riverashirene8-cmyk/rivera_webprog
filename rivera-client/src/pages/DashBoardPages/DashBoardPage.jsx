import React from "react";
import { Typography, Card, CardContent, Stack } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function DashboardPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* SUMMARY CARDS */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Card>
          <CardContent>
            <Typography>Total Users</Typography>
            <Typography variant="h4">9</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography>Active Sessions</Typography>
            <Typography variant="h4">5</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* GAUGES */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Gauge value={70} width={120} height={120} />
        <Gauge value={45} width={120} height={120} />
      </Stack>

      {/* MINI CHART */}
      <BarChart
        series={[{ data: [10, 20, 30, 40], label: "Users" }]}
        height={250}
        xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
      />

      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 30, label: "Active" },
              { id: 1, value: 20, label: "Inactive" },
            ],
          },
        ]}
        width={250}
        height={200}
      />
    </div>
  );
}
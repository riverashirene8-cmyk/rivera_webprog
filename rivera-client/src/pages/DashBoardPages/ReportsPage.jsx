import React from "react";
import { Typography, Stack, Card, CardContent } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function ReportsPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>

      {/* CARDS */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Card>
          <CardContent>
            <Typography>Total Reports</Typography>
            <Typography variant="h4">12</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography>Pending</Typography>
            <Typography variant="h4">3</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* BAR CHART */}
      <BarChart
        series={[
          { data: [5, 10, 15, 20], label: "Reports" },
        ]}
        height={300}
        xAxis={[
          { data: ["Jan", "Feb", "Mar", "Apr"], scaleType: "band" },
        ]}
      />

      {/* PIE CHART */}
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 60, label: "Completed" },
              { id: 1, value: 40, label: "Pending" },
            ],
          },
        ]}
        width={300}
        height={250}
      />
    </div>
  );
}
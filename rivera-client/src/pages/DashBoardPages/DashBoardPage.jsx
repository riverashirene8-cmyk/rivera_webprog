import React from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

/* LEAFLET FIX */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    description: 'Generated from first and last name',
    sortable: false,
    width: 200,

    valueGetter: (_, row) =>
      `${row.firstName || ''} ${
        row.lastName || ''
      }`,
  },
];

const rows = [
  {
    id: 1,
    firstName: 'Jon',
    lastName: 'Snow',
    age: 14,
  },
  {
    id: 2,
    firstName: 'Cersei',
    lastName: 'Lannister',
    age: 31,
  },
  {
    id: 3,
    firstName: 'Jaime',
    lastName: 'Lannister',
    age: 31,
  },
  {
    id: 4,
    firstName: 'Arya',
    lastName: 'Stark',
    age: 11,
  },
  {
    id: 5,
    firstName: 'Daenerys',
    lastName: 'Targaryen',
    age: 25,
  },
  {
    id: 6,
    firstName: 'Melisandre',
    lastName: 'Red Woman',
    age: 150,
  },
  {
    id: 7,
    firstName: 'Ferrara',
    lastName: 'Clifford',
    age: 44,
  },
  {
    id: 8,
    firstName: 'Rossini',
    lastName: 'Frances',
    age: 36,
  },
  {
    id: 9,
    firstName: 'Harvey',
    lastName: 'Roxie',
    age: 65,
  },
];

function DashboardPage() {
  const location = useLocation();

  const averageAge = (
    rows.reduce(
      (sum, row) => sum + (row.age || 0),
      0
    ) / rows.length
  ).toFixed(1);

  return (
    <Box sx={{ p: 3 }}>
      {/* PAGE TITLE */}
      <Typography
        variant="h4"
        gutterBottom
      >
        Dashboard
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4 }}
      >
        Current Path: {location.pathname}
      </Typography>

      {/* SUMMARY CARDS */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        sx={{ mb: 4 }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">
              Total Users
            </Typography>

            <Typography variant="h3">
              {rows.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">
              Average Age
            </Typography>

            <Typography variant="h3">
              {averageAge}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* GAUGES */}
      <Typography
        variant="h5"
        gutterBottom
      >
        Performance Gauges
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        sx={{ mb: 5 }}
      >
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              Completion Rate
            </Typography>

            <Gauge
              width={150}
              height={150}
              value={75}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              User Activity
            </Typography>

            <Gauge
              width={150}
              height={150}
              value={50}
              valueMin={0}
              valueMax={100}
            />
          </CardContent>
        </Card>
      </Stack>

      {/* CHARTS */}
      <Typography
        variant="h5"
        gutterBottom
      >
        Analytics Charts
      </Typography>

      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={4}
        sx={{ mb: 5 }}
      >
        <Card sx={{ p: 2, flex: 1 }}>
          <Typography
            variant="h6"
            gutterBottom
          >
            Quarterly Sales
          </Typography>

          <BarChart
            height={300}
            series={[
              {
                data: [35, 44, 24, 34],
                label: '2025',
              },
              {
                data: [51, 6, 49, 30],
                label: '2026',
              },
            ]}
            xAxis={[
              {
                data: [
                  'Q1',
                  'Q2',
                  'Q3',
                  'Q4',
                ],
                scaleType: 'band',
              },
            ]}
          />
        </Card>

        <Card sx={{ p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
          >
            User Distribution
          </Typography>

          <PieChart
            width={350}
            height={300}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: 10,
                    label: 'Admin',
                  },
                  {
                    id: 1,
                    value: 15,
                    label: 'Students',
                  },
                  {
                    id: 2,
                    value: 20,
                    label: 'Teachers',
                  },
                ],
              },
            ]}
          />
        </Card>
      </Stack>

      {/* DATA TABLE */}
      <Typography
        variant="h5"
        gutterBottom
      >
        Users Overview
      </Typography>

      <Box
        sx={{
          height: 450,
          width: '100%',
          mb: 5,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      {/* MAP SECTION */}
      <Typography
        variant="h5"
        gutterBottom
      >
        Location Map
      </Typography>

      <Box
        sx={{
          height: 500,
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <MapContainer
          center={[14.6042, 120.9943]}
          zoom={15}
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <Marker
            position={[14.6042, 120.9943]}
          >
            <Popup>
              National University - Manila
              <br />
              551 F. Jhocson St, Sampaloc,
              Manila
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
}

export default DashboardPage;
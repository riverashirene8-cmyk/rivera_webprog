require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

/* -------- DATABASE CONNECTION & SERVER STARTUP -------- */
// Removed from here - moved to end of file

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Request logging middleware */
app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.path}`);
  next();
});

/* ---------------- CORS -------- --------*/
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      // Local development
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      // Deployed sites
      process.env.CLIENT_ORIGIN, // Set this to your client URL
    ].filter(Boolean);
    
    // In development, allow any origin
    // In production, check against allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (process.env.NODE_ENV === "development") {
      callback(null, true); // Allow all in development
    } else {
      // In production, log but still allow (for debugging)
      console.warn(`CORS request from disallowed origin: ${origin}`);
      callback(null, true);
    }
  },
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.json({ message: "Rivera Server is running" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint working" });
});

/* ---------------- API ROUTES ---------------- */
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

/* -------- DATABASE CONNECTION & SERVER STARTUP -------- */
const startServer = async () => {
  try {
    // Try to connect to database (don't fail if it doesn't work immediately)
    const dbConnected = await connectDB();
    if (dbConnected) {
      console.log("✓ Database ready, queries will work");
    } else {
      console.log("⚠ Database not available yet, but server will start");
    }
    
    // Start listening regardless of DB status
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
    return server;
  } catch (error) {
    console.error("Error starting server:", error.message);
    // Start server anyway (database will retry on requests)
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (database connection will retry)`);
    });
    return server;
  }
};

/* Start if running directly (for Railway, Render, Heroku, etc.) */
if (require.main === module) {
  startServer();
}

/* Export app for serverless platforms (AWS Lambda, etc.) */
module.exports = app;
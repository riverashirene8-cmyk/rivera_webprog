require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

/* -------- DATABASE CONNECTION (Non-blocking for Vercel) -------- */
// Attempt to connect but don't block server startup
connectDB().then(db => {
  if (db) {
    console.log("Database ready for queries");
  }
}).catch((error) => {
  console.error("Initial MongoDB connection attempt failed:", error.message);
});

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Request logging middleware */
app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.path}`);
  next();
});

/* ---------------- CORS ---------------- */
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://rivera-client-omega.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      process.env.CLIENT_ORIGIN,
    ].filter(Boolean);
    
    // Allow requests with no origin (mobile apps, curl requests, etc)
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(null, true); // Allow for debugging
    }
  },
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight for all routes

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

/* ---------------- API ROUTES ---------------- */
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

/* ---------------- LOCAL SERVER LISTENER (Development) ----------- */
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

/* ---------------- VERCEL EXPORT (IMPORTANT) ---------------- */
module.exports = app;
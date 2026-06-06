require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

/* -------- DATABASE CONNECTION (Non-blocking for Vercel) -------- */
// Attempt to connect but don't block server startup
connectDB().catch((error) => {
  console.error("Initial MongoDB connection attempt failed:", error.message);
});

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- CORS ---------------- */
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "*",
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

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
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

/* ---------------- DATABASE ---------------- */
(async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
})();

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

/* ---------------- PREFLIGHT ---------------- */
app.options("*", cors(corsOptions));

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
  res.status(500).json({ message: "Server Error" });
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
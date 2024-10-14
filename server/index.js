require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const insightRoutes = require("./routes/insights");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

const allowedOrigins = [
  process.env.CORS_LOCAL_ORIGIN, // Local development
  process.env.CORS_PRODUCTION_ORIGIN, // Production
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

connectDB();

app.use("/api/insights", insightRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

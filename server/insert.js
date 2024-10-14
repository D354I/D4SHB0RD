require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Insight = require("./models/Insight");
const connectDB = require("./config/db");

connectDB();

const insertData = async () => {
  try {
    const data = fs.readFileSync("Path/jsondata.json", "utf8");
    const insights = JSON.parse(data);

    await Insight.insertMany(insights);

    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.connection.close();
  }
};

insertData();

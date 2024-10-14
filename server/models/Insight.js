const mongoose = require("mongoose");

const InsightSchema = new mongoose.Schema({
  end_year: { type: Number, default: null },
  intensity: { type: Number, default: null },
  sector: { type: String, default: "" },
  topic: { type: String, default: "" },
  insight: { type: String, default: "" },
  url: { type: String, default: "" },
  region: { type: String, default: "" },
  start_year: { type: Number, default: null },
  impact: { type: String, default: "" },
  added: { type: Date, default: Date.now },
  published: { type: Date, default: null },
  country: { type: String, default: "" },
  relevance: { type: Number, default: null },
  pestle: { type: String, default: "" },
  source: { type: String, default: "" },
  title: { type: String, default: "" },
  likelihood: { type: Number, default: null },
});

module.exports = mongoose.model("Insight", InsightSchema);

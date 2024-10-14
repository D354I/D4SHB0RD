const Insight = require("../models/Insight");

// Search and filter insights and get chart data
exports.getInsights = async (req, res) => {
  try {
    const { query, startYear, endYear } = req.query;

    let filter = {};

    // search query if yes
    if (query) {
      filter.$or = [
        { sector: new RegExp(query, "i") },
        { topic: new RegExp(query, "i") },
        { insight: new RegExp(query, "i") },
        { region: new RegExp(query, "i") },
        { country: new RegExp(query, "i") },
        { pestle: new RegExp(query, "i") },
        { source: new RegExp(query, "i") },
        { title: new RegExp(query, "i") },
      ];
    }

    // Check if both s and e year present 
    if (startYear && endYear) {
      if (!query) {
        throw new Error("Search query is required when filtering by year.");
      }

      // check s <= e year
      if (Number(startYear) > Number(endYear)) {
        throw new Error("Start year must be less than or equal to end year.");
      }

      // e&s must match
      filter.start_year = { $gte: Number(startYear) };
      filter.end_year = {
        $gte: Number(startYear),
        $lte: Number(endYear),
      };
    } else if ((startYear && !endYear) || (!startYear && endYear)) {
      throw new Error(
        "Both start year and end year must be provided for year-based search."
      );
    }

    // Remove Debug later
    // console.log("Constructed Filter:", filter);

    const insights = await Insight.find(filter).lean();

    // Remove Debug Later
    // console.log("Fetched Insights:", insights);

    if (insights.length === 0) {
      return res.status(200).json({
        insights: [],
        message: "No insights found matching the criteria.",
      });
    }

    // charts without occurrence (unique data will count)
    const [
      countryData,
      sectorData,
      topicData,
      sourceData,
      pestleData,
      regionData,
    ] = await Promise.all([
      Insight.aggregate([
        { $match: filter },
        { $group: { _id: "$country", count: { $sum: 1 } } },
      ]),
      Insight.aggregate([
        { $match: filter },
        { $group: { _id: "$sector", count: { $sum: 1 } } },
      ]),
      Insight.aggregate([
        { $match: filter },
        { $group: { _id: "$topic", count: { $sum: 1 } } },
      ]),
      Insight.aggregate([
        { $match: filter },
        { $group: { _id: "$source", count: { $sum: 1 } } },
      ]),
      Insight.aggregate([
        { $match: filter },
        { $group: { _id: "$pestle", count: { $sum: 1 } } },
      ]),
      Insight.aggregate([
        { $match: filter },
        { $group: { _id: "$region", count: { $sum: 1 } } },
      ]),
    ]);

    // total count 
    const totalCountries = new Set(insights.map((i) => i.country)).size;
    const totalRegions = new Set(insights.map((i) => i.region)).size;
    const totalSources = new Set(insights.map((i) => i.source)).size;
    const totalTopics = new Set(insights.map((i) => i.topic)).size;
    const totalSectors = new Set(insights.map((i) => i.sector)).size;
    const totalPestle = new Set(insights.map((i) => i.pestle)).size;
    const totalInsights = insights.length;

    // // get all data
    // const [countryData, sectorData, topicData, sourceData, pestleData, regionData] = await Promise.all([
    //     Insight.aggregate([
    //       { $match: filter },
    //       { $group: { _id: "$country", count: { $sum: 1 } } },
    //       { $match: { _id: { $ne: null, $ne: "" } } },
    //     ]),
    //     Insight.aggregate([
    //       { $match: filter },
    //       { $group: { _id: "$sector", count: { $sum: 1 } } },
    //       { $match: { _id: { $ne: null, $ne: "" } } },
    //     ]),
    //     Insight.aggregate([
    //       { $match: filter },
    //       { $group: { _id: "$topic", count: { $sum: 1 } } },
    //       { $match: { _id: { $ne: null, $ne: "" } } },
    //     ]),
    //     Insight.aggregate([
    //       { $match: filter },
    //       { $group: { _id: "$source", count: { $sum: 1 } } },
    //       { $match: { _id: { $ne: null, $ne: "" } } },
    //     ]),
    //     Insight.aggregate([
    //       { $match: filter },
    //       { $group: { _id: "$pestle", count: { $sum: 1 } } },
    //       { $match: { _id: { $ne: null, $ne: "" } } },
    //     ]),
    //     Insight.aggregate([
    //       { $match: filter },
    //       { $group: { _id: "$region", count: { $sum: 1 } } },
    //       { $match: { _id: { $ne: null, $ne: "" } } },
    //     ]),
    //   ]);

    //   // total count
    //   const totalCountries = insights.reduce((acc, curr) => acc + (curr.country ? 1 : 0), 0);
    //   const totalRegions = insights.reduce((acc, curr) => acc + (curr.region ? 1 : 0), 0);
    //   const totalSources = insights.reduce((acc, curr) => acc + (curr.source ? 1 : 0), 0);
    //   const totalTopics = insights.reduce((acc, curr) => acc + (curr.topic ? 1 : 0), 0);
    //   const totalSectors = insights.reduce((acc, curr) => acc + (curr.sector ? 1 : 0), 0);
    //   const totalPestle = insights.reduce((acc, curr) => acc + (curr.pestle ? 1 : 0), 0);
    //   const totalInsights = insights.length;

    // Prepare data for the bubble chart

    const bubbleData = insights.map((insight) => ({
      likelihood: insight.likelihood || 0,
      relevance: insight.relevance || 0,
      intensity: insight.intensity || 0,
    }));

    // if no -> no data
    if (insights.length === 0) {
      return res.status(200).json({
        insights: [],
        summary: {
          totalCountries: 0,
          totalRegions: 0,
          totalSources: 0,
          totalTopics: 0,
          totalSectors: 0,
          totalPestle: 0,
          totalInsights: 0,
        },
        chartData: {
          countryData: [],
          sectorData: [],
          topicData: [],
          sourceData: [],
          pestleData: [],
          bubbleData: [],
          regionData: [],
        },
        message: "No insights found matching the criteria.",
      });
    }

    // if yes continue 
    res.status(200).json({
      insights,
      summary: {
        totalCountries,
        totalRegions,
        totalSources,
        totalTopics,
        totalSectors,
        totalPestle,
        totalInsights,
      },
      chartData: {
        countryData,
        sectorData,
        topicData,
        sourceData,
        pestleData,
        bubbleData,
        regionData,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

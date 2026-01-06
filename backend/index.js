const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/api/news", async (req, res) => {
  try {
    let { country, category, page, pageSize } = req.query;

    country = country || "us";
    category = category || "general";
    page = page || 1;
    pageSize = pageSize || 6;

    if (!process.env.NEWS_API_KEY) {
      console.error("NEWS_API_KEY environment variable not set");
      return res.status(500).json({ error: "API key not configured. Please set NEWS_API_KEY environment variable." });
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`;

    console.log("Fetching NewsAPI URL:", url);

    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error(`NewsAPI request failed: ${response.status}`, errorData);
      return res.status(500).json({ error: `NewsAPI returned status ${response.status}` });
    }
    
    const data = await response.json();

    console.log("NewsAPI response received");

    if (!data.articles) {
      console.warn("No articles in response:", data);
      return res.status(500).json({ error: "NewsAPI returned no articles", data });
    }

    res.json(data);
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Server failed" });
  }
});

app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);

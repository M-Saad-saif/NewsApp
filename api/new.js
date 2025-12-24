// pages/api/news.js (Next.js / Vercel serverless)
export default async function handler(req, res) {
  const { category = "general", page = 1 } = req.query;

  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key missing in environment variables" });
  }

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=6`;

  try {
    const response = await fetch(url);

    // Read response as text first to catch HTML errors
    const text = await response.text();

    // Try parsing as JSON
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      return res.status(500).json({ error: "NewsAPI returned non-JSON response", body: text });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch news", details: error.message });
  }
}

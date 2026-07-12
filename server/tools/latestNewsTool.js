import axios from 'axios';
import { searchTavily, getMockData } from '../utils/helpers.js';
import { isMockMode } from '../langchain/llm.js';

/**
 * Fetches latest news, summarizes them, and detects positive/negative sentiment.
 * @param {string} companyName Company to search news for
 * @param {Object} llm Chat LLM instance
 * @returns {Promise<Array>} Array of news objects with sentiment and summary
 */
export async function runLatestNewsTool(companyName, llm) {
  if (isMockMode()) {
    console.log(`🤖 News Tool (Mock Mode) for: ${companyName}`);
    return getMockData(companyName).news;
  }

  console.log(`🤖 News Tool (Live Mode) researching: ${companyName}`);
  let articles = [];

  // Try News API first
  const newsApiKey = process.env.NEWS_API_KEY;
  if (newsApiKey) {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: companyName,
          sortBy: 'publishedAt',
          pageSize: 5,
          language: 'en',
          apiKey: newsApiKey
        }
      });

      if (response.data && response.data.articles) {
        articles = response.data.articles.map(art => ({
          title: art.title,
          description: art.description || '',
          source: art.source?.name || 'News API'
        }));
      }
    } catch (error) {
      console.warn('⚠️ News API fetch failed. Falling back to Tavily search:', error.message);
    }
  }

  // Fallback to Tavily if News API is empty or failed
  if (articles.length === 0) {
    const rawSearch = await searchTavily(`Latest news articles about ${companyName} current events`);
    
    // Let LLM extract news headlines from raw search content
    const parsePrompt = `
    Based on the following web search data, extract up to 3 major current news headlines or articles about "${companyName}".
    Web data:
    ---
    ${rawSearch}
    ---
    
    Return a valid JSON array of objects with "title" and "description" fields ONLY. Do not write markdown tags.
    Format:
    [
      {"title": "Headline 1", "description": "Brief description"},
      ...
    ]
    `;

    try {
      const response = await llm.invoke(parsePrompt);
      let content = response.content;
      if (content.includes('```')) {
        content = content.replace(/```json|```/g, '').trim();
      }
      articles = JSON.parse(content);
    } catch (e) {
      console.warn('⚠️ Parsing headlines via LLM failed, using mock news fallback:', e.message);
      return getMockData(companyName).news;
    }
  }

  // Apply sentiment analysis and summary for each article in parallel to boost speed
  const sentimentPromises = articles.slice(0, 3).map(async (article) => {
    const sentimentPrompt = `
    Analyze this news article for "${companyName}":
    Title: ${article.title}
    Description: ${article.description}

    Provide a JSON response with:
    1. "title": Keep or refine the headline.
    2. "sentiment": Output exactly "positive" or "negative" (or "neutral").
    3. "summary": A concise 1-sentence summary of the article's business impact.

    Format output as valid JSON:
    {
      "title": "refined title",
      "sentiment": "positive/negative/neutral",
      "summary": "1-sentence summary"
    }
    No markdown boxes, no surrounding text.
    `;

    try {
      const response = await llm.invoke(sentimentPrompt);
      let content = response.content;
      if (content.includes('```')) {
        content = content.replace(/```json|```/g, '').trim();
      }
      return JSON.parse(content);
    } catch (err) {
      console.error('❌ Error analyzing sentiment of article, fallback to neutral:', err.message);
      return {
        title: article.title,
        sentiment: 'neutral',
        summary: article.description || 'No summary available.'
      };
    }
  });

  const finalNews = await Promise.all(sentimentPromises);

  return finalNews.length > 0 ? finalNews : getMockData(companyName).news;
}

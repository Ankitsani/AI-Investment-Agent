import { searchTavily, getMockData } from '../utils/helpers.js';
import { isMockMode } from '../langchain/llm.js';

/**
 * Gathers financial statements and key metrics.
 * @param {string} companyName Name of the company to research
 * @param {Object} llm LangChain chat model instance
 * @returns {Promise<Object>} Formatted financials
 */
export async function runFinancialTool(companyName, llm) {
  if (isMockMode()) {
    console.log(`🤖 Financial Tool (Mock Mode) for: ${companyName}`);
    return getMockData(companyName).financials;
  }

  console.log(`🤖 Financial Tool (Live Mode) researching: ${companyName}`);
  const searchQuery = `Latest Financials of ${companyName}: Revenue, net income profit, Market Cap, P/E Ratio, Growth Rate, and past 4 years revenue/profit values.`;
  const searchResults = await searchTavily(searchQuery);

  const prompt = `
  You are an expert financial analyst.
  Extract the key financial metrics for "${companyName}" from the following web search data:
  
  ---
  ${searchResults}
  ---
  
  Format the output as a valid JSON object with the exact fields below:
  {
    "revenue": "Current annual revenue (e.g. $391.04 Billion)",
    "profit": "Current annual profit/net income (e.g. $93.74 Billion)",
    "marketCap": "Current Market Cap (e.g. $3.45 Trillion)",
    "peRatio": "Price to Earnings Ratio (e.g. 32.4)",
    "growth": "Year-over-Year Growth percentage (e.g. 8.5%)",
    "chartData": {
      "labels": ["2021", "2022", "2023", "2024", "2025"],
      "revenueHistory": [365.8, 394.3, 383.3, 391.0, 412.5],
      "profitHistory": [94.6, 99.8, 97.0, 93.7, 101.2]
    }
  }

  Note: In "chartData", please project or fill in approximate figures based on actual historical context if the search data is incomplete. Revenue and profit histories should be numbers in Billions USD.
  
  Ensure it is valid JSON and contains nothing else (no markdown tags, no surrounding text).
  `;

  try {
    const response = await llm.invoke(prompt);
    let content = response.content;
    
    if (content.includes('```')) {
      content = content.replace(/```json|```/g, '').trim();
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error('❌ Error in Financial Tool, falling back to mock data:', error.message);
    return getMockData(companyName).financials;
  }
}

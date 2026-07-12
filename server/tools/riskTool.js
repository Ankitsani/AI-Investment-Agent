import { searchTavily, getMockData } from '../utils/helpers.js';
import { isMockMode } from '../langchain/llm.js';

/**
 * Performs risk analysis across multiple categories.
 * @param {string} companyName Company to analyze
 * @param {Object} llm Chat LLM instance
 * @returns {Promise<Object>} Object containing risk assessment metrics
 */
export async function runRiskTool(companyName, llm) {
  if (isMockMode()) {
    console.log(`🤖 Risk Tool (Mock Mode) for: ${companyName}`);
    return getMockData(companyName).risk;
  }

  console.log(`🤖 Risk Tool (Live Mode) researching: ${companyName}`);
  const searchQuery = `${companyName} Business Risks, Financial Risks, Market Risks, Competitors, and Regulation Risks details`;
  const searchResults = await searchTavily(searchQuery);

  const prompt = `
  You are a risk management consultant.
  Analyze the business, financial, market, competitive, and regulatory risks of "${companyName}" based on the following web research data:
  
  ---
  ${searchResults}
  ---
  
  Format the output as a valid JSON object with the exact fields below. Keep each risk description concise (1-2 sentences) and begin with a risk rating ("Low", "Medium", or "High"):
  {
    "business": "Rating - Description of business and operational risk",
    "financial": "Rating - Description of balance sheet, debt, or cash flow risks",
    "market": "Rating - Description of macro, industry trend, or demand risks",
    "competition": "Rating - Description of threat from direct or indirect competitors",
    "regulation": "Rating - Description of policy, legal, or regulatory compliance threats"
  }
  
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
    console.error('❌ Error in Risk Tool, falling back to mock data:', error.message);
    return getMockData(companyName).risk;
  }
}

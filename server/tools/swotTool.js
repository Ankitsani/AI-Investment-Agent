import { searchTavily, getMockData } from '../utils/helpers.js';
import { isMockMode } from '../langchain/llm.js';

/**
 * Generates SWOT analysis (Strengths, Weaknesses, Opportunities, Threats).
 * @param {string} companyName Company to analyze
 * @param {Object} llm Chat LLM instance
 * @returns {Promise<Object>} Object containing SWOT arrays
 */
export async function runSWOTTool(companyName, llm) {
  if (isMockMode()) {
    console.log(`🤖 SWOT Tool (Mock Mode) for: ${companyName}`);
    return getMockData(companyName).swot;
  }

  console.log(`🤖 SWOT Tool (Live Mode) researching: ${companyName}`);
  const searchQuery = `${companyName} Strengths Weaknesses Opportunities Threats SWOT Analysis`;
  const searchResults = await searchTavily(searchQuery);

  const prompt = `
  You are a senior business strategist.
  Generate a thorough SWOT Analysis for "${companyName}" based on the following web research data:
  
  ---
  ${searchResults}
  ---
  
  Format the output as a valid JSON object with the exact fields below, providing exactly 3 clear points per category:
  {
    "strengths": ["Strength point 1", "Strength point 2", "Strength point 3"],
    "weaknesses": ["Weakness point 1", "Weakness point 2", "Weakness point 3"],
    "opportunities": ["Opportunity point 1", "Opportunity point 2", "Opportunity point 3"],
    "threats": ["Threat point 1", "Threat point 2", "Threat point 3"]
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
    console.error('❌ Error in SWOT Tool, falling back to mock data:', error.message);
    return getMockData(companyName).swot;
  }
}

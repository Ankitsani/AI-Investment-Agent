import { searchTavily, getMockData } from '../utils/helpers.js';
import { isMockMode } from '../langchain/llm.js';

/**
 * Gathers company profile details.
 * @param {string} companyName Name of the company to research
 * @param {Object} llm LangChain chat model instance
 * @returns {Promise<Object>} Formatted company profile data
 */
export async function runCompanyProfileTool(companyName, llm) {
  if (isMockMode()) {
    console.log(`🤖 Company Tool (Mock Mode) for: ${companyName}`);
    return getMockData(companyName).profile;
  }

  console.log(`🤖 Company Profile Tool (Live Mode) researching: ${companyName}`);
  const searchQuery = `Company Overview, CEO, Headquarters, Employees, Industry of ${companyName}`;
  const searchResults = await searchTavily(searchQuery);

  const prompt = `
  You are an expert financial research assistant.
  Extract and summarize the company profile for "${companyName}" based on the following web search data:
  
  ---
  ${searchResults}
  ---
  
  Provide the output in JSON format with these exact fields:
  {
    "name": "Full official company name",
    "ceo": "Current CEO name",
    "headquarters": "Location of headquarters",
    "employees": "Approximate number of employees",
    "industry": "Primary industry classification",
    "overview": "A detailed 2-3 sentence overview of the company's core operations and value proposition"
  }
  
  Ensure it is valid JSON and contains nothing else (no markdown tags, no surrounding text).
  `;

  try {
    const response = await llm.invoke(prompt);
    let content = response.content;
    
    // Sanitize JSON response if LLM outputs markdown fences
    if (content.includes('```')) {
      content = content.replace(/```json|```/g, '').trim();
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error('❌ Error in Company Profile Tool, falling back to mock data:', error.message);
    return getMockData(companyName).profile;
  }
}

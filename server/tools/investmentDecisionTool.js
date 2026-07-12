import { getMockData } from '../utils/helpers.js';
import { isMockMode } from '../langchain/llm.js';

/**
 * Synthesizes all gathered information and issues an investment recommendation.
 * @param {string} companyName Company to evaluate
 * @param {Object} accumulatedData All data collected from prior tools
 * @param {Object} llm Chat LLM instance
 * @returns {Promise<Object>} Object containing rating metrics and reasoning
 */
export async function runInvestmentDecisionTool(companyName, accumulatedData, llm) {
  if (isMockMode()) {
    console.log(`🤖 Decision Tool (Mock Mode) for: ${companyName}`);
    return getMockData(companyName).decision;
  }

  console.log(`🤖 Investment Decision Tool (Live Mode) analyzing: ${companyName}`);

  const prompt = `
  You are a top-tier hedge fund portfolio manager.
  Analyze the consolidated research data for "${companyName}" to output an investment rating and final recommendation.
  
  Accumulated Research Data:
  ---
  Profile: ${JSON.stringify(accumulatedData.profile)}
  Financials: ${JSON.stringify(accumulatedData.financials)}
  Latest News: ${JSON.stringify(accumulatedData.news)}
  SWOT Analysis: ${JSON.stringify(accumulatedData.swot)}
  Risk Profile: ${JSON.stringify(accumulatedData.risk)}
  ---
  
  Format the output as a valid JSON object with the exact fields below:
  {
    "score": 85, // An integer score between 0 and 100 representing financial strength/upside
    "confidence": 90, // Confidence level % (integer 0-100) in this analysis
    "recommendation": "INVEST", // Exactly "INVEST" or "PASS" (all caps)
    "reasoning": "A concise paragraph explaining the core investment thesis.",
    "pros": [
      "Key positive argument 1",
      "Key positive argument 2"
    ],
    "cons": [
      "Key negative argument 1",
      "Key negative argument 2"
    ],
    "outlook": "Short 1-2 sentence future forecast (e.g. expectation on spatial computing or market share expansion)."
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
    console.error('❌ Error in Investment Decision Tool, falling back to mock data:', error.message);
    return getMockData(companyName).decision;
  }
}

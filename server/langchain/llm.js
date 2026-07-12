import { ChatOpenAI } from '@langchain/openai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Instantiates the LLM client based on available environment variables.
 * Prioritizes OpenAI, falls back to Google Gemini, and logs warning if missing.
 * 
 * @param {Object} options Options for LLM initialization (e.g. temperature, modelName)
 * @returns {ChatOpenAI|ChatGoogleGenerativeAI|null} The initialized Chat Model instance, or null if in mock mode
 */
export function getLLM(options = {}) {
  const temperature = options.temperature ?? 0.2;
  
  // 1. Check for OpenAI configuration
  if (process.env.OPENAI_API_KEY) {
    console.log('🤖 LangChain LLM: Initialized ChatOpenAI (gpt-4o-mini)');
    return new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: options.modelName || 'gpt-4o-mini',
      temperature,
      ...options
    });
  }

  // 2. Check for Google Gemini configuration
  if (process.env.GOOGLE_API_KEY) {
    console.log('🤖 LangChain LLM: Initialized ChatGoogleGenerativeAI (gemini-2.5-flash)');
    return new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: options.modelName || 'gemini-2.5-flash',
      temperature,
      maxRetries: 1, // Fail fast on rate limits to prevent server timeouts and hanging
      ...options
    });
  }

  // 3. Warning log if no configuration is found (Mock mode fallback)
  console.warn('⚠️ No OPENAI_API_KEY or GOOGLE_API_KEY detected in env. Server will run in Mock Data mode.');
  return null;
}

/**
 * Helper to determine if we are running in mock mode.
 * @returns {boolean} True if no LLM keys are supplied.
 */
export function isMockMode() {
  return !process.env.OPENAI_API_KEY && !process.env.GOOGLE_API_KEY;
}

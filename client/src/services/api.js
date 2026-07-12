import axios from 'axios';

// Since we have a Vite proxy configuration forwarding /api requests to http://localhost:5000,
// we can use relative urls.
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Triggers full LangChain supervisor research report
 * @param {string} company 
 */
export async function fetchFullResearch(company) {
  const response = await apiClient.post('/api/research', { company });
  return response.data;
}

/**
 * Fetches SWOT and Risk Analysis
 * @param {string} company 
 */
export async function fetchAnalysis(company) {
  const response = await apiClient.post('/api/analyze', { company });
  return response.data;
}

/**
 * Fetches latest news items
 * @param {string} company 
 */
export async function fetchNews(company) {
  const response = await apiClient.get('/api/news', {
    params: { company }
  });
  return response.data;
}

/**
 * Runs investment evaluator on gathered details
 * @param {string} company 
 * @param {Object} data 
 */
export async function fetchDecision(company, data) {
  const response = await apiClient.post('/api/invest', { company, data });
  return response.data;
}

/**
 * Fetches research records history
 */
export async function getResearchHistory() {
  const response = await apiClient.get('/api/history');
  return response.data;
}

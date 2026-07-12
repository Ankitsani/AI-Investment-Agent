import { getLLM } from '../langchain/llm.js';
import { runCompanyProfileTool } from '../tools/companyProfileTool.js';
import { runFinancialTool } from '../tools/financialTool.js';
import { runLatestNewsTool } from '../tools/latestNewsTool.js';
import { runSWOTTool } from '../tools/swotTool.js';
import { runRiskTool } from '../tools/riskTool.js';
import { runInvestmentDecisionTool } from '../tools/investmentDecisionTool.js';

/**
 * Supervisor Agent that orchestrates the sequential execution of tools.
 * It compiles the outputs of each sub-tool to generate the final synthesized investment report.
 * 
 * @param {string} companyName Target company name
 * @param {Function} progressCallback Optional callback function to track execution stage
 * @returns {Promise<Object>} Completed research report
 */
export async function runSupervisorAgent(companyName, progressCallback = () => {}) {
  console.log(`💼 Supervisor Agent: Initiating research pipeline for '${companyName}'`);
  const llm = getLLM();
  
  const report = {
    company: companyName,
    timestamp: new Date().toISOString(),
    profile: null,
    financials: null,
    news: null,
    swot: null,
    risk: null,
    decision: null
  };

  // Run all 5 research tools in parallel to maximize speed and avoid timeouts
  progressCallback('profile');
  
  const [profile, financials, news, swot, risk] = await Promise.all([
    runCompanyProfileTool(companyName, llm),
    runFinancialTool(companyName, llm),
    runLatestNewsTool(companyName, llm),
    runSWOTTool(companyName, llm),
    runRiskTool(companyName, llm)
  ]);

  report.profile = profile;
  report.financials = financials;
  report.news = news;
  report.swot = swot;
  report.risk = risk;

  // Step 6: Make Investment Decision
  progressCallback('decision');
  report.decision = await runInvestmentDecisionTool(companyName, report, llm);

  console.log(`💼 Supervisor Agent: Pipeline complete for '${companyName}'. Generating report.`);
  return report;
}

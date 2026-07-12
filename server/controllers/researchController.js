import { runSupervisorAgent } from '../agents/supervisor.js';
import { runLatestNewsTool } from '../tools/latestNewsTool.js';
import { runSWOTTool } from '../tools/swotTool.js';
import { runRiskTool } from '../tools/riskTool.js';
import { runInvestmentDecisionTool } from '../tools/investmentDecisionTool.js';
import { getLLM } from '../langchain/llm.js';

/**
 * Orchestrates the full research agent pipeline for a company
 * POST /api/research
 */
export async function createResearch(req, res, next) {
  try {
    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ error: 'Company name is required.' });
    }

    console.log(`📡 API Received: Research request for '${company}'`);
    
    const report = await runSupervisorAgent(company);

    // Save to MongoDB if available
    const db = req.app.locals.db;
    if (db) {
      try {
        await db.collection('history').insertOne({
          company: company,
          timestamp: new Date(),
          report: report
        });
        console.log(`💾 Saved research history to MongoDB for '${company}'`);
      } catch (dbErr) {
        console.warn('⚠️ Failed to save history to MongoDB:', dbErr.message);
      }
    }

    return res.status(200).json(report);
  } catch (error) {
    console.error('❌ Controller Error in createResearch:', error.message);
    next(error);
  }
}

/**
 * Runs SWOT and Risk analysis explicitly for a company
 * POST /api/analyze
 */
export async function analyzeCompany(req, res, next) {
  try {
    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ error: 'Company name is required.' });
    }

    console.log(`📡 API Received: Analyze request for '${company}'`);
    const llm = getLLM();
    
    const swot = await runSWOTTool(company, llm);
    const risk = await runRiskTool(company, llm);

    return res.status(200).json({ swot, risk });
  } catch (error) {
    console.error('❌ Controller Error in analyzeCompany:', error.message);
    next(error);
  }
}

/**
 * Fetches news specifically for a company
 * GET /api/news
 */
export async function getCompanyNews(req, res, next) {
  try {
    const { company } = req.query;
    if (!company) {
      return res.status(400).json({ error: 'Company parameter is required.' });
    }

    console.log(`📡 API Received: News query for '${company}'`);
    const llm = getLLM();
    const news = await runLatestNewsTool(company, llm);

    return res.status(200).json({ news });
  } catch (error) {
    console.error('❌ Controller Error in getCompanyNews:', error.message);
    next(error);
  }
}

/**
 * Runs the Investment Decision Tool on custom input data
 * POST /api/invest
 */
export async function runInvestmentDecision(req, res, next) {
  try {
    const { company, data } = req.body;
    if (!company || !data) {
      return res.status(400).json({ error: 'Company name and research data are required.' });
    }

    console.log(`📡 API Received: Decision request for '${company}'`);
    const llm = getLLM();
    const decision = await runInvestmentDecisionTool(company, data, llm);

    return res.status(200).json({ decision });
  } catch (error) {
    console.error('❌ Controller Error in runInvestmentDecision:', error.message);
    next(error);
  }
}

/**
 * Retrieves the history of researched companies
 * GET /api/history
 */
export async function getHistory(req, res, next) {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(200).json({ history: [], note: 'Database not configured. History is unavailable.' });
    }

    const history = await db.collection('history')
      .find({})
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();

    return res.status(200).json({ history });
  } catch (error) {
    next(error);
  }
}

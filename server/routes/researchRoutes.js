import express from 'express';
import { 
  createResearch, 
  analyzeCompany, 
  getCompanyNews, 
  runInvestmentDecision,
  getHistory
} from '../controllers/researchController.js';

const router = express.Router();

// Route for full research pipeline
router.post('/research', createResearch);

// Route for SWOT and Risk analysis specifically
router.post('/analyze', analyzeCompany);

// Route for fetching news specifically
router.get('/news', getCompanyNews);

// Route for generating investment decision specifically
router.post('/invest', runInvestmentDecision);

// Route to get historical research records
router.get('/history', getHistory);

export default router;

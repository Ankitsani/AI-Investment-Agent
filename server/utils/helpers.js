import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Perform a real-time web search using Tavily API.
 * @param {string} query Search query string
 * @returns {Promise<string>} Text results combined from search
 */
export async function searchTavily(query) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ Tavily Search API key missing. Search skipped.');
    return '';
  }

  try {
    const response = await axios.post('https://api.tavily.com/search', {
      api_key: apiKey,
      query: query,
      search_depth: 'basic',
      max_results: 5
    });

    if (response.data && response.data.results) {
      return response.data.results.map(r => `Title: ${r.title}\nContent: ${r.content}\nSource: ${r.url}\n`).join('\n---\n');
    }
    return '';
  } catch (error) {
    console.error('❌ Tavily search error:', error.message);
    return '';
  }
}

/**
 * Returns complete premium mock data for standard companies when running without API keys.
 * Supports Apple, Tesla, Microsoft, NVIDIA, Infosys, and general fallback.
 * @param {string} companyName 
 */
export function getMockData(companyName) {
  const norm = companyName.toLowerCase();
  
  const mockDatabase = {
    apple: {
      profile: {
        name: "Apple Inc.",
        ceo: "Tim Cook",
        headquarters: "Cupertino, California, USA",
        employees: "164,000",
        industry: "Consumer Electronics, Software & Services",
        overview: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. Its signature products include the iPhone, Mac, iPad, and Apple Watch, alongside digital services like Apple Music, iCloud, and Apple Pay."
      },
      financials: {
        revenue: "391.04 Billion",
        profit: "93.74 Billion",
        marketCap: "3.45 Trillion",
        peRatio: "32.4",
        growth: "8.5%",
        chartData: {
          labels: ["2021", "2022", "2023", "2024", "2025 (Est)"],
          revenueHistory: [365.8, 394.3, 383.3, 391.0, 412.5],
          profitHistory: [94.6, 99.8, 97.0, 93.7, 101.2]
        }
      },
      news: [
        { title: "Apple Launches New Vision Pro Upgrade in International Markets", sentiment: "positive", summary: "Apple is expanding its spatial computing hardware availability, driving institutional confidence." },
        { title: "Antitrust Regulators Target App Store Guidelines", sentiment: "negative", summary: "European Commission files preliminary objections regarding App Store fee structure, posing operational risks." },
        { title: "Apple Intelligence Records Massive User Adoption Rate", sentiment: "positive", summary: "The integration of local AI features in modern iOS builds is accelerating upgrade cycles globally." }
      ],
      swot: {
        strengths: ["Unrivaled brand loyalty and ecosystem lock-in", "Massive cash reserves of over $150B", "Vertical hardware-software integration"],
        weaknesses: ["Heavy concentration of revenue on the iPhone (nearly 50%)", "Perceived delay in early generative AI implementation", "Premium pricing models limiting growth in emerging markets"],
        opportunities: ["Expansion of Apple Intelligence services monetization", "Health tech integration with wearable products", "Automotive OS & AR technology ecosystems"],
        threats: ["Aggressive regulatory scrutiny on App Store fees", "Intensified competition in Chinese markets from domestic brands", "Supply chain dependencies in the APAC region"]
      },
      risk: {
        business: "Medium - High dependence on hardware cycles.",
        financial: "Low - Elite balance sheet with massive liquidity.",
        market: "Medium - Global smartphone saturation.",
        competition: "High - Growing competition from Huawei, Samsung, and AI-native hardware providers.",
        regulation: "High - Severe regulatory investigations in US and EU regarding anti-competitive behavior."
      },
      decision: {
        score: 88,
        confidence: 90,
        recommendation: "INVEST",
        reasoning: "Apple shows exceptional fundamental stability, premium brand equity, and a clear growth driver through Apple Intelligence rollout. Despite antitrust risks, the company's defensive characteristics make it an excellent core holding.",
        pros: ["Superior balance sheet with huge free cash flow", "High ecosystem retention and high-margin services growth", "AI features accelerating consumer upgrade cycle"],
        cons: ["Intense regulatory and antitrust litigation pressures", "Slowing hardware growth rates relative to peers"],
        outlook: "Highly bullish on long-term spatial computing and AI services. Expected to maintain market lead."
      }
    },
    tesla: {
      profile: {
        name: "Tesla, Inc.",
        ceo: "Elon Musk",
        headquarters: "Austin, Texas, USA",
        employees: "140,473",
        industry: "Electric Vehicles, Clean Energy & AI Robotics",
        overview: "Tesla, Inc. designs, develops, manufactures, sells, and leases fully electric vehicles, energy generation and storage systems, and offers services related to its products. It is also pioneering autonomous driving, humanoid robotics, and supercomputing networks."
      },
      financials: {
        revenue: "96.77 Billion",
        profit: "14.97 Billion",
        marketCap: "780 Billion",
        peRatio: "65.8",
        growth: "15.2%",
        chartData: {
          labels: ["2021", "2022", "2023", "2024", "2025 (Est)"],
          revenueHistory: [53.8, 81.5, 96.8, 98.2, 115.0],
          profitHistory: [5.6, 12.6, 15.0, 13.1, 16.8]
        }
      },
      news: [
        { title: "Tesla Robotaxi Fleet Receives Preliminary Approvals for Pilot Runs", sentiment: "positive", summary: "regulatory boards grant early-stage testing permits for automated ride-hailing services in key metros." },
        { title: "EV Margin Compression Hits Quarterly Earnings Below Estimates", sentiment: "negative", summary: "Price cuts designed to maintain volume share are negatively impacting gross margins, concerning Wall Street." },
        { title: "Tesla Megapack Production Reaches All-Time Highs in California Plant", sentiment: "positive", summary: "The energy storage business is growing twice as fast as the automotive sector, proving diversified revenue potential." }
      ],
      swot: {
        strengths: ["Leading brand equity in EV market globally", "Advanced autonomous driving neural network models (FSD)", "Vertical battery manufacturing integration"],
        weaknesses: ["Volatile CEO behavior introducing headline risks", "Margin compression from competitive pricing strategies", "Relatively narrow product lineup compared to legacy OEMs"],
        opportunities: ["Robotaxi monetization and autonomous network licensing", "Optimus humanoid robot commercialization", "Expansion of energy storage business utility-scale packs"],
        threats: ["Intensified Chinese EV competition (e.g. BYD, Xiaomi)", "Global subsidy rollbacks on EV purchases", "Safety and liability issues regarding autonomous systems"]
      },
      risk: {
        business: "High - High dependency on production and vehicle shipping rates.",
        financial: "Low - Low debt with healthy cash reserves.",
        market: "High - Cyclical automotive demand and severe global EV price wars.",
        competition: "High - Competitors like BYD offering highly affordable EV models.",
        regulation: "High - Regulatory investigations into Autopilot safety claims."
      },
      decision: {
        score: 76,
        confidence: 85,
        recommendation: "INVEST",
        reasoning: "Tesla is transitions from an EV automaker to an AI/Robotics play. Its cash flow and energy storage business buffer the current EV slowdown. High risk-reward profile suitable for growth-oriented portfolios.",
        pros: ["Unmatched leadership in autonomous driving AI datasets", "Exponential growth in energy storage and utility sales", "Strong brand culture and pricing power"],
        cons: ["High P/E valuation relative to traditional auto manufacturers", "Margins subject to price wars"],
        outlook: "Moderately optimistic in the short term, highly bullish on 3-5 year horizon due to FSD and robotics."
      }
    },
    microsoft: {
      profile: {
        name: "Microsoft Corporation",
        ceo: "Satya Nadella",
        headquarters: "Redmond, Washington, USA",
        employees: "228,000",
        industry: "Enterprise Software, Cloud Computing & AI Services",
        overview: "Microsoft Corporation is a multinational technology giant known for its Windows OS, Office suite, Azure Cloud Platform, and strategic partnerships in Generative AI (OpenAI). It serves clients globally across enterprise, consumer, and hardware fields."
      },
      financials: {
        revenue: "245.1 Billion",
        profit: "88.1 Billion",
        marketCap: "3.2 Trillion",
        peRatio: "35.2",
        growth: "16.0%",
        chartData: {
          labels: ["2021", "2022", "2023", "2024", "2025 (Est)"],
          revenueHistory: [168.1, 198.3, 211.9, 245.1, 280.0],
          profitHistory: [61.3, 72.7, 72.4, 88.1, 102.5]
        }
      },
      news: [
        { title: "Microsoft Azure Outpaces Competitors in Cloud AI Growth", sentiment: "positive", summary: "Azure's cloud segment grew 29% YoY, driven heavily by enterprise AI integration." },
        { title: "FTC Opens Anti-Competitive Probe Into OpenAI Investment Structure", sentiment: "negative", summary: "Federal regulators are investigating the corporate relationship between Microsoft and OpenAI for potential monopoly violations." },
        { title: "Microsoft Copilot Integrated into Windows 11 Enterprise Builds", sentiment: "positive", summary: "Corporate subscriptions are showing rapid adoption of paid Copilot add-ons, increasing ARPU." }
      ],
      swot: {
        strengths: ["Azure's massive scale and hybrid cloud leadership", "Exclusive commercial rights with OpenAI tools", "Unassailable moat in enterprise productivity (Office)"],
        weaknesses: ["Reputational risks around Cybersecurity breaches", "Consumer segment dependency (Xbox, Surface) lagging enterprise performance", "High capital expenditure run-rate on AI data centers"],
        opportunities: ["Copilot upsell across hundreds of millions of corporate users", "Gaming expansion via Activision-Blizzard acquisition", "Next-gen custom silicon (Maia chips) lowering AI costs"],
        threats: ["Antitrust scrutiny on startup partnerships", "Fierce cloud competition from AWS and Google Cloud", "Prolonged high capex spending without near-term ROI"]
      },
      risk: {
        business: "Low - Highly diversified subscription revenue streams.",
        financial: "Low - Excellent AAA credit rating.",
        market: "Low - High stability due to enterprise contracts.",
        competition: "Medium - Active cloud battle against Amazon AWS and Google Cloud.",
        regulation: "High - Tight oversight on AI acquisitions and competitive actions."
      },
      decision: {
        score: 92,
        confidence: 95,
        recommendation: "INVEST",
        reasoning: "Microsoft is the prime beneficiary of the AI cycle. Azure's expansion, dominant SaaS suite, and strong capital discipline represent an elite investment opportunity. Absolute core holding.",
        pros: ["Elite cash generator with highly predictable subscription model", "First-mover advantage in commercial generative AI tools", "Exceptional leadership team"],
        cons: ["Elevated capital expenditures on graphics processors and data centers", "High regulatory scrutiny"],
        outlook: "Highly bullish. Expected to maintain cloud leadership and high operating margins."
      }
    }
  };

  // Default Fallback Mock Data Generator for generic stocks
  const capitalized = companyName.charAt(0).toUpperCase() + companyName.slice(1);
  const fallback = {
    profile: {
      name: `${capitalized} Corp.`,
      ceo: "Jane Doe",
      headquarters: "New York, NY, USA",
      employees: "45,000",
      industry: "Information Technology & Financials",
      overview: `${capitalized} Corp. is a diversified industry leader providing modern technical software, digital integration services, and advanced enterprise platforms globally. The company drives efficiency and automation across Fortune 500 businesses.`
    },
    financials: {
      revenue: "54.2 Billion",
      profit: "8.4 Billion",
      marketCap: "145 Billion",
      peRatio: "24.5",
      growth: "11.2%",
      chartData: {
        labels: ["2021", "2022", "2023", "2024", "2025 (Est)"],
        revenueHistory: [42.1, 46.8, 50.1, 54.2, 60.5],
        profitHistory: [6.1, 7.2, 7.8, 8.4, 9.8]
      }
    },
    news: [
      { title: `${capitalized} Announces Strategic Partnerships to Expand Services`, sentiment: "positive", summary: `New collaborations are expected to enhance market share and accelerate cloud deployment.` },
      { title: `${capitalized} Exceeds Q3 Wall Street Earnings Expectations`, sentiment: "positive", summary: "Adjusted EPS came in higher than consensus estimates due to strict operational cost management." },
      { title: "Macroeconomic Headwinds May Affect Short-term Growth Projects", sentiment: "negative", summary: "Rising interest rates and regional budget cutbacks could influence future client enterprise spends." }
    ],
    swot: {
      strengths: ["Strong niche reputation and product quality", "Loyal customer base", "Solid balance sheet with moderate leverage"],
      weaknesses: ["Geographic concentration of key operations", "Lower R&D expenditure relative to top three industry players", "Integration speed of modern AI components"],
      opportunities: ["Uncapped expansion into emerging South-East Asian markets", "Acquisitions of small SaaS firms to plug portfolio gaps", "Cloud migration services for mid-market clients"],
      threats: ["Fierce competitive bidding pressure", "Cybersecurity threats on customer database networks", "Talent retention costs in core engineering units"]
    },
    risk: {
      business: "Medium - Standard operational risks associated with software delivery.",
      financial: "Low - Strong liquidity and manageable leverage.",
      market: "Medium - Vulnerable to broad market sentiment fluctuations.",
      competition: "High - Crowded sector with multiple global players.",
      regulation: "Low - Standard regulatory compliance requirements."
    },
    decision: {
      score: 72,
      confidence: 80,
      recommendation: "INVEST",
      reasoning: `${capitalized} represents a stable, value-oriented investment with consistent cash flows, reasonable growth, and a moderate valuation. Suitable for balanced portfolios.`,
      pros: ["Solid fundamentals and cash generation", "Attractive P/E ratio compared to sector averages"],
      cons: ["Stiff competition", "Higher sensitivity to overall economic slowdowns"],
      outlook: "Stable. Steady mid-single digit growth with reliable returns."
    }
  };

  return mockDatabase[norm] || fallback;
}

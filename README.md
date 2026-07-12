# 🚀 AI Investment Research Agent

An advanced, production-grade multi-agent investment research terminal. Built with **React** (Vite) on the frontend and **Node.js** (Express) + **LangChain** on the backend, the terminal coordinates a supervisor agent and specialized analytical tools to research, score, and evaluate public companies.

---

## 📈 Overview
The **AI Investment Research Agent** is designed to do the heavy lifting of security analysis in seconds. Instead of manually digging through annual reports, news sites, and financial statements, users type in a company name, and an LLM-driven orchestrator coordinates a series of specialist agents to:
1. **Scrape Company Profiles**: Identify core business lines, leadership, and sector categorization.
2. **Collect Financials**: Gather revenue, profits, market cap, and YoY growth.
3. **Scan News**: Fetch real-time headlines and perform sentiment analysis.
4. **Synthesize SWOT Analysis**: Highlight structural strengths, weaknesses, opportunities, and threats.
5. **Analyze Risks**: Classify market, regulatory, financial, and business vulnerabilities.
6. **Generate Investment Ratings**: Evaluate all collected data to provide an investment rating (0-100), pros/cons list, and long-term outlook.

All data is cached gracefully and rendered in a stunning dark-theme dashboard with interactive line/bar charts, custom SVG progress gauges, and historical lookup support.

---

## ⚙️ How to Run It

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18+) and npm installed.

### 1. Set Up the Environment
Create a `.env` file in the `server/` directory:
```env
PORT=5000

# LLM Configurations (Provide at least one)
GOOGLE_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Search & Media APIs
TAVILY_API_KEY=your_tavily_api_key_here
NEWS_API_KEY=your_news_api_key_here

# History Storage (Optional MongoDB)
MONGO_URI=your_mongodb_connection_string
```
*Note: If no LLM keys are provided, the application automatically enters a high-fidelity **Mock Simulation Mode** for local testing.*

### 2. Run the Backend
```bash
cd server
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Run the Frontend Client
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
The client will spin up on `http://localhost:5173`. Open it in your browser.

---

## 🧠 How It Works & Architecture

The application implements a **Supervisor Orchestration Pattern** using LangChain:

```
                  ┌──────────────────────┐
                  │      React App       │
                  └──────────┬───────────┘
                             │ (POST /api/research)
                             ▼
                  ┌──────────────────────┐
                  │    Express Server    │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   Supervisor Agent   │
                  └──────────┬───────────┘
                             │ (Coordinates Tools)
       ┌─────────────────────┼─────────────────────┐
       ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Profile Tool │      │ Finance Tool │      │  News Tool   │
└──────────────┘      └──────────────┘      └──────────────┘
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             ▼
                  ┌──────────────────────┐
                  │      SWOT Tool       │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │    Risk Analyzer     │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │   Decision Engine    │
                  └──────────┬───────────┘
                             │ (Calculates Score 0-100)
                             ▼
                  ┌──────────────────────┐
                  │   Structured JSON    │
                  └──────────────────────┘
```

1. **User Query**: The user searches for a company (e.g., "Apple").
2. **Orchestration**: The **Supervisor Agent** initializes the LLM and calls research sub-agents.
3. **Information Gathering**:
   * The **Profile & Financials** tools scrape current stock and business records.
   * The **News** tool scans global articles and classifies their sentiment.
4. **Evaluation**:
   * The **SWOT & Risk** tools synthesize potential pitfalls and upsides.
   * The **Investment Decision Engine** reads all gathered data, weighs positive vs. negative factors, generates a scorecard, and returns a structured JSON payload.
5. **Rendering**: The UI maps the structured data to dynamic dashboard modules and charts.

---

## ⚖️ Key Decisions & Trade-Offs

### 1. Linear Pipeline vs. Recursive Graph (LangGraph)
* **Decision**: We opted for a linear supervisor agent orchestrating tools rather than a recursive LangGraph agentic loop.
* **Why**: Financial research is highly sequential (we need profile and financials *before* we can run a SWOT and issue a decision score). A linear flow is much faster, uses fewer tokens, avoids infinite loops, and maintains a deterministic timeline.
* **Trade-off**: The agent cannot "self-correct" by recursively re-fetching data if an initial lookup returns partial records.

### 2. High-Fidelity Mock Fallback Mode
* **Decision**: If third-party API keys (Gemini, OpenAI, Tavily) are missing, the server falls back to high-fidelity simulated response generators.
* **Why**: LLM APIs require paid credits. A fallback engine allows external evaluators to run and audit the application interface, charts, and UX immediately without config friction.

### 3. Dynamic CORS & Deployment-Ready Routing
* **Decision**: Standardizing on environment variables (`FRONTEND_URL` on the backend, `VITE_API_URL` on the frontend) alongside automated Vercel domain matching (`origin.endsWith('.vercel.app')`).
* **Why**: Avoids hardcoding URLs. The local Vite proxy is used during development, while production builds hit the Render server seamlessly.

---

## 📊 Example Runs

### 1. Apple Inc. (AAPL)
* **Score**: `88/100` (Strong Buy)
* **Summary**: Unrivaled ecosystem lock-in, stable cash flows, and high operating margins. High P/E ratio is justified by software services revenue growth.
* **Key Risks**: Regulatory/antitrust investigations in the EU and US.

### 2. Tesla Inc. (TSLA)
* **Score**: `68/100` (Hold)
* **Summary**: Pioneer in EVs and autonomous driving software, but highly volatile stock price and compressed margins due to international price competition.
* **Key Risks**: Rapid market share growth by Chinese EV makers, brand concentration on Elon Musk.

### 3. NVIDIA Corporation (NVDA)
* **Score**: `91/100` (Strong Buy)
* **Summary**: Market leader in AI chipsets and CUDA ecosystem. Unprecedented YoY growth.
* **Key Risks**: Short-term valuation bubble fears, supply chain reliance on TSMC.

---

## 🚀 Future Improvements

1. **RAG on SEC Filings**: Give the agent a tool to parse uploaded annual 10-K PDFs for deeper accounting notes.
2. **WebSockets Streaming**: Stream individual agent progress messages ("*Gathering financials...*", "*Evaluating risks...*") to the frontend in real-time.
3. **PDF Export**: Generate formatted PDF research dossiers directly from the dashboard.
4. **Recursive Reasoning**: Use LangGraph to re-query search tools if financials are missing or look incomplete.

---

## 💬 AI Pair-Programming Transcripts (Bonus)

Below is the transcript summarizing our pair-programming session as we configured this project for production deployment on Render and Vercel:

### Session Log

> **User**: *i hvae to deploy this on render and vercel how can i*

> **Agent**: 
> I will start by analyzing the workspace. I've updated your configuration to support production variables:
> 1. In `server/server.js`, I added a dynamic CORS handler to allow your local environment AND your Vercel deployment URL (via `FRONTEND_URL`).
> 2. In `client/src/services/api.js`, I configured the client `baseURL` to use `import.meta.env.VITE_API_URL || ''`.
>
> *Action Taken: Wrote a step-by-step [Deployment Guide](file:///C:/Users/Ankit%20Saini/.gemini/antigravity-ide/brain/29cfc179-9b47-4613-8f2e-f41015da1c7a/deployment_guide.md).*

***

> **User**: *(Sends Render error: npm error Missing script: "build")*

> **Agent**:
> Ah, Render defaults to running `npm install && npm run build` for Node services. Because our Node server doesn't have a compilation phase, it crashed.
>
> *Action Taken: Added a dummy `"build": "echo 'No build step required'"` script in `server/package.json` to safely bypass this error.*

***

> **User**: *https://ai-investment-agent-mco4.onrender.com/ sucesslfully build but when i lcick on url it showd can't get*

> **Agent**:
> This is normal since there was no root (`GET /`) path defined (Express defaults to `Cannot GET /`). 
>
> *Action Taken: Added a friendly root endpoint to `server.js` displaying: `🚀 AI Investment Research Server is running!` so you can easily verify it's active.*

***

> **User**: *where to add this backend url*

> **Agent**:
> 1. Add it in Vercel under Environment Variables as `VITE_API_URL` set to `https://ai-investment-agent-mco4.onrender.com`.
> 2. Once Vercel deploys, copy its URL and put it back in Render's variables as `FRONTEND_URL` to allow CORS.

***

> **User**: *(Sends console error: Failed to load resource /api/research 404 & React error #31)*

> **Agent**:
> Two things caused this:
> 1. The modified API client file (`api.js`) was never committed/pushed to GitHub, so Vercel fell back to relative routing (which leads to Vercel's 404).
> 2. When the 404 error returned, the React application tried to render the raw error object, triggering the invariant React crash #31.
>
> *Action Taken: Sanitized error reporting in `ResearchContext.jsx` to ensure errors are strings. Prompted the user to push all changed files.*

***

> **User**: *index-BvmqFB6r.js:40 Error: "line" is not a registered controller.*

> **Agent**:
> Chart.js in production is tree-shaken. Because our financial card draws a mixed chart (bars + lines), Chart.js requires explicit line controller registration when using individual components.
>
> *Action Taken: Refactored `FinancialsCard.jsx` to register `registerables` from `chart.js` to prevent any missing controller or scale errors in production.*

My project link=ai-investment-agent-weld.vercel.app  

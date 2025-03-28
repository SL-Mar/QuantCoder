[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# QuantCoder_FS — Full-Stack AI Assistant for Traders

QuantCoder_FS is a full-stack application for quantitative finance research and trading strategy development. It leverages LLM-driven workflows and integrates them into a modular, user-friendly platform. This open-source release focuses on the summarization workflow, with other workflows in development including fundamentals analysis, strategy generation, forecasting, and risk evaluation.

This repository includes a FastAPI backend (with CrewAI-powered agents) and a responsive Next.js frontend. A preview of the complete working interface is available in the `QuantCoder_FS_Demo` folder.

---

## Architecture Overview

The application is structured as a modular full-stack platform:

- **Backend**: FastAPI application with modular routers, agents, and workflow orchestration
- **Frontend**: Next.js with Tailwind styling, featuring dynamic components and JWT-based authentication
- **Communication**: RESTful API endpoints with secure token-based access control

---

## Authentication

QuantCoder_FS features a secure, stateless authentication system based on JWT tokens.

- Login via `/login` stores token in `localStorage`
- Protected routes (e.g., `/summarisation`) validate token presence and redirect if unauthenticated
- Token decoding and user state are handled via a custom React hook (`useAuth`)
- Role-based access control and token refresh support are planned

---

## Quickstart Guide

### 1. Clone the repository
```bash
git clone https://github.com/SL-Mar/QuantCoder.git
cd QuantCoder
git checkout dev
```

### 2. Backend Setup (Windows)
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Configure `.env` with your OpenAI API key:
```env
OPENAI_API_KEY=sk-...
MODEL_NAME=gpt-4
```

Start the backend:
```bash
uvicorn backend.main:app --reload --port 8000
```

Access API documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000/summarisation](http://localhost:3000/summarisation)

Ensure backend is running. Proxy settings can be configured in `next.config.js`.

---

## Current Workflow: Summarization

The summarization workflow enables AI-assisted extraction of insights from uploaded PDF documents.

### Features
- Drag-and-drop PDF upload with preview
- On-demand summarization via backend workflow
- Summary rendering with LaTeX-style formatting
- Save/load/delete summaries with persistent state
- Sidebar view of all saved summaries

### Backend Structure
```
backend/
├── core/                  # Configuration, logging, usage tracking
├── routers/               # API endpoints (auth, summarizer)
├── agents/                # CrewAI agents for summarization
├── workflows/             # Summarization workflow orchestration
├── models/                # Pydantic schemas
└── utils/                 # File and authentication utilities
```

### Frontend Structure
```
frontend/
├── components/            # PDF and summary viewers, sidebar
├── lib/                   # Token-aware API layer and auth hook
├── pages/                 # Login and protected summarisation page
└── public/                # Test files and assets
```

---

## Planned Workflows

QuantCoder_FS is designed for extensibility. The following workflows are planned:

- Fundamentals Analysis (via EODHD API)
- Code Generation for QuantConnect
- Risk Modeling (including VaR and Monte Carlo tools)
- Time Series Forecasting (XGBoost-based pipeline)
- Investment Scoring & Lead Evaluation

Each workflow will include both backend orchestration and frontend interface components.

---

## Legacy CLI Version

The original prototype (QuantCoder CLI) is available on the `quantcoder-legacy` branch. It includes:

- Article search and PDF summarization
- Trading strategy generation for QuantConnect
- CLI interface

To access:
```bash
git checkout quantcoder-legacy
```

---

## License

QuantCoder_FS is distributed under the **Apache License 2.0**.

You may use, modify, and redistribute this software under the terms of the license. See the [LICENSE](LICENSE.md) file for full terms.

---

## Related Articles

- [QuantCoder_FS Technical Documentation](https://medium.com/@sl_mar/quantcoder-fs-documentation-6fc79915e287)
- [Automating Quantitative Finance Research](https://medium.com/ai-advances/towards-automating-quantitative-finance-research-c868a2a6477e)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=SL-Mar/QuantCoder-FS&type=Date)](https://www.star-history.com/#SL-Mar/QuantCoder-FS&Date)

---

For issues or contributions, feel free to open a pull request or submit a GitHub issue. 


---
## ⭐ Star history

[![Star History Chart](https://api.star-history.com/svg?repos=SL-Mar/QuantCoder-FS&type=Date)](https://www.star-history.com/#SL-Mar/QuantCoder-FS&Date)

